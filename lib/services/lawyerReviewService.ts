import axios from 'axios';

const PORTAL_URL = process.env.NEXT_PUBLIC_LAWYER_PORTAL_URL;

export interface ReviewSubmission {
  documentPath: string;
  documentType: string;
  textContent: string;
  userId: string;
  userEmail: string;
  purchaseId: string;
}

export async function submitDocumentForReview(
  submission: ReviewSubmission
): Promise<{ reviewId: string; status: string; message: string }> {
  try {
    const response = await axios.post(`${PORTAL_URL}/submit-review`, {
      ...submission,
      submittedAt: new Date().toISOString(),
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    });

    return response.data;
  } catch (error) {
    console.error('Erreur soumission avocat:', error);
    return {
      reviewId: `pending_${Date.now()}`,
      status: 'pending_submission',
      message: 'Document en attente d\'envoi à l\'avocat',
    };
  }
}

export async function checkReviewStatus(reviewId: string): Promise<any> {
  try {
    const response = await axios.get(`${PORTAL_URL}/review-status/${reviewId}`);
    return response.data;
  } catch (error) {
    return { status: 'pending', message: 'Vérification en cours...' };
  }
}

export async function getRevisedDocument(reviewId: string): Promise<string | null> {
  try {
    const response = await axios.get(`${PORTAL_URL}/revised-document/${reviewId}`);
    return response.data.revisedContent;
  } catch (error) {
    console.error('Erreur récupération document révisé:', error);
    return null;
  }
}

export async function requestRefund(
  reviewId: string,
  purchaseId: string,
  reason: string
): Promise<boolean> {
  try {
    const response = await axios.post(`${PORTAL_URL}/request-refund`, {
      reviewId,
      purchaseId,
      reason,
      requestedAt: new Date().toISOString(),
    });

    return response.status === 200;
  } catch (error) {
    console.error('Erreur demande de remboursement:', error);
    return false;
  }
}
