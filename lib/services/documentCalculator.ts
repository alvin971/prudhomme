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
      messages: [{ role: 'user', content: 'Sélectionne les documents les plus pertinents et retourne le JSON demandé.' }],
      systemPrompt: prompt,
      maxTokens: 2000
    })
  });

  if (!response.ok) {
    console.error('Erreur API documentCalculator:', await response.text());
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse.' };
  }

  const data = await response.json();
  const content = data.message || '';

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Pas de JSON trouvé dans la réponse documentCalculator:', content);
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse.' };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('Erreur parsing JSON documentCalculator:', e, jsonMatch[0]);
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse.' };
  }
}
