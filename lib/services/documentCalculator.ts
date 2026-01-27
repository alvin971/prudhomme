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
      messages: [{ role: 'user', content: 'Sélectionne les documents et retourne le JSON demandé.' }],
      systemPrompt: prompt,
      maxTokens: 2000
    })
  });

  const data = await response.json();
  const content = data.message || '';

  // Supprimer les caractères \n pour éviter les erreurs de parsing JSON
  const cleanContent = content.replace(/\n/g, '');
  console.log('📄 [documentCalculator] Réponse nettoyée:', cleanContent.substring(0, 200));

  // Extraire JSON avec une regex plus précise (cherche le dernier bloc JSON)
  const jsonMatches = cleanContent.match(/\{[\s\S]*\}/g);
  if (!jsonMatches || jsonMatches.length === 0) {
    console.error('❌ [documentCalculator] Aucun JSON trouvé dans la réponse');
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse : la réponse de l\'IA ne contient pas de données structurées.' };
  }

  // Prendre le dernier JSON (souvent le plus complet)
  const jsonStr = jsonMatches[jsonMatches.length - 1];

  try {
    const parsed = JSON.parse(jsonStr);
    console.log('✅ [documentCalculator] JSON parsé avec succès');
    return parsed;
  } catch (e) {
    console.error('❌ [documentCalculator] Erreur de parsing JSON:', e);
    console.log('❌ [documentCalculator] JSON invalide:', jsonStr);
    return { documents: [], reponse_formatee: 'Erreur lors de l\'analyse : impossible de traiter la réponse de l\'IA.' };
  }
}
