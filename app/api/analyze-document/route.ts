import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 Starting document analysis...');
    console.log('API Key present:', !!ANTHROPIC_API_KEY);

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    console.log('📄 Files received:', files.length);

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      console.error('❌ ANTHROPIC_API_KEY is missing');
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      );
    }

    // Convertir les fichiers en base64
    const imageContents = [];

    for (const file of files) {
      console.log(`📎 Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`);

      const bytes = await file.arrayBuffer();
      // Utiliser btoa au lieu de Buffer pour Edge Runtime
      const uint8Array = new Uint8Array(bytes);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64 = btoa(binary);

      console.log(`✅ Base64 encoded, length: ${base64.length}`);

      // Détecter le type MIME
      let mediaType = 'image/jpeg';
      if (file.type === 'image/png') {
        mediaType = 'image/png';
      } else if (file.type === 'image/webp') {
        mediaType = 'image/webp';
      } else if (file.type === 'image/gif') {
        mediaType = 'image/gif';
      } else if (file.type === 'application/pdf') {
        // PDFs ne sont pas supportés pour le moment
        console.warn('⚠️ PDF file detected, skipping:', file.name);
        continue;
      }

      imageContents.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64,
        },
      });
    }

    // Construire le prompt
    const prompt = buildAnalysisPrompt();

    // Requête à Claude
    const requestBody = {
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            ...imageContents,
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    };

    console.log('🚀 Calling Claude API...');
    console.log('Request body size:', JSON.stringify(requestBody).length);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Claude API error:', errorData);
      return NextResponse.json(
        { error: `Erreur API (${response.status}): ${errorData.substring(0, 200)}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Claude response received');

    const content = data.content[0].text;

    // Parser la réponse JSON de Claude
    try {
      const analysisResult = JSON.parse(content);
      console.log('✅ Analysis successful');
      return NextResponse.json(analysisResult);
    } catch (e) {
      console.warn('⚠️ Claude response is not JSON, wrapping it');
      // Si Claude n'a pas renvoyé du JSON valide, structurer la réponse
      return NextResponse.json({
        type: 'Document juridique',
        confidence: 0.85,
        summary: content,
        key_points: [],
        warnings: [],
        recommendations: [],
      });
    }
  } catch (error: any) {
    console.error('❌ Document analysis error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Erreur: ${error.message || 'Erreur interne du serveur'}` },
      { status: 500 }
    );
  }
}

function buildAnalysisPrompt(): string {
  return `Tu es un expert juridique français spécialisé dans l'analyse de documents juridiques.

Analyse le(s) document(s) fourni(s) et retourne une réponse au format JSON strict suivant:

{
  "type": "Type exact du document (ex: Contrat de travail CDI, Mise en demeure, Courrier recommandé, Bail de location, etc.)",
  "confidence": 0.95,
  "summary": "Résumé détaillé du document en 2-3 phrases expliquant l'objet principal et le contexte",
  "key_points": [
    "Point clé 1 avec détails importants",
    "Point clé 2 avec détails importants",
    "Point clé 3 avec détails importants",
    "etc."
  ],
  "warnings": [
    "Avertissement 1 sur des clauses problématiques ou points d'attention",
    "Avertissement 2 si applicable",
    "etc."
  ],
  "recommendations": [
    "Recommandation juridique 1",
    "Recommandation juridique 2",
    "Recommandation juridique 3",
    "etc."
  ]
}

INSTRUCTIONS IMPORTANTES:
1. Analyse TOUS les détails visibles dans le(s) document(s)
2. Identifie le type exact de document juridique
3. Extrais les informations clés (dates, montants, parties, obligations, etc.)
4. Identifie les clauses importantes ou inhabituelles
5. Signale tout élément problématique ou non conforme
6. Donne des recommandations juridiques pratiques
7. Retourne UNIQUEMENT du JSON valide, sans texte additionnel avant ou après

Pour les types de documents courants:
- Contrat de travail: vérifie type (CDI/CDD/interim), salaire, durée, période d'essai, clauses particulières
- Mise en demeure: vérifie délais, montants réclamés, fondement juridique
- Bail de location: vérifie durée, loyer, charges, dépôt de garantie, conditions
- Courrier recommandé: vérifie expéditeur, destinataire, objet, délais mentionnés
- Facture: vérifie montants, dates, mentions légales obligatoires

Réponds UNIQUEMENT avec le JSON, sans introduction ni conclusion.`;
}
