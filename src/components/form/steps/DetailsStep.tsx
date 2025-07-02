
import React from 'react';
import { Input } from '@/components/ui/input';
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
          Informações de Contato
        </h2>
        <p className="text-white/70 text-sm">
          Informe seus dados para contato
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
          <Label htmlFor="email" className="text-white/90 mb-2 block">
            Email (Opcional)
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-white/90 mb-2 block">
            Telefone (Opcional)
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
