'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Document } from '../services/documentService';

interface DocumentsContextType {
  documents: Document[];
  loading: boolean;
  addDocument: (doc: Omit<Document, 'id' | 'userId'>) => Promise<string>;
  updateDocumentReviewStatus: (id: string, status: string, reviewId?: string) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  refreshDocuments: () => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType>({} as DocumentsContextType);

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'documents'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
        } as Document;
      });

      setDocuments(docs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Erreur chargement documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [user]);

  const addDocument = async (document: Omit<Document, 'id' | 'userId'>): Promise<string> => {
    if (!user) throw new Error('Non authentifié');

    const docRef = await addDoc(collection(db, 'documents'), {
      ...document,
      userId: user.uid,
      createdAt: Timestamp.fromDate(document.createdAt),
    });

    await loadDocuments();
    return docRef.id;
  };

  const updateDocumentReviewStatus = async (
    id: string,
    reviewStatus: string,
    reviewId?: string
  ) => {
    const docRef = doc(db, 'documents', id);
    await updateDoc(docRef, {
      reviewStatus,
      ...(reviewId && { reviewId }),
      lastUpdated: Timestamp.now(),
    });
    await loadDocuments();
  };

  const deleteDocument = async (id: string) => {
    const docRef = doc(db, 'documents', id);
    await deleteDoc(docRef);
    await loadDocuments();
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        loading,
        addDocument,
        updateDocumentReviewStatus,
        deleteDocument,
        refreshDocuments: loadDocuments,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentsProvider');
  }
  return context;
};
