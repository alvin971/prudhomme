export type AnalysisPhase =
  | 'standard'           // Messages 1-3
  | 'calculating_domains' // Prompt 2 en cours
  | 'calculating_docs'    // Prompt 3 en cours
  | 'awaiting_selection'  // Attente choix utilisateur
  | 'extracting_data'     // Prompt 4 - collecte conversationnelle
  | 'ready_to_generate';  // Prêt pour génération

export interface DocumentJuridique {
  document_id: number;
  groupe_nom: string;
  groupe_id?: number;
  document_nom: string;
  donnees_necessaires: string;
  architecture?: string;
}

export interface DomainePertinent {
  groupe_nom: string;
  pourcentage: number;
  raison: string;
}

export interface AnalyseDomainesResult {
  domaines_pertinents: DomainePertinent[];
  analyse_globale: string;
  confiance_globale: number;
}

export interface DocumentSelectionne {
  document_id: number;
  document_nom: string;
  groupe_nom: string;
  architecture?: string;
  pourcentage: number;
  utilite: string;
  quand_utiliser: string;
  resultat_attendu: string;
  priorite: number;
}

export interface DocumentsSelectionResult {
  documents: DocumentSelectionne[];
  reponse_formatee: string;
}

export interface DonneeCollectee {
  cle: string;
  valeur: string;
  source?: string;
  confiance?: 'haute' | 'moyenne' | 'basse';
  a_preciser?: boolean;
}

export interface AnalysisState {
  phase: AnalysisPhase;
  userMessageCount: number;
  domainesResult?: AnalyseDomainesResult;
  documentsResult?: DocumentsSelectionResult;
  selectedDocument?: DocumentJuridique;
  extractionLoopCount: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface DocumentCache {
  allDocs: Map<number, DocumentJuridique>;
  groupeNoms: string[];
  groupesMap: Map<string, number>;
}
