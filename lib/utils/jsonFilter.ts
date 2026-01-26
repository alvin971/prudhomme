import { DocumentJuridique } from '../types/analysis';

let cachedDocuments: DocumentJuridique[] | null = null;

export async function loadDocumentsJSON(): Promise<DocumentJuridique[]> {
  if (cachedDocuments) return cachedDocuments;

  const response = await fetch('/documents_juridiques.json');
  if (!response.ok) throw new Error('Impossible de charger le JSON');

  cachedDocuments = await response.json();
  return cachedDocuments!;
}

export async function getUniqueGroupeNoms(): Promise<string[]> {
  const documents = await loadDocumentsJSON();
  const groupeSet = new Set(documents.map(d => d.groupe_nom));
  return Array.from(groupeSet).sort();
}

export async function filterDocumentsByDomains(
  domaines: string[],
  limit: number = 40
): Promise<DocumentJuridique[]> {
  const documents = await loadDocumentsJSON();
  const domainesLower = domaines.map(d => d.toLowerCase());

  return documents
    .filter(doc => domainesLower.includes(doc.groupe_nom.toLowerCase()))
    .slice(0, limit);
}

export async function findDocumentById(id: number): Promise<DocumentJuridique | null> {
  const documents = await loadDocumentsJSON();
  return documents.find(d => d.document_id === id) || null;
}
