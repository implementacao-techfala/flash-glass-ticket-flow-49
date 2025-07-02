
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
          Descreva seu desafio em detalhes
        </h2>
        <p className="text-white/70 text-sm">
          (Pode listar mais de um desafio, se quiser economizar tempo.)
        </p>
        <p className="text-white/70 text-sm mt-2">
          Quanto mais descrever, mais claro vai ficar *
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
            Nome da empresa ou e-mail da conta *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="seu@email.com ou Nome da Empresa"
            required
          />
        </div>

        <div>
          <Label htmlFor="title" className="text-white/90 mb-2 block">
            Título do Problema *
          </Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
            placeholder="Resuma seu problema em poucas palavras"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-white/90 mb-2 block">
            Descrição Detalhada *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md min-h-[120px] resize-none"
            placeholder="Descreva detalhadamente seu problema, incluindo quando ocorreu, o que você estava fazendo, e qualquer mensagem de erro que tenha visto..."
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
