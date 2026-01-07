'use client';
import { useState } from 'react';
import { FaBars, FaBalanceScale, FaCheckCircle, FaStar, FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

export default function LegalAidPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Aide Juridictionnelle</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-2xl p-6 text-white mb-6">
          <div className="text-5xl mb-4">⚖️</div>
          <h2 className="text-2xl font-bold mb-2">Aide juridictionnelle simplifiée</h2>
          <p className="text-white/90 text-sm">
            Nous vous aidons à constituer votre dossier d'aide juridictionnelle en quelques étapes simples.
          </p>
        </div>

        {/* Eligibility Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-4">
            <FaCheckCircle className="text-2xl text-[#10B981]" />
            <h3 className="text-lg font-semibold text-[#0F172A]">Êtes-vous éligible ?</h3>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">
                Ressources mensuelles inférieures à 1 393€ (aide totale)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">
                Ressources mensuelles entre 1 393€ et 2 089€ (aide partielle)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">
                Résidence habituelle en France
              </p>
            </div>
          </div>
          <div className="bg-[#0EA5E9]/10 rounded-lg p-3 flex items-start gap-3">
            <FaInfoCircle className="text-[#0EA5E9] text-lg mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#0EA5E9]">
              Ces montants sont majorés en fonction du nombre de personnes à charge.
            </p>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-4">
            <FaStar className="text-2xl text-[#F59E0B]" />
            <h3 className="text-lg font-semibold text-[#0F172A]">Avantages de l'aide</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-[#0F172A]">Prise en charge des honoraires d'avocat</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-[#0F172A]">Exemption des frais de justice</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-[#0F172A]">Aide pour tous types de procédures</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-[#0F172A]">Accompagnement juridique complet</p>
            </div>
          </div>
        </div>

        {/* Required Documents Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-2xl text-[#1E3A8A]" />
            <h3 className="text-lg font-semibold text-[#0F172A]">Documents à préparer</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaFileAlt className="text-[#64748B] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">Pièce d'identité</p>
            </div>
            <div className="flex items-start gap-3">
              <FaFileAlt className="text-[#64748B] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">Justificatif de domicile</p>
            </div>
            <div className="flex items-start gap-3">
              <FaFileAlt className="text-[#64748B] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">Avis d'imposition ou non-imposition</p>
            </div>
            <div className="flex items-start gap-3">
              <FaFileAlt className="text-[#64748B] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">Justificatifs de ressources (3 derniers mois)</p>
            </div>
            <div className="flex items-start gap-3">
              <FaFileAlt className="text-[#64748B] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#0F172A]">Livret de famille (si applicable)</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-[#1E3A8A] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1E40AF] flex items-center justify-center gap-2 text-lg">
          <FaFileAlt /> Commencer ma demande
        </button>
      </div>
    </div>
  );
}
