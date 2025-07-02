
import React from 'react';
import { Clock, AlertCircle, Zap, Flame } from 'lucide-react';
import { SupportFormData } from '@/types/form';

interface PriorityStepProps {
  formData: SupportFormData;
  updateFormData: (data: Partial<SupportFormData>) => void;
}

const PriorityStep: React.FC<PriorityStepProps> = ({ formData, updateFormData }) => {
  const priorities = [
    { 
      id: 'urgent', 
      label: '🔴 Preciso de ajuda para continuar com o que estou fazendo agora', 
      sublabel: '(algo está bloqueando ou impedindo a tarefa atual)',
      icon: Flame, 
      color: 'from-red-500 to-red-600' 
    },
    { 
      id: 'high', 
      label: '🟠 Consigo continuar, mas com algum esforço ou adaptação', 
      sublabel: '(estou driblando a situação, mas atrasa ou dificulta)',
      icon: Zap, 
      color: 'from-orange-500 to-orange-600' 
    },
    { 
      id: 'medium', 
      label: '🟡 Gostaria de entender melhor ou tornar algo mais prático', 
      sublabel: '(não é urgente, mas ajudaria bastante no uso do dia a dia)',
      icon: AlertCircle, 
      color: 'from-yellow-500 to-yellow-600' 
    },
    { 
      id: 'low', 
      label: '🟢 Tenho uma ideia ou sugestão para melhorar a plataforma', 
      sublabel: '(ponto de melhoria futura, sem impacto imediato)',
      icon: Clock, 
      color: 'from-green-500 to-green-600' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Como essa solicitação está impactando sua experiência?
        </h2>
        <p className="text-white/70 text-sm">
          (Isso nos ajuda a organizar melhor os atendimentos) *
        </p>
        <p className="text-white/60 text-sm mt-2">
          Nível de prioridade entre essa solicitação em comparação as suas outras
        </p>
      </div>

      <div className="space-y-3">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const isSelected = formData.priority === priority.id;
          
          return (
            <button
              key={priority.id}
              onClick={() => updateFormData({ priority: priority.id as SupportFormData['priority'] })}
              className={`
                w-full p-4 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] text-left
                ${isSelected 
                  ? 'border-white/50 bg-white/20 shadow-lg' 
                  : 'border-white/20 bg-white/10 hover:bg-white/15'
                }
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${priority.color} flex-shrink-0 mt-1`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-white font-medium mb-1 leading-relaxed">
                    {priority.label}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {priority.sublabel}
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

export default PriorityStep;
