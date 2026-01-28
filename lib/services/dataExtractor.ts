import { DocumentJuridique } from '../types/analysis';
import { getDataCollectionSystemPrompt } from '../utils/analysisPrompts';
import { logPrompt } from '../utils/logger';

export async function sendConversationalDataCollection(
  selectedDocument: DocumentJuridique,
  conversationHistory: string
): Promise<string> {
  const systemPrompt = getDataCollectionSystemPrompt(selectedDocument, conversationHistory);

  // Log prompt before sending
  await logPrompt('DATA_COLLECTION', 'Data Collection', systemPrompt);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Continue la conversation pour collecter les informations manquantes.' }],
      systemPrompt,
      maxTokens: 1500
    })
  });

  const data = await response.json();
  return data.message || 'Pourriez-vous me donner plus de détails ?';
}
