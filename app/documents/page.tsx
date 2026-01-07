'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useDocuments } from '@/lib/contexts/DocumentsContext';
import { extractPlaceholders, replacePlaceholders, generatePDF, downloadPDF, getPlaceholderLabel, getStandardPlaceholders } from '@/lib/services/documentService';
import { createCheckoutSession } from '@/lib/services/stripeService';
import { submitDocumentForReview } from '@/lib/services/lawyerReviewService';
import { FaFileAlt, FaDownload, FaEdit, FaGavel, FaTrash, FaClock, FaCheckCircle, FaHourglass, FaBars } from 'react-icons/fa';
import PlaceholderFormDialog from '@/components/documents/PlaceholderFormDialog';
import LawyerReviewDialog from '@/components/documents/LawyerReviewDialog';
import DocumentViewer from '@/components/documents/DocumentViewer';
import Drawer from '@/components/common/Drawer';

export default function DocumentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { documents, loading, deleteDocument, updateDocumentReviewStatus } = useDocuments();
  const [testDocuments, setTestDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showPlaceholderForm, setShowPlaceholderForm] = useState(false);
  const [showLawyerReviewDialog, setShowLawyerReviewDialog] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // MODE TEST: Bypass authentication
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth/login');
  //   }
  // }, [user, router]);

  // MODE TEST: Charger les documents du localStorage
  useEffect(() => {
    const storedDocs = localStorage.getItem('test_documents');
    if (storedDocs) {
      setTestDocuments(JSON.parse(storedDocs));
    }
  }, []);

  const handleViewDocument = (doc: any) => {
    setSelectedDoc(doc);
    setShowDocumentViewer(true);
  };

  const handleFillPlaceholders = (doc: any) => {
    setSelectedDoc(doc);
    const extracted = extractPlaceholders(doc.textContent);
    setPlaceholders(extracted.length > 0 ? extracted : getStandardPlaceholders());
    setShowPlaceholderForm(true);
  };

  const handlePlaceholderSubmit = async (values: Record<string, string>) => {
    if (!selectedDoc) return;

    try {
      const filledContent = replacePlaceholders(selectedDoc.textContent, values);
      const pdfBlob = generatePDF(filledContent, `${selectedDoc.type} (Rempli)`);
      downloadPDF(pdfBlob, `${selectedDoc.fileName.replace('.pdf', '_rempli.pdf')}`);

      alert('✅ Document rempli téléchargé avec succès !');
      setShowPlaceholderForm(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors du remplissage du document');
    }
  };

  const handleDownload = (doc: any) => {
    const pdfBlob = generatePDF(doc.textContent, doc.type);
    downloadPDF(pdfBlob, doc.fileName);
  };

  const handleLawyerReview = (doc: any) => {
    setSelectedDoc(doc);
    setShowLawyerReviewDialog(true);
  };

  const handleLawyerReviewConfirm = async () => {
    if (!selectedDoc || !user) return;

    setShowLawyerReviewDialog(false);
    setProcessingPayment(true);

    try {
      // Créer la session Stripe
      await createCheckoutSession(selectedDoc.id, user.uid, user.email || '');

      // Le webhook Stripe mettra à jour le statut après paiement
    } catch (error) {
      console.error('Erreur paiement:', error);
      alert('❌ Erreur lors du paiement');
      setProcessingPayment(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await deleteDocument(docId);
        alert('✅ Document supprimé');
      } catch (error) {
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  // MODE TEST: Ne pas bloquer si pas d'utilisateur
  // if (!user) return null;

  // MODE TEST: Utiliser testDocuments si pas de user
  const displayDocuments = user ? documents : testDocuments;
  const isLoading = user ? loading : false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="text-xl text-[#1E3A8A]" />
          </button>
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Mes Documents</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Documents List */}
      <div className="container mx-auto p-6">
        {displayDocuments.length === 0 ? (
          <div className="text-center py-20">
            <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Aucun document généré</h2>
            <p className="text-gray-600 mb-8">
              Commencez une conversation avec notre assistant juridique pour générer votre premier document
            </p>
            <button onClick={() => router.push('/chat')} className="btn-primary">
              Démarrer une Conversation
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {displayDocuments.map(doc => (
              <div key={doc.id} className="card">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-colors"
                  >
                    <FaFileAlt className="text-3xl text-primary" />
                  </button>
                  <div className="flex-1">
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="text-left hover:text-primary-dark transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-2">{doc.type}</h3>
                    </button>
                    <p className="text-sm text-gray-500 mb-1">{doc.fileName}</p>
                    <p className="text-sm text-gray-500">
                      Créé le {new Date(doc.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleFillPlaceholders(doc)}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <FaEdit /> Remplir
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <FaDownload /> Télécharger
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
                      >
                        <FaTrash /> Supprimer
                      </button>
                    </div>

                    {/* Lawyer Review Button */}
                    {(!doc.reviewStatus || doc.reviewStatus === 'refunded') && (
                      <button
                        onClick={() => handleLawyerReview(doc)}
                        className="btn-green w-full mt-4 flex items-center justify-center gap-2 text-lg"
                        disabled={processingPayment}
                      >
                        <FaGavel />
                        Finalisation par avocat - 99,99€
                      </button>
                    )}

                    {/* Review Status Badges */}
                    {doc.reviewStatus === 'pending' && (
                      <div className="mt-4 p-4 bg-orange-50 border border-orange-300 rounded-lg flex items-center gap-3">
                        <FaClock className="text-2xl text-orange-600" />
                        <div>
                          <p className="font-semibold text-orange-800">En attente de révision</p>
                          <p className="text-sm text-orange-700">Délai : 48-72h ouvrées</p>
                        </div>
                      </div>
                    )}

                    {doc.reviewStatus === 'in_review' && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg flex items-center gap-3">
                        <FaHourglass className="text-2xl text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">Révision en cours</p>
                          <p className="text-sm text-blue-700">L'avocat travaille sur votre document...</p>
                        </div>
                      </div>
                    )}

                    {doc.reviewStatus === 'completed' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg flex items-center gap-3">
                        <FaCheckCircle className="text-2xl text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Document révisé par l'avocat</p>
                          <p className="text-sm text-green-700">Vous pouvez maintenant le télécharger</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      {showPlaceholderForm && selectedDoc && (
        <PlaceholderFormDialog
          placeholders={placeholders}
          documentType={selectedDoc.type}
          onSubmit={handlePlaceholderSubmit}
          onClose={() => setShowPlaceholderForm(false)}
        />
      )}

      {showLawyerReviewDialog && selectedDoc && (
        <LawyerReviewDialog
          documentType={selectedDoc.type}
          onConfirm={handleLawyerReviewConfirm}
          onClose={() => setShowLawyerReviewDialog(false)}
        />
      )}

      {showDocumentViewer && selectedDoc && (
        <DocumentViewer
          document={selectedDoc}
          onClose={() => setShowDocumentViewer(false)}
        />
      )}
    </div>
  );
}
