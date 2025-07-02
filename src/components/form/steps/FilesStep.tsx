
import React, { useEffect } from 'react';
import { SupportFormData } from '@/types/form';
import ProblemManager from '../ProblemManager';

interface FilesStepProps {
  formData: SupportFormData;
  updateFormData: (data: Partial<SupportFormData>) => void;
}

const FilesStep: React.FC<FilesStepProps> = ({ formData, updateFormData }) => {
  // Inicializar com um problema vazio se não houver nenhum
  useEffect(() => {
    if (formData.problems.length === 0) {
      updateFormData({
        problems: [{
          id: Date.now().toString(),
          text: '',
          images: [],
          audios: []
        }]
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Descreva seus Problemas
        </h2>
        <p className="text-white/70">
          Descreva cada problema com texto, imagens e áudios explicativos
        </p>
      </div>

      {/* Gerenciador de problemas */}
      <ProblemManager
        problems={formData.problems}
        onProblemsChange={(problems) => updateFormData({ problems })}
      />
    </div>
  );
};

export default FilesStep;
