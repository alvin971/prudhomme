import { NextRequest, NextResponse } from 'next/server';
import { logPrompt } from '@/lib/utils/logger';

export const runtime = 'edge';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, maxTokens = 1024 } = await req.json();

    // Log prompt sent to LLM
    await logPrompt('CHAT', 'Anthropic API Request', systemPrompt, messages, maxTokens);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: errorData?.error?.message || 'Internal server error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.content[0].text;

    return NextResponse.json({ message: aiMessage });
  } catch (error: any) {
    console.error('Anthropic API error:', error.message);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
