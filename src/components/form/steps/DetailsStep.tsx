
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SupportFormData } from '@/types/form';

interface DetailsStepProps {
  formData: SupportFormData;
  updateFormData: (data: Partial<SupportFormData>) => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Informações Básicas
        </h2>
        <p className="text-white/70 text-sm">
          Informe seus dados e um resumo geral do que precisa
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white/90 mb-2 block">
            Seu Nome *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div>
          <Label htmlFor="title" className="text-white/90 mb-2 block">
            Título Geral do Chamado *
          </Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="Resumo geral dos problemas que você está enfrentando"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-white/90 mb-2 block">
            Descrição Geral (Opcional)
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md min-h-[100px] resize-none"
            placeholder="Contexto geral sobre os problemas que você vai descrever..."
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
