import { CHATBOT_SYSTEM_PROMPT, getDocumentGenerationPrompt } from '../utils/prompts';
import { logPrompt } from '../utils/logger';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessageToAI(
  messages: Message[],
  systemPrompt: string = CHATBOT_SYSTEM_PROMPT,
  maxTokens: number = 1024
): Promise<string> {
  try {
    // Nettoyer les messages pour garder seulement role et content
    const cleanMessages = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    // Utiliser notre API route pour éviter les problèmes CORS
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: cleanMessages,
        systemPrompt: systemPrompt,
        maxTokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Erreur API Anthropic:', error);
    throw new Error('Impossible de contacter l\'IA juridique');
  }
}

export async function generateDocument(
  selectedDocument: any,
  conversationText: string
): Promise<string> {
  const systemPrompt = getDocumentGenerationPrompt(selectedDocument, conversationText);

  // Log prompt before sending
  await logPrompt('DOCUMENT_GEN', 'Document Generation', systemPrompt, undefined, 3000);

  return sendMessageToAI(
    [{ role: 'user', content: 'Génère le document complet maintenant.' }],
    systemPrompt,
    3000
  );
}
