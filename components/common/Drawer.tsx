'use client';
import { useRouter } from 'next/navigation';
import { FaTimes, FaFileAlt, FaCommentDots, FaSearch, FaFolder, FaBalanceScale, FaUserTie } from 'react-icons/fa';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const MenuItem = ({ icon, title, subtitle, onClick }: any) => (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-4 rounded-lg hover:bg-[#F8FAFC] transition-colors text-left"
    >
      <div className="text-2xl text-[#1E3A8A] mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[#0F172A] font-medium">{title}</p>
        <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>
      </div>
    </button>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-[#1E3A8A]">PRUDHOMME</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl text-[#1E3A8A]" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav>
              <MenuItem
                icon={<FaCommentDots />}
                title="Nouvelle Conversation"
                subtitle="Assistant IA juridique"
                onClick={() => handleNavigation('/chat')}
              />

              <MenuItem
                icon={<FaFileAlt />}
                title="Mes Documents"
                subtitle="Documents générés"
                onClick={() => handleNavigation('/documents')}
              />

              <MenuItem
                icon={<FaSearch />}
                title="Analyser un Document"
                subtitle="Scanner et analyser"
                onClick={() => handleNavigation('/document-analysis')}
              />

              <div className="px-4 py-2">
                <div className="border-t border-[#E2E8F0]"></div>
              </div>

              <MenuItem
                icon={<FaFolder />}
                title="Mes Dossiers"
                subtitle="Gérer vos cas"
                onClick={() => handleNavigation('/cases')}
              />

              <MenuItem
                icon={<FaBalanceScale />}
                title="Aide Juridictionnelle"
                subtitle="Demander une aide"
                onClick={() => handleNavigation('/legal-aid')}
              />

              <MenuItem
                icon={<FaUserTie />}
                title="Avocats"
                subtitle="Trouver un avocat"
                onClick={() => handleNavigation('/lawyers')}
              />
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-xs text-[#64748B] text-center">
              © 2026 PRUDHOMME
            </p>
            <p className="text-xs text-[#64748B] text-center mt-1">
              Version Web 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
