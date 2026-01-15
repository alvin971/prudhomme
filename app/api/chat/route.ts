import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, maxTokens = 1024, model = 'claude-3-5-haiku-20241022' } = await req.json();

    console.log('🔍 API Route - Début traitement');
    console.log('📝 Messages:', JSON.stringify(messages));
    console.log('📝 System prompt length:', systemPrompt?.length);
    console.log('📝 Max tokens:', maxTokens);
    console.log('🤖 Model:', model);

    if (!messages || !Array.isArray(messages)) {
      console.error('❌ Messages invalides');
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      console.error('❌ Clé API manquante');
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    console.log('✅ Clé API présente:', ANTHROPIC_API_KEY.substring(0, 15) + '...');

    console.log('🚀 Envoi à Anthropic API...');

    // Utiliser le prompt caching pour économiser des tokens
    const systemContent = typeof systemPrompt === 'string'
      ? [{
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" }
        }]
      : systemPrompt;

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2024-10-22',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        max_tokens: maxTokens,
        system: systemContent,
        messages: messages,
      }),
    });

    console.log('📡 Réponse Anthropic - Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erreur Anthropic:', JSON.stringify(errorData, null, 2));

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key - Vérifiez la clé dans Cloudflare' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }

      if (response.status === 400) {
        console.error('❌ Erreur 400 détails:', errorData?.error?.message);
        return NextResponse.json(
          { error: `Erreur 400: ${errorData?.error?.message || 'Requête invalide'}` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: errorData?.error?.message || 'Internal server error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.content[0].text;

    console.log('✅ Réponse reçue, longueur:', aiMessage.length);

    return NextResponse.json({ message: aiMessage });
  } catch (error: any) {
    console.error('❌ Exception:', error.message, error.stack);

    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
