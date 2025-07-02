
import React from 'react';
import { HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { SupportFormData } from '@/types/form';

interface TypeStepProps {
  formData: SupportFormData;
  updateFormData: (data: Partial<SupportFormData>) => void;
}

const TypeStep: React.FC<TypeStepProps> = ({ formData, updateFormData }) => {
  const types = [
    { 
      id: 'help', 
      label: '✅ Dúvida sobre como usar a plataforma | Não sabe configurar', 
      icon: HelpCircle, 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'error', 
      label: '❌ Erro ou bug aparente (algo que não está funcionando corretamente mesmo que configurado corretamente)', 
      icon: AlertTriangle, 
      color: 'from-red-500 to-orange-500' 
    },
    { 
      id: 'suggestion', 
      label: '🧪 Não encontrou alguma funcionalidade que acha que deveria existir?', 
      icon: Lightbulb, 
      color: 'from-purple-500 to-blue-500' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Qual é o tipo de solicitação? *
        </h2>
        <div className="space-y-2 text-white/80 text-sm">
          <p>⚡ Para garantir agilidade no atendimento e que toda dúvida ou pedido de suporte seja resolvido da melhor forma possível, preencha o formulário abaixo. ⚡</p>
          <p>🕒 Ele leva de 40 segundos a 2 minutos para ser preenchido — rapidinho mesmo!</p>
          <p>✅ Você pode listar mais de um desafio ou dúvida no mesmo envio.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected = formData.type === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => updateFormData({ type: type.id as SupportFormData['type'] })}
              className={`
                relative p-6 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 text-left
                ${isSelected 
                  ? 'border-white/50 bg-white/20 shadow-lg' 
                  : 'border-white/20 bg-white/10 hover:bg-white/15'
                }
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color} flex-shrink-0 mt-1`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-medium leading-relaxed">
                    {type.label}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full" />
              )}  
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeStep;
