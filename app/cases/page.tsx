'use client';
import { useState } from 'react';
import { FaBars, FaGavel, FaCalendarAlt, FaUser, FaPlayCircle, FaClock, FaCheckCircle, FaPlus } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

export default function CasesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sample cases data
  const cases = [
    {
      id: '1',
      title: 'Licenciement abusif',
      domain: 'Droit du travail',
      status: 'En cours',
      date: '15/12/2024',
      lawyer: 'Me. Sophie Martin',
    },
    {
      id: '2',
      title: 'Litige locatif',
      domain: 'Droit du logement',
      status: 'En attente',
      date: '10/12/2024',
      lawyer: null,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'En cours':
        return {
          color: '#10B981',
          icon: <FaPlayCircle />,
        };
      case 'En attente':
        return {
          color: '#F59E0B',
          icon: <FaClock />,
        };
      case 'Terminé':
        return {
          color: '#64748B',
          icon: <FaCheckCircle />,
        };
      default:
        return {
          color: '#64748B',
          icon: <FaClock />,
        };
    }
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
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Mes Dossiers</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {cases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl text-[#64748B]/30 mb-6">📁</div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Aucun dossier</h2>
            <p className="text-[#64748B] text-center mb-8 max-w-md">
              Commencez par une évaluation gratuite pour créer votre premier dossier
            </p>
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E40AF] flex items-center gap-2">
              <FaPlus /> Nouveau dossier
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map((caseData) => {
              const statusConfig = getStatusConfig(caseData.status);
              return (
                <div
                  key={caseData.id}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1E3A8A]/10 rounded-xl p-3 flex-shrink-0">
                      <FaGavel className="text-2xl text-[#1E3A8A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                        {caseData.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mb-4">
                        {caseData.domain}
                      </p>

                      <div className="h-px bg-[#E2E8F0] mb-4"></div>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2" style={{ color: statusConfig.color }}>
                          {statusConfig.icon}
                          <span className="text-sm font-medium">{caseData.status}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#64748B]">
                          <FaCalendarAlt className="text-sm" />
                          <span className="text-sm">{caseData.date}</span>
                        </div>
                      </div>

                      {caseData.lawyer && (
                        <div className="flex items-center gap-2 text-[#64748B] mt-3">
                          <FaUser className="text-sm" />
                          <span className="text-sm">{caseData.lawyer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Action Button */}
        {cases.length > 0 && (
          <button className="fixed bottom-6 right-6 bg-[#1E3A8A] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1E40AF] flex items-center gap-2 font-semibold">
            <FaPlus /> Nouveau dossier
          </button>
        )}
      </div>
    </div>
  );
}
