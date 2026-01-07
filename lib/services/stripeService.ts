import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createCheckoutSession(
  documentId: string,
  userId: string,
  userEmail: string
): Promise<void> {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentId,
        userId,
        userEmail,
        amount: 9999, // 99,99€ en centimes
      }),
    });

    const session = await response.json();

    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    const result = await stripe!.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Erreur Stripe:', error);
    throw error;
  }
}

export async function getPaymentStatus(sessionId: string): Promise<any> {
  try {
    const response = await fetch(`/api/payment-status?sessionId=${sessionId}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur vérification paiement:', error);
    return null;
  }
}
