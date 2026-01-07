'use client';
import { FaTimes, FaGavel, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

interface Props {
  documentType: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function LawyerReviewDialog({ documentType, onConfirm, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FaGavel className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Finalisation par avocat</h2>
              <p className="text-white/80 text-sm mt-1">Service premium</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Document concerné :</strong> {documentType}
            </p>
          </div>

          <h3 className="font-bold text-lg mb-4">Ce service comprend :</h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Révision juridique complète</p>
                <p className="text-sm text-gray-600">Vérification par un avocat certifié en droit du travail</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Corrections et optimisations</p>
                <p className="text-sm text-gray-600">Amélioration de la force juridique de votre document</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Conseils personnalisés</p>
                <p className="text-sm text-gray-600">Recommandations adaptées à votre situation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Délai de traitement : 48h</p>
                <p className="text-sm text-gray-600">Réponse garantie sous 2 jours ouvrés</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FaShieldAlt className="text-green-600" />
              <p className="font-semibold">Garantie satisfait ou remboursé</p>
            </div>
            <p className="text-sm text-gray-600">
              Si vous n'êtes pas satisfait de la révision, nous vous remboursons intégralement.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tarif unique</p>
                <p className="text-3xl font-bold text-green-700">99,99 €</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Paiement sécurisé</p>
                <p className="text-xs text-gray-500">via Stripe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button onClick={onConfirm} className="btn-primary bg-green-600 hover:bg-green-700">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  );
}
