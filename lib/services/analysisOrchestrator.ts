import { AnalysisState, AnalysisPhase, Message } from '../types/analysis';
import { calculateDomains } from './domainCalculator';
import { calculateDocuments } from './documentCalculator';
import { sendConversationalDataCollection } from './dataExtractor';
import { getUniqueGroupeNoms, filterDocumentsByDomains, findDocumentById } from '../utils/jsonFilter';
import { detectUserChoice } from '../utils/choiceDetector';
import { shouldGenerateDocument } from '../utils/prompts'; // Fonction existante

export function createInitialAnalysisState(): AnalysisState {
  return {
    phase: 'standard',
    userMessageCount: 0,
    extractionLoopCount: 0
  };
}

function countUserMessages(messages: Message[]): number {
  return messages.filter(m => m.role === 'user').length;
}

function formatConversationHistory(messages: Message[]): string {
  return messages
    .map(m => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`)
    .join('\n\n');
}

export async function processWithAnalysis(
  messages: Message[],
  currentState: AnalysisState,
  onPhaseChange: (phase: AnalysisPhase, message?: string) => void
): Promise<{
  response: string;
  newState: AnalysisState;
  shouldUseStandardPrompt: boolean;
}> {
  const userCount = countUserMessages(messages);
  let newState: AnalysisState = { ...currentState, userMessageCount: userCount };

  // ============================================
  // Messages 1-3 : Prompt standard (existant)
  // ============================================
  if (userCount < 4) {
    return {
      response: '',
      newState: { ...newState, phase: 'standard' },
      shouldUseStandardPrompt: true
    };
  }

  // ============================================
  // Message 4 : Déclencher l'analyse
  // ============================================
  if (userCount === 4 && currentState.phase === 'standard') {
    onPhaseChange('calculating_domains', '🔍 Analyse de votre situation...');

    const conversationText = formatConversationHistory(messages);
    const groupeNoms = await getUniqueGroupeNoms();

    // Prompt 2 : Calcul des domaines
    const domainesResult = await calculateDomains(groupeNoms, conversationText);
    newState.domainesResult = domainesResult;

    if (domainesResult.domaines_pertinents.length === 0) {
      return {
        response: 'Je n\'ai pas pu identifier clairement le domaine juridique. Pourriez-vous me donner plus de détails ?',
        newState: { ...newState, phase: 'standard' },
        shouldUseStandardPrompt: false
      };
    }

    onPhaseChange('calculating_docs', '📋 Sélection des documents adaptés...');

    // Filtrer le JSON
    const domaineNames = domainesResult.domaines_pertinents.map(d => d.groupe_nom);
    const filteredDocs = await filterDocumentsByDomains(domaineNames, 40);

    // Prompt 3 : Sélection des documents
    const documentsResult = await calculateDocuments(filteredDocs, domainesResult, conversationText);
    newState.documentsResult = documentsResult;
    newState.phase = 'awaiting_selection';

    return {
      response: documentsResult.reponse_formatee,
      newState,
      shouldUseStandardPrompt: false
    };
  }

  // ============================================
  // Attente de sélection
  // ============================================
  if (currentState.phase === 'awaiting_selection' && currentState.documentsResult) {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    const choice = detectUserChoice(lastUserMessage, currentState.documentsResult.documents);

    if (choice) {
      const selectedDoc = await findDocumentById(choice.document_id);

      if (selectedDoc) {
        newState.selectedDocument = selectedDoc;
        newState.phase = 'extracting_data';
        newState.extractionLoopCount = 1;

        onPhaseChange('extracting_data', '📝 Vérification des informations...');

        // Prompt 4 : Collecte conversationnelle
        const conversationText = formatConversationHistory(messages);
        const conversationalResponse = await sendConversationalDataCollection(selectedDoc, conversationText);

        if (shouldGenerateDocument(conversationalResponse)) {
          newState.phase = 'ready_to_generate';
          return { response: 'GENERATE_DOCUMENT', newState, shouldUseStandardPrompt: false };
        }

        return { response: conversationalResponse, newState, shouldUseStandardPrompt: false };
      }
    }

    return {
      response: 'Je n\'ai pas compris votre choix. Indiquez le numéro (1, 2 ou 3) ou le nom du document souhaité.',
      newState,
      shouldUseStandardPrompt: false
    };
  }

  // ============================================
  // Boucle de collecte conversationnelle
  // ============================================
  if (currentState.phase === 'extracting_data' && currentState.selectedDocument) {
    newState.extractionLoopCount = (currentState.extractionLoopCount || 0) + 1;

    // Protection boucle infinie
    if (newState.extractionLoopCount > 15) {
      newState.phase = 'ready_to_generate';
      return { response: 'GENERATE_DOCUMENT', newState, shouldUseStandardPrompt: false };
    }

    const conversationText = formatConversationHistory(messages);
    const conversationalResponse = await sendConversationalDataCollection(
      currentState.selectedDocument,
      conversationText
    );

    if (shouldGenerateDocument(conversationalResponse)) {
      newState.phase = 'ready_to_generate';
      return { response: 'GENERATE_DOCUMENT', newState, shouldUseStandardPrompt: false };
    }

    return { response: conversationalResponse, newState, shouldUseStandardPrompt: false };
  }

  // ============================================
  // Prêt à générer
  // ============================================
  if (currentState.phase === 'ready_to_generate') {
    return { response: 'GENERATE_DOCUMENT', newState, shouldUseStandardPrompt: false };
  }

  // Fallback
  return { response: '', newState, shouldUseStandardPrompt: true };
}

export function resetAnalysisState(): AnalysisState {
  return createInitialAnalysisState();
}
