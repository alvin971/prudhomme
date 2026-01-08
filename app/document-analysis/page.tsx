'use client';
import { useState, useRef } from 'react';
import { FaBars, FaCamera, FaImage, FaSpinner, FaFilePdf } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

export default function DocumentAnalysisPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeDocuments = async () => {
    if (selectedImages.length === 0) {
      alert('Veuillez sélectionner au moins un document');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Préparer les fichiers pour l'envoi
      const formData = new FormData();
      selectedImages.forEach((file) => {
        formData.append('files', file);
      });

      // Appeler l'API d'analyse
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Erreur analyse:', error);
      alert('❌ Erreur lors de l\'analyse du document');
    } finally {
      setIsAnalyzing(false);
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
          <h1 className="text-xl font-semibold text-[#1E3A8A]">Analyser un Document</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-2xl p-6 text-white mb-6">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-2xl font-bold mb-2">Analyse intelligente de documents</h2>
          <p className="text-white/90 text-sm">
            Prenez en photo ou importez vos documents juridiques pour une analyse automatique par IA.
          </p>
        </div>

        {/* Image Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4">Ajouter des documents</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => imageInputRef.current?.click()}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-4 py-3 rounded-lg hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaImage /> Galerie
            </button>
            <button
              onClick={() => {
                if (imageInputRef.current) {
                  imageInputRef.current.setAttribute('capture', 'environment');
                  imageInputRef.current.click();
                }
              }}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] px-4 py-3 rounded-lg hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCamera /> Prendre une photo
            </button>
            <button
              onClick={() => pdfInputRef.current?.click()}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 bg-[#DC2626] text-white px-4 py-3 rounded-lg hover:bg-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaFilePdf /> Ajouter PDF
            </button>
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={pdfInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="bg-[#1E3A8A]/5 rounded-lg p-3 flex items-start gap-3">
            <span className="text-[#1E3A8A] text-xl">ℹ️</span>
            <p className="text-xs text-[#1E3A8A]">
              Types de documents supportés: contrats, mises en demeure, courriers recommandés, factures, etc.
            </p>
          </div>
        </div>

        {/* Selected Images Grid */}
        {selectedImages.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4">
              Documents sélectionnés ({selectedImages.length})
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative">
                  {file.type === 'application/pdf' ? (
                    <div className="w-full h-24 bg-[#DC2626]/10 rounded-lg flex flex-col items-center justify-center border-2 border-[#DC2626]">
                      <FaFilePdf className="text-3xl text-[#DC2626] mb-1" />
                      <p className="text-xs text-[#DC2626] font-semibold truncate w-full px-2 text-center">
                        {file.name}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Document ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-[#EF4444] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={analyzeDocuments}
              disabled={isAnalyzing}
              className="w-full bg-[#10B981] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <FaSpinner className="animate-spin" /> : '📊'} Analyser les documents
            </button>
          </div>
        )}

        {/* Analyzing Indicator */}
        {isAnalyzing && (
          <div className="bg-[#1E3A8A]/5 rounded-xl p-6 text-center">
            <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#1E3A8A] font-semibold mb-2">Analyse en cours...</p>
            <p className="text-[#1E3A8A]/70 text-sm mb-1">Claude Haiku analyse vos documents juridiques</p>
            <p className="text-[#1E3A8A]/60 text-xs italic">Cela peut prendre quelques secondes...</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            {/* Success Banner */}
            <div className="bg-[#10B981]/10 border border-[#10B981] rounded-xl p-4 flex items-center gap-3">
              <span className="text-[#10B981] text-3xl">✅</span>
              <div className="flex-1">
                <p className="font-semibold text-[#10B981]">Analyse terminée</p>
                <p className="text-sm text-[#10B981]/80">Confiance: {Math.round(analysisResult.confidence * 100)}%</p>
              </div>
            </div>

            {/* Type */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#1E3A8A] text-2xl">📝</span>
                <h3 className="text-lg font-semibold text-[#1E3A8A]">Type de document</h3>
              </div>
              <p className="text-[#0F172A]">{analysisResult.type}</p>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#0EA5E9] text-2xl">📋</span>
                <h3 className="text-lg font-semibold text-[#0EA5E9]">Résumé</h3>
              </div>
              <p className="text-[#0F172A] leading-relaxed">{analysisResult.summary}</p>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#10B981] text-2xl">✓</span>
                <h3 className="text-lg font-semibold text-[#10B981]">Points clés</h3>
              </div>
              {analysisResult.key_points.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full mt-2"></div>
                  <p className="text-[#0F172A] text-sm flex-1">{point}</p>
                </div>
              ))}
            </div>

            {/* Warnings */}
            {analysisResult.warnings.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#F59E0B] text-2xl">⚠️</span>
                  <h3 className="text-lg font-semibold text-[#F59E0B]">Points d'attention</h3>
                </div>
                {analysisResult.warnings.map((warning: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mt-2"></div>
                    <p className="text-[#0F172A] text-sm flex-1">{warning}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#1E3A8A] text-2xl">💡</span>
                <h3 className="text-lg font-semibold text-[#1E3A8A]">Recommandations</h3>
              </div>
              {analysisResult.recommendations.map((rec: string, i: number) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-2"></div>
                  <p className="text-[#0F172A] text-sm flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
