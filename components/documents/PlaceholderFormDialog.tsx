'use client';
import { useState } from 'react';
import { getPlaceholderLabel } from '@/lib/services/documentService';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

interface Props {
  placeholders: string[];
  documentType: string;
  onSubmit: (values: Record<string, string>) => void;
  onClose: () => void;
}

export default function PlaceholderFormDialog({ placeholders, documentType, onSubmit, onClose }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getIcon = (placeholder: string) => {
    if (placeholder.includes('NOM') || placeholder.includes('PRENOM')) return <FaUser />;
    if (placeholder.includes('EMAIL')) return <FaEnvelope />;
    if (placeholder.includes('TELEPHONE')) return <FaPhone />;
    if (placeholder.includes('ADRESSE') || placeholder.includes('VILLE')) return <FaMapMarkerAlt />;
    if (placeholder.includes('CODE_POSTAL')) return <FaBuilding />;
    return null;
  };

  const validate = (placeholder: string, value: string): string | null => {
    if (!value.trim()) return 'Ce champ est requis';

    if (placeholder.includes('EMAIL')) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) return 'Email invalide';
    }

    if (placeholder.includes('CODE_POSTAL')) {
      const postalRegex = /^\d{5}$/;
      if (!postalRegex.test(value)) return 'Code postal invalide (5 chiffres)';
    }

    if (placeholder.includes('TELEPHONE')) {
      const phoneRegex = /^[0-9\s\+\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) return 'Numéro de téléphone invalide';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    placeholders.forEach(placeholder => {
      const error = validate(placeholder, values[placeholder] || '');
      if (error) newErrors[placeholder] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  const organizeBySection = () => {
    const expediteur = placeholders.filter(p => p.includes('EXPEDITEUR'));
    const destinataire = placeholders.filter(p => p.includes('DESTINATAIRE'));
    const autres = placeholders.filter(p => !p.includes('EXPEDITEUR') && !p.includes('DESTINATAIRE'));

    return { expediteur, destinataire, autres };
  };

  const { expediteur, destinataire, autres } = organizeBySection();

  const renderField = (placeholder: string) => (
    <div key={placeholder} className="mb-4">
      <label className="block text-sm font-medium mb-2">{getPlaceholderLabel(placeholder)}</label>
      <div className="relative">
        {getIcon(placeholder) && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {getIcon(placeholder)}
          </div>
        )}
        <input
          type={placeholder.includes('EMAIL') ? 'email' : 'text'}
          value={values[placeholder] || ''}
          onChange={(e) => {
            setValues({ ...values, [placeholder]: e.target.value });
            if (errors[placeholder]) {
              const { [placeholder]: removed, ...rest } = errors;
              setErrors(rest);
            }
          }}
          className={`input-field ${getIcon(placeholder) ? 'pl-10' : ''} ${errors[placeholder] ? 'border-red-500' : ''}`}
          placeholder={getPlaceholderLabel(placeholder)}
        />
      </div>
      {errors[placeholder] && (
        <p className="text-red-500 text-sm mt-1">{errors[placeholder]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Remplir les informations</h2>
            <p className="text-white/80 mt-1">{documentType}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <p className="text-gray-600 mb-6">
            Complétez les informations ci-dessous pour personnaliser votre document.
          </p>

          {expediteur.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-primary mb-4">Vos informations</h3>
              {expediteur.map(renderField)}
            </div>
          )}

          {destinataire.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-primary mb-4">Informations du destinataire</h3>
              {destinataire.map(renderField)}
            </div>
          )}

          {autres.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-primary mb-4">Autres informations</h3>
              {autres.map(renderField)}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Valider et Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
