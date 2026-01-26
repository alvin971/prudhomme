import { AnalyseDomainesResult } from '../types/analysis';
import { getDomainCalculationPrompt } from '../utils/analysisPrompts';

export async function calculateDomains(
  groupeNoms: string[],
  conversationHistory: string
): Promise<AnalyseDomainesResult> {
  const prompt = getDomainCalculationPrompt(groupeNoms, conversationHistory);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Analyse la conversation et retourne le JSON demandé.' }],
      systemPrompt: prompt,
      maxTokens: 1500
    })
  });

  if (!response.ok) {
    console.error('Erreur API domainCalculator:', await response.text());
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }

  const data = await response.json();
  const content = data.message || '';

  // Extraire JSON
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Pas de JSON trouvé dans la réponse domainCalculator:', content);
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('Erreur parsing JSON domainCalculator:', e, jsonMatch[0]);
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }
}
