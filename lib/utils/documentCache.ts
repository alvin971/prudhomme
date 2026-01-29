import { DocumentJuridique, DocumentCache } from '../types/analysis';

// ====================================================================
// DOCUMENT CACHE SYSTEM - SINGLETON PATTERN
// ====================================================================

let documentCache: DocumentCache | null = null;
let initializationPromise: Promise<void> | null = null;

/**
 * Initialise le cache de documents si ce n'est pas déjà fait.
 * Cette fonction est asynchrone pour permettre le chargement du JSON.
 * @returns Une promesse qui se résout quand le cache est initialisé.
 */
export async function initializeDocumentCache(): Promise<void> {
  // Si le cache est déjà initialisé, retourner immédiatement
  if (documentCache) {
    return;
  }

  // Si une initialisation est déjà en cours, attendre son résultat
  if (initializationPromise) {
    return initializationPromise;
  }

  // Lancer l'initialisation
  initializationPromise = (async () => {
    try {
      // Charger le JSON depuis le dossier public
      const response = await fetch('/documents_juridiques.json');

      if (!response.ok) {
        throw new Error('Impossible de charger le JSON des documents');
      }

      const allDocs = await response.json() as DocumentJuridique[];

      // Construction du cache
      documentCache = {
        allDocs: new Map<number, DocumentJuridique>(
          allDocs.map((doc: DocumentJuridique) => [doc.document_id, doc])
        ),
        groupeNoms: Array.from(
          new Set(allDocs.map((doc: DocumentJuridique) => doc.groupe_nom))
        ).sort(),
        groupesMap: new Map(
          allDocs.map((doc: DocumentJuridique) => [doc.groupe_nom, doc.groupe_id])
        ),
      };

      console.log(`✅ Cache de documents initialisé avec ${allDocs.length} documents`);
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation du cache de documents:', error);
      throw error;
    }
  })();

  return initializationPromise;
}

/**
 * Retourne le cache de documents.
 * Cette fonction lance l'initialisation si ce n'est pas déjà fait.
 * @returns Le cache de documents.
 * @throws Error si le cache n'est pas initialisé.
 */
export function getDocumentCache(): DocumentCache {
  if (!documentCache) {
    throw new Error('Cache de documents non initialisé. Appelez initializeDocumentCache() au démarrage.');
  }
  return documentCache;
}

/**
 * Retourne toutes les données du cache.
 * @returns L'objet cache complet.
 */
export function getCacheData(): DocumentCache | null {
  return documentCache;
}

/**
 * Trouve un document par son ID.
 * @param documentId L'ID du document à trouver.
 * @returns Le document trouvé ou undefined si non trouvé.
 */
export function findDocumentById(documentId: number): DocumentJuridique | undefined {
  return getDocumentCache().allDocs.get(documentId);
}

/**
 * Retourne tous les documents sous forme de tableau.
 * @returns Tableau de tous les documents.
 */
export function getAllDocuments(): DocumentJuridique[] {
  return Array.from(getDocumentCache().allDocs.values());
}

/**
 * Retourne la liste des groupes de domaines.
 * @returns Tableau des noms de groupes.
 */
export function getGroupNames(): string[] {
  return getDocumentCache().groupeNoms;
}

/**
 * Retourne le mappage des groupes par nom.
 * @returns Map des noms de groupes vers leurs IDs.
 */
export function getGroupMap(): Map<string, number> {
  return getDocumentCache().groupesMap;
}

/**
 * Vérifie si le cache est initialisé.
 * @returns true si le cache est initialisé, false sinon.
 */
export function isCacheInitialized(): boolean {
  return documentCache !== null;
}

/**
 * Récupère le nombre de documents dans le cache.
 * @returns Le nombre de documents.
 */
export function getDocumentCount(): number {
  return documentCache?.allDocs.size ?? 0;
}

/**
 * Récupère le nombre de groupes de domaines.
 * @returns Le nombre de groupes.
 */
export function getGroupCount(): number {
  return documentCache?.groupeNoms.length ?? 0;
}
