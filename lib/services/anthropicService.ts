import { CHATBOT_SYSTEM_PROMPT, getDocumentGenerationPrompt } from '../utils/prompts';

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
    const aiMessage = data.content[0].text;

    console.log('========================================');
    console.log('RÉPONSE DE L\'IA:');
    console.log('========================================');
    console.log(aiMessage);
    console.log('========================================');
    console.log('');

    return aiMessage;
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

  console.log('========================================');
  console.log('PROMPT SYSTÈME ENVOYÉ À L\'IA:');
  console.log('========================================');
  console.log(systemPrompt);
  console.log('========================================');
  console.log('');

  return sendMessageToAI(
    [{ role: 'user', content: 'Génère le document complet maintenant.' }],
    systemPrompt,
    8000  // Augmenté pour garantir la génération complète
  );
}
