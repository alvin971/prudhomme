'use client';
import Link from 'next/link';
import { FaGavel, FaTwitter, FaLinkedin, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
              <FaGavel />
              PRUDHOMME
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Votre assistant juridique intelligent pour les conseils de prud'hommes.
            </p>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <FaShieldAlt />
              <span>Conforme RGPD</span>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h3 className="font-bold mb-4">Produit</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/chat" className="hover:text-white transition-colors">
                  Assistant IA
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  Générateur de documents
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-bold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Politique des cookies
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} PRUDHOMME. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="mailto:contact@prudhomme.fr"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            PRUDHOMME est un outil d'assistance juridique automatisé. Les documents générés sont fournis à titre informatif
            et ne constituent pas un conseil juridique personnalisé. Pour des situations complexes, nous recommandons
            de consulter un avocat qualifié. La révision par avocat est un service optionnel proposé par nos partenaires.
          </p>
        </div>
      </div>
    </footer>
  );
}
