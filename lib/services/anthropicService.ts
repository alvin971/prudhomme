import { CHATBOT_SYSTEM_PROMPT, getDocumentGenerationPrompt, getDocumentGenerationPromptFixed } from '../utils/prompts';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessageToAI(
  messages: Message[],
  systemPrompt: string = CHATBOT_SYSTEM_PROMPT,
  maxTokens: number = 1024,
  model: string = 'claude-3-5-haiku-20241022'
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
        model: model,
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
  documentType: string,
  conversationText: string
): Promise<string> {
  // Partie fixe du prompt (sera mise en cache si disponible - ~4000 tokens)
  const systemPrompt = getDocumentGenerationPromptFixed();

  // Message utilisateur avec la conversation COMPLÈTE (user + assistant)
  // Cela permet à l'IA de comprendre le contexte complet
  const userMessage = `Voici la conversation complète avec l'utilisateur :

${conversationText}

---

Génère maintenant UNIQUEMENT le document juridique complet (sans introduction, sans "Je vais générer..."), en utilisant des placeholders {{VARIABLE}} pour toutes les données personnelles non fournies.`;

  // Utiliser Claude Sonnet 4.5 pour la génération de documents (le plus intelligent)
  // Augmenter maxTokens à 8000 pour permettre la génération de documents longs
  return sendMessageToAI(
    [{ role: 'user', content: userMessage }],
    systemPrompt,
    8000,
    'claude-sonnet-4-5-20250929'
  );
}
