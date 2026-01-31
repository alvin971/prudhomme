import { jsPDF } from 'jspdf';

export interface Document {
  id: string;
  type: string;
  fileName: string;
  createdAt: Date;
  textContent: string;
  pdfUrl?: string;
  reviewStatus?: 'pending' | 'in_review' | 'completed' | 'refunded';
  reviewId?: string;
  purchaseId?: string;
  userId: string;
}

export function replacePlaceholders(
  content: string,
  placeholders: Record<string, string>
): string {
  let result = content;
  Object.entries(placeholders).forEach(([key, value]) => {
    // Remplacer le format {{clé}}
    result = result.replaceAll(`{{${key}}}`, value);
    // Remplacer le format [clé]
    result = result.replaceAll(`[${key}]`, value);
  });
  return result;
}

export function extractPlaceholders(content: string): string[] {
  const placeholders: string[] = [];

  // Format 1 : {{...}} — double accolades (tout contenu entre {{ }})
  const braceRegex = /\{\{([^}]+)\}\}/g;
  for (const match of content.matchAll(braceRegex)) {
    placeholders.push(match[1].trim());
  }

  // Format 2 : [...] — crochets avec texte en majuscules (min 3 chars, évite [1], [a], etc.)
  const bracketRegex = /\[([A-ZÀÂÉÈÊËÏÎÔÙÛÜÇ][A-ZÀÂÉÈÊËÏÎÔÙÛÜÇ _'']{2,})\]/g;
  for (const match of content.matchAll(bracketRegex)) {
    placeholders.push(match[1].trim());
  }

  return [...new Set(placeholders)];
}

export function getStandardPlaceholders(): string[] {
  return [
    'NOM_EXPEDITEUR',
    'PRENOM_EXPEDITEUR',
    'ADRESSE_EXPEDITEUR',
    'CODE_POSTAL_EXPEDITEUR',
    'VILLE_EXPEDITEUR',
    'EMAIL_EXPEDITEUR',
    'TELEPHONE_EXPEDITEUR',
    'NOM_DESTINATAIRE',
    'ADRESSE_DESTINATAIRE',
    'CODE_POSTAL_DESTINATAIRE',
    'VILLE_DESTINATAIRE',
    'LIEU',
  ];
}

export function generatePDF(content: string, documentType: string): Blob {
  const doc = new jsPDF();

  // Remplacer € par EUR (police ne supporte pas €)
  const cleanContent = content.replaceAll('€', 'EUR');

  // Diviser en lignes
  const lines = cleanContent.split('\n');
  const pageHeight = doc.internal.pageSize.height;
  const lineHeight = 7;
  let y = 20;

  // Ajouter le contenu
  lines.forEach((line) => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    const wrappedLines = doc.splitTextToSize(line || ' ', 180);
    wrappedLines.forEach((wrappedLine: string) => {
      doc.text(wrappedLine, 10, y);
      y += lineHeight;
    });
  });

  return doc.output('blob');
}

export function downloadPDF(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function getPlaceholderLabel(placeholder: string): string {
  const labels: Record<string, string> = {
    'NOM_EXPEDITEUR': 'Nom (expéditeur)',
    'PRENOM_EXPEDITEUR': 'Prénom (expéditeur)',
    'ADRESSE_EXPEDITEUR': 'Adresse (expéditeur)',
    'CODE_POSTAL_EXPEDITEUR': 'Code postal (expéditeur)',
    'VILLE_EXPEDITEUR': 'Ville (expéditeur)',
    'EMAIL_EXPEDITEUR': 'Email (expéditeur)',
    'TELEPHONE_EXPEDITEUR': 'Téléphone (expéditeur)',
    'NOM_DESTINATAIRE': 'Nom du destinataire',
    'PRENOM_DESTINATAIRE': 'Prénom du destinataire',
    'ADRESSE_DESTINATAIRE': 'Adresse du destinataire',
    'CODE_POSTAL_DESTINATAIRE': 'Code postal (destinataire)',
    'VILLE_DESTINATAIRE': 'Ville (destinataire)',
    'LIEU': 'Lieu',
    'DATE': 'Date',
    'MONTANT': 'Montant',
    'OBJET': 'Objet',
  };

  return labels[placeholder] || placeholder.replaceAll('_', ' ').toLowerCase();
}
