'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useDocuments } from '@/lib/contexts/DocumentsContext';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { FaUser, FaEnvelope, FaFileAlt, FaGavel, FaShieldAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { documents } = useDocuments();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalDocuments = documents.length;
  const pendingReviews = documents.filter(d => d.reviewStatus === 'pending').length;
  const completedReviews = documents.filter(d => d.reviewStatus === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

        {/* User Info Card */}
        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <FaUser className="text-3xl text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.displayName || 'Utilisateur'}</h2>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <FaEnvelope />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              <strong>Membre depuis :</strong> {new Date(user.metadata.creationTime || '').toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FaFileAlt className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents générés</p>
                <p className="text-2xl font-bold text-blue-600">{totalDocuments}</p>
              </div>
            </div>
          </div>

          <div className="card bg-orange-50 border-orange-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <FaGavel className="text-2xl text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Révisions en cours</p>
                <p className="text-2xl font-bold text-orange-600">{pendingReviews}</p>
              </div>
            </div>
          </div>

          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <FaShieldAlt className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Révisions complétées</p>
                <p className="text-2xl font-bold text-green-600">{completedReviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Paramètres du compte</h3>

          <div className="space-y-4">
            <div className="pb-4 border-b">
              <label className="block text-sm font-medium mb-2">Nom d'affichage</label>
              <input
                type="text"
                defaultValue={user.displayName || ''}
                className="input-field"
                placeholder="Votre nom"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                La modification du nom n'est pas encore disponible.
              </p>
            </div>

            <div className="pb-4 border-b">
              <label className="block text-sm font-medium mb-2">Adresse email</label>
              <input
                type="email"
                value={user.email || ''}
                className="input-field bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                L'email ne peut pas être modifié pour des raisons de sécurité.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <button className="btn-secondary" disabled>
                Changer le mot de passe
              </button>
              <p className="text-xs text-gray-500 mt-1">
                La modification du mot de passe sera bientôt disponible.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card mt-6">
          <h3 className="text-xl font-bold mb-4">Confidentialité et Sécurité</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <FaShieldAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-sm">Conformité RGPD</p>
                <p className="text-xs text-gray-600">Vos données sont protégées selon le RGPD</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FaShieldAlt className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-sm">Chiffrement des données</p>
                <p className="text-xs text-gray-600">Toutes vos données sont chiffrées</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <FaShieldAlt className="text-purple-600 text-xl" />
              <div>
                <p className="font-semibold text-sm">Aucune conservation des échanges</p>
                <p className="text-xs text-gray-600">Les conversations ne sont pas stockées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card mt-6 border-red-200">
          <h3 className="text-xl font-bold text-red-600 mb-4">Zone dangereuse</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-3">
                La suppression de votre compte est définitive et irréversible. Tous vos documents seront supprimés.
              </p>
              <button className="btn-secondary text-red-600 border-red-300 hover:bg-red-50" disabled>
                Supprimer mon compte
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Cette fonctionnalité sera bientôt disponible.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
