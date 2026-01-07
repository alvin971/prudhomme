'use client';
import { useState } from 'react';
import { FaBars, FaUserTie, FaStar, FaMapMarkerAlt, FaEye, FaCalendarAlt } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

export default function LawyersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  const lawyers = [
    {
      id: '1',
      name: 'Me. Sophie Martin',
      specialization: 'Droit du travail',
      rating: 4.8,
      reviewCount: 127,
      consultationFee: 50.0,
      city: 'Paris',
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Me. Thomas Dubois',
      specialization: 'Droit de la consommation',
      rating: 4.6,
      reviewCount: 98,
      consultationFee: 45.0,
      city: 'Lyon',
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Me. Marie Leclerc',
      specialization: 'Droit du logement',
      rating: 4.9,
      reviewCount: 156,
      consultationFee: 55.0,
      city: 'Marseille',
      isAvailable: false,
    },
  ];

  const specializations = [
    'Droit du travail',
    'Droit de la consommation',
    'Droit du logement',
    'Droit de la famille',
  ];

  const filteredLawyers = selectedSpecialization
    ? lawyers.filter((lawyer) => lawyer.specialization === selectedSpecialization)
    : lawyers;

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[1][0] + parts[2][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

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
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Trouver un Avocat</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white shadow-sm p-4">
        <p className="text-sm font-semibold text-[#0F172A] mb-3">Filtrer par spécialisation</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialization(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSpecialization === null
                ? 'bg-[#1E3A8A] text-white'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1E3A8A]'
            }`}
          >
            Tous
          </button>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialization(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSpecialization === spec
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1E3A8A]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Lawyers List */}
      <div className="p-4 max-w-4xl mx-auto">
        {filteredLawyers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl text-[#64748B]/30 mb-6">🔍</div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Aucun avocat trouvé</h2>
            <p className="text-[#64748B] text-center">
              Essayez avec d'autres critères
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-[#1E3A8A]">
                      {getInitials(lawyer.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {lawyer.name}
                      </h3>
                      {lawyer.isAvailable && (
                        <span className="bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2 py-1 rounded">
                          Disponible
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#64748B] mb-1">
                      {lawyer.specialization}
                    </p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-[#F59E0B] text-sm" />
                      <span className="text-sm font-medium text-[#0F172A]">
                        {lawyer.rating}
                      </span>
                      <span className="text-xs text-[#64748B]">
                        ({lawyer.reviewCount} avis)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#E2E8F0] mb-4"></div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="text-sm">{lawyer.city}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#1E3A8A]">
                    Consultation: {lawyer.consultationFee}€
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] px-4 py-2 rounded-lg font-medium hover:bg-[#F8FAFC] flex items-center justify-center gap-2">
                    <FaEye /> Voir le profil
                  </button>
                  <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1E40AF] flex items-center justify-center gap-2">
                    <FaCalendarAlt /> Prendre RDV
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
