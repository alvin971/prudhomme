import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { documentId, userId } = session.metadata || {};

        if (documentId && userId) {
          // Update document status in Firestore
          const docRef = doc(db, 'documents', documentId);
          await updateDoc(docRef, {
            reviewStatus: 'pending',
            reviewId: session.id,
            paymentStatus: 'paid',
            lastUpdated: Timestamp.now(),
          });

          console.log(`Payment successful for document ${documentId}`);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { documentId } = session.metadata || {};

        if (documentId) {
          const docRef = doc(db, 'documents', documentId);
          await updateDoc(docRef, {
            paymentStatus: 'expired',
            lastUpdated: Timestamp.now(),
          });

          console.log(`Payment session expired for document ${documentId}`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntent = charge.payment_intent;

        if (paymentIntent) {
          // Find the checkout session associated with this payment intent
          const sessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent as string,
            limit: 1,
          });

          if (sessions.data.length > 0) {
            const { documentId } = sessions.data[0].metadata || {};

            if (documentId) {
              const docRef = doc(db, 'documents', documentId);
              await updateDoc(docRef, {
                reviewStatus: 'refunded',
                paymentStatus: 'refunded',
                lastUpdated: Timestamp.now(),
              });

              console.log(`Refund processed for document ${documentId}`);
            }
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
