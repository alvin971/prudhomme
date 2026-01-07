'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { FaGavel, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navLinks = user ? [
    { href: '/chat', label: 'Assistant IA', icon: '💬' },
    { href: '/documents', label: 'Mes Documents', icon: '📄' },
    { href: '/profile', label: 'Profil', icon: '👤' },
  ] : [
    { href: '/#features', label: 'Fonctionnalités', icon: null },
    { href: '/#how-it-works', label: 'Comment ça marche', icon: null },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <FaGavel className="text-2xl" />
            PRUDHOMME
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                <div className="flex items-center gap-2 text-sm">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                <Link href="/auth/login" className="btn-secondary">
                  Se connecter
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Créer un compte
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 border-t mt-2 pt-4">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt />
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="space-y-2 border-t mt-2 pt-4">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full btn-secondary text-center"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full btn-primary text-center"
                  >
                    Créer un compte
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
