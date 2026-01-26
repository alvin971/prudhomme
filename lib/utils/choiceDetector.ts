import { DocumentSelectionne } from '../types/analysis';

export function detectUserChoice(
  userMessage: string,
  documents: DocumentSelectionne[]
): DocumentSelectionne | null {
  const message = userMessage.toLowerCase().trim();

  // Détection par numéro
  const numberMatch = message.match(/^[1-4]$|option\s*([1-4])|choix\s*([1-4])|le\s*([1-4])|la\s*([1-4])/);
  if (numberMatch) {
    const num = parseInt(numberMatch[1] || numberMatch[2] || numberMatch[3] || numberMatch[4] || numberMatch[0]);
    const doc = documents.find(d => d.priorite === num);
    if (doc) return doc;
  }

  // Détection par nom de document
  for (const doc of documents) {
    const docNameLower = doc.document_nom.toLowerCase();
    if (message.includes(docNameLower) || docNameLower.includes(message)) {
      return doc;
    }
    // Mots-clés du nom
    const keywords = docNameLower.split(/\s+/).filter(w => w.length > 4);
    const matchCount = keywords.filter(kw => message.includes(kw)).length;
    if (matchCount >= 2) return doc;
  }

  return null;
}
