'use client';
import { FaTimes, FaDownload } from 'react-icons/fa';
import { downloadPDF, generatePDF } from '@/lib/services/documentService';

interface DocumentViewerProps {
  document: {
    id: string;
    type: string;
    fileName: string;
    textContent: string;
  };
  onClose: () => void;
}

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const handleDownload = () => {
    const pdfBlob = generatePDF(document.textContent, document.type);
    downloadPDF(pdfBlob, document.fileName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-[#1E3A8A]">{document.type}</h2>
            <p className="text-sm text-[#64748B]">{document.fileName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              title="Télécharger"
            >
              <FaDownload className="text-xl text-[#1E3A8A]" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <FaTimes className="text-xl text-[#1E3A8A]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
            <pre className="whitespace-pre-wrap font-sans text-[#0F172A] leading-relaxed">
              {document.textContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
