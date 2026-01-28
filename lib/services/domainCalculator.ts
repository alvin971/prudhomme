import { AnalyseDomainesResult } from '../types/analysis';
import { getDomainCalculationPrompt } from '../utils/analysisPrompts';
import { logPrompt } from '../utils/logger';

export async function calculateDomains(
  groupeNoms: string[],
  conversationHistory: string
): Promise<AnalyseDomainesResult> {
  const prompt = getDomainCalculationPrompt(groupeNoms, conversationHistory);

  // Log prompt before sending
  await logPrompt('DOMAIN_CALC', 'Domain Calculation', prompt);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Analyse la conversation et retourne le JSON demandé.' }],
      systemPrompt: prompt,
      maxTokens: 1500
    })
  });

  const data = await response.json();
  const content = data.message || '';

  console.log('🔍 [domainCalculator] Réponse brute de l\'API:', content);

  // Extraire JSON avec une regex plus précise
  const jsonMatches = content.match(/\{[\s\S]*\}/g);
  if (!jsonMatches || jsonMatches.length === 0) {
    console.error('❌ [domainCalculator] Aucun JSON trouvé dans la réponse');
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }

  const jsonStr = jsonMatches[jsonMatches.length - 1];

  try {
    const parsed = JSON.parse(jsonStr);
    console.log('✅ [domainCalculator] JSON parsé avec succès');
    return parsed;
  } catch (e) {
    console.error('❌ [domainCalculator] Erreur de parsing JSON:', e);
    console.log('❌ [domainCalculator] JSON invalide:', jsonStr);
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }
}
