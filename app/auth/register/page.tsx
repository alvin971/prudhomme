'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { FaGoogle, FaEnvelope, FaLock, FaGavel } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      router.push('/chat');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/chat');
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion Google');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-primary mb-2">
            <FaGavel />
            PRUDHOMME
          </Link>
          <h1 className="text-2xl font-bold mt-4">Créer un compte</h1>
          <p className="text-gray-600 mt-2">Commencez gratuitement</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t"></div>
            <span className="text-sm text-gray-500">OU</span>
            <div className="flex-1 border-t"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-xl" />
            Continuer avec Google
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Se connecter
            </Link>
          </p>

          <p className="text-xs text-gray-500 mt-4 text-center">
            En créant un compte, vous acceptez nos{' '}
            <Link href="/terms" className="text-primary hover:underline">CGU</Link>
            {' '}et notre{' '}
            <Link href="/privacy" className="text-primary hover:underline">Politique de Confidentialité</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
