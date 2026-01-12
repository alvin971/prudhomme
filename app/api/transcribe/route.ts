import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Aucun fichier audio fourni' },
        { status: 400 }
      );
    }

    // Clé OpenAI pour Whisper
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json(
        { error: 'Clé OpenAI non configurée' },
        { status: 500 }
      );
    }

    // Préparer le FormData pour OpenAI
    const openaiFormData = new FormData();
    openaiFormData.append('file', audioFile);
    openaiFormData.append('model', 'whisper-1');
    openaiFormData.append('language', 'fr');
    openaiFormData.append('response_format', 'json');

    // Appeler l'API Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: openaiFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erreur Whisper:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la transcription' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });

  } catch (error) {
    console.error('Erreur transcription:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la transcription' },
      { status: 500 }
    );
  }
}
