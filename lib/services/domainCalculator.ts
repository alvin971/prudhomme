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
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 1500
    })
  });

  const data = await response.json();
  const content = data.message || '';

  // Extraire JSON
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return { domaines_pertinents: [], analyse_globale: '', confiance_globale: 0 };
  }
}
