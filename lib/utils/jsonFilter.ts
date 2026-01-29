import { DocumentJuridique } from '../types/analysis';
import {
  getAllDocuments,
  getGroupNames,
  getGroupMap,
  findDocumentById as findFromCache,
} from './documentCache';

/**
 * Charge les documents depuis le cache en mémoire.
 * Note: Le cache est initialisé au démarrage de l'application via initializeDocumentCache().
 * @returns Tableau de tous les documents.
 */
export function loadDocumentsJSON(): DocumentJuridique[] {
  return getAllDocuments();
}

/**
 * Récupère la liste des noms de groupes de domaines.
 * @returns Tableau trié des noms de groupes.
 */
export function getUniqueGroupeNoms(): string[] {
  return getGroupNames();
}

/**
 * Filtre les documents par domaine.
 * @param domaines - Liste des noms de domaines à filtrer.
 * @param limit - Nombre maximum de documents à retourner.
 * @returns Tableau de documents filtrés.
 */
export function filterDocumentsByDomains(
  domaines: string[],
  limit: number = 40
): DocumentJuridique[] {
  const documents = getAllDocuments();
  const groupesMap = getGroupMap();
  const domainesLower = domaines.map(d => d.toLowerCase());

  return documents
    .filter(doc => domainesLower.includes(doc.groupe_nom.toLowerCase()))
    .slice(0, limit);
}

/**
 * Trouve un document par son ID.
 * @param id - L'ID du document à trouver.
 * @returns Le document trouvé ou null si non trouvé.
 */
export function findDocumentById(id: number): DocumentJuridique | null {
  return findFromCache(id) ?? null;
}
