'use client';
import { useState } from 'react';
import { FaBars, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

interface Procedure {
  title: string;
  url: string;
  description?: string;
}

interface Category {
  title: string;
  icon: string;
  color: string;
  procedures: Procedure[];
}

export default function ProceduresPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      title: 'Justice et Plaintes',
      icon: '⚖️',
      color: '#1E3A8A',
      procedures: [
        {
          title: 'Plainte en ligne (atteintes aux biens)',
          url: 'https://plainte-en-ligne.masecurite.interieur.gouv.fr/',
          description: 'Déposer une plainte pour vol, vandalisme, etc.'
        },
        {
          title: 'Dépôt de plainte en ligne (e-escroqueries)',
          url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F1435',
          description: 'Service THESEE pour les escroqueries en ligne'
        },
        {
          title: 'Aide juridictionnelle (CERFA 52347*03)',
          url: 'https://www.formulaires.service-public.gouv.fr/gf/cerfa_52347.do',
          description: 'Demande d\'aide financière pour frais de justice'
        }
      ]
    },
    {
      title: 'Création d\'Entreprise',
      icon: '🏢',
      color: '#0EA5E9',
      procedures: [
        {
          title: 'Création d\'entreprise (tous types)',
          url: 'https://formalites.entreprises.gouv.fr/',
          description: 'Guichet unique pour toutes les formalités'
        },
        {
          title: 'Dépôt de marque',
          url: 'https://www.inpi.fr/realiser-demarches/propriete-intellectuelle/deposer-sa-marque',
          description: 'Protéger votre marque auprès de l\'INPI'
        },
        {
          title: 'Dépôt de brevet',
          url: 'https://www.inpi.fr/realiser-demarches/propriete-intellectuelle/deposer-un-brevet',
          description: 'Protéger votre invention'
        },
        {
          title: 'Inscription aux registres PI',
          url: 'https://www.inpi.fr/services-et-prestations/inscription-aux-registres-pi-en-ligne',
          description: 'Propriété intellectuelle en ligne'
        }
      ]
    },
    {
      title: 'Succession et Héritage',
      icon: '📜',
      color: '#8B5CF6',
      procedures: [
        {
          title: 'Déclaration de succession (CERFA 2705-SD)',
          url: 'https://www.impots.gouv.fr/formulaire/2705-sd/declaration-de-succession',
          description: 'Déclarer une succession aux impôts'
        },
        {
          title: 'Formulaire succession (détail des biens)',
          url: 'https://www.service-public.fr/particuliers/vosdroits/R10279',
          description: 'Inventaire détaillé des biens de la succession'
        },
        {
          title: 'Acceptation succession à concurrence actif net',
          url: 'https://www.service-public.fr/particuliers/vosdroits/F1199',
          description: 'Accepter une succession sous conditions'
        }
      ]
    },
    {
      title: 'PACS et Mariage',
      icon: '💍',
      color: '#EC4899',
      procedures: [
        {
          title: 'Convention-type PACS (CERFA 15726*02)',
          url: 'https://www.service-public.fr/particuliers/vosdroits/R48755',
          description: 'Modèle de convention pour PACS'
        },
        {
          title: 'Dissolution PACS (CERFA 15789*03)',
          url: 'https://www.service-public.fr/particuliers/vosdroits/R73180',
          description: 'Mettre fin à un PACS'
        },
        {
          title: 'Simulateur dossier mariage/PACS',
          url: 'https://www.service-public.fr/particuliers/actualites/A16636',
          description: 'Simuler les documents nécessaires'
        }
      ]
    },
    {
      title: 'Formulaires Administratifs',
      icon: '📋',
      color: '#10B981',
      procedures: [
        {
          title: 'Base de tous les formulaires (800+)',
          url: 'https://www.formulaires.service-public.gouv.fr/gf/recherche.do',
          description: 'Recherche dans tous les formulaires officiels'
        },
        {
          title: 'Service Public (démarches)',
          url: 'https://www.service-public.fr/particuliers/vosdroits/demarches-et-outils',
          description: 'Toutes les démarches pour particuliers'
        },
        {
          title: 'Dépôt de formulaires par catégorie',
          url: 'https://entreprendre.service-public.fr/',
          description: 'Formulaires pour entreprises'
        }
      ]
    },
    {
      title: 'Points d\'Accueil',
      icon: '🏛️',
      color: '#F59E0B',
      procedures: [
        {
          title: 'Points-Justice',
          url: 'https://www.justice.fr/actu/point-justice',
          description: 'Trouver un Point-Justice près de chez vous'
        },
        {
          title: 'France Services',
          url: 'https://www.cohesion-territoires.gouv.fr/france-services',
          description: 'Guichets d\'accueil pour toutes démarches'
        }
      ]
    }
  ];

  const filteredCategories = categories
    .map(category => ({
      ...category,
      procedures: category.procedures.filter(proc =>
        proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (proc.description && proc.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }))
    .filter(category =>
      category.procedures.length > 0 &&
      (selectedCategory === null || category.title === selectedCategory)
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="text-xl text-[#1E3A8A]" />
          </button>
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Démarches en Ligne</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-2xl p-6 text-white mb-6">
          <div className="text-5xl mb-4">🌐</div>
          <h2 className="text-2xl font-bold mb-2">Procédures Administratives</h2>
          <p className="text-white/90 text-sm">
            Accédez directement aux formulaires et démarches officiels en ligne
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Rechercher une démarche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <p className="text-sm font-semibold text-[#0F172A] mb-3">Filtrer par catégorie</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1E3A8A]'
              }`}
            >
              Toutes
            </button>
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(category.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.title
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1E3A8A]'
                }`}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Procedures */}
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl text-[#64748B]/30 mb-6">🔍</div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Aucune démarche trouvée</h2>
            <p className="text-[#64748B] text-center">
              Essayez avec d'autres termes de recherche
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-bold" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.procedures.map((procedure, index) => (
                    <a
                      key={index}
                      href={procedure.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#F8FAFC] hover:bg-[#E2E8F0] rounded-lg p-4 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F172A] mb-1 group-hover:text-[#1E3A8A] transition-colors">
                            {procedure.title}
                          </h4>
                          {procedure.description && (
                            <p className="text-sm text-[#64748B]">{procedure.description}</p>
                          )}
                        </div>
                        <FaExternalLinkAlt className="text-[#64748B] group-hover:text-[#1E3A8A] transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Footer */}
        <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9] rounded-xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <span className="text-[#0EA5E9] text-2xl">ℹ️</span>
            <div>
              <p className="text-sm text-[#0EA5E9] font-semibold mb-1">Sites officiels</p>
              <p className="text-sm text-[#0EA5E9]/80">
                Tous les liens sont des sites gouvernementaux officiels français (.gouv.fr, .fr).
                Méfiez-vous des sites tiers qui proposent des services payants pour des démarches gratuites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
