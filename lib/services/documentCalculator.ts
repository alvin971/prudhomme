import { DocumentJuridique, AnalyseDomainesResult, DocumentsSelectionResult } from '../types/analysis';
import { getDocumentCalculationPrompt } from '../utils/analysisPrompts';

export async function calculateDocuments(
  documents: DocumentJuridique[],
  domainesResult: AnalyseDomainesResult,
  conversationHistory: string
): Promise<DocumentsSelectionResult> {
  const prompt = getDocumentCalculationPrompt(documents, domainesResult, conversationHistory);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 2000
    })
  });

  const data = await response.json();
  const content = data.message || '';

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse.' };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse.' };
  }
}
