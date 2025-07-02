import React from 'react';
import { Check, Edit, File, Clock, AlertCircle, Zap, Flame, HelpCircle, AlertTriangle, Lightbulb, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupportFormData } from '@/types/form';

interface ReviewStepProps {
  formData: SupportFormData;
  onEdit: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onEdit }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'help': return HelpCircle;
      case 'error': return AlertTriangle;
      case 'suggestion': return Lightbulb;
      default: return HelpCircle;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'help': return 'Preciso de Ajuda';
      case 'error': return 'Reportar Erro';
      case 'suggestion': return 'Sugestão';
      default: return '';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low': return Clock;
      case 'medium': return AlertCircle;
      case 'high': return Zap;
      case 'urgent': return Flame;
      default: return Clock;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Revisar Informações
        </h2>
        <p className="text-white/70">
          Confira todos os dados antes de enviar
        </p>
      </div>

      <div className="space-y-4">
        {/* Tipo */}
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {React.createElement(getTypeIcon(formData.type), { className: "w-5 h-5 text-blue-400" })}
              <div>
                <h3 className="text-white font-medium">Tipo</h3>
                <p className="text-white/70 text-sm">{getTypeLabel(formData.type)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-white/60 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Detalhes */}
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-medium mb-2">Informações Básicas</h3>
              <div className="space-y-2 text-sm">
                <p className="text-white/70"><span className="text-white/90">Nome:</span> {formData.name}</p>
                <p className="text-white/70"><span className="text-white/90">Título:</span> {formData.title}</p>
                {formData.description && (
                  <p className="text-white/70"><span className="text-white/90">Descrição:</span> {formData.description.substring(0, 100)}{formData.description.length > 100 ? '...' : ''}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-white/60 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Problemas */}
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-medium mb-3">Problemas Descritos</h3>
              <div className="space-y-3">
                {formData.problems.map((problem, index) => (
                  <div key={problem.id} className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white/90 font-medium text-sm">Problema #{index + 1}</span>
                      <div className="flex items-center space-x-1">
                        {problem.images.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Image className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">{problem.images.length}</span>
                          </div>
                        )}
                        {problem.audio && (
                          <Mic className="w-3 h-3 text-blue-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      {problem.text.substring(0, 150)}{problem.text.length > 150 ? '...' : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="text-white/60 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Arquivos Adicionais */}
        {formData.files.length > 0 && (
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-green-400" />
                <div>
                  <h3 className="text-white font-medium">Arquivos Adicionais</h3>
                  <p className="text-white/70 text-sm">
                    {formData.files.length} arquivo(s) - {formatFileSize(formData.files.reduce((sum, file) => sum + file.size, 0))}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(3)}
                className="text-white/60 hover:text-white"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Prioridade */}
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {React.createElement(getPriorityIcon(formData.priority), { className: "w-5 h-5 text-orange-400" })}
              <div>
                <h3 className="text-white font-medium">Prioridade</h3>
                <p className="text-white/70 text-sm">{getPriorityLabel(formData.priority)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              className="text-white/60 hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-md">
          <div className="text-center space-y-2">
            <h3 className="text-green-200 font-medium">✉️ Obrigado por preencher o formulário! ✅</h3>
            <p className="text-green-200/80 text-sm">
              Isso nos ajuda a garantir que TODAS as solicitações vão ser respondidas. 💪
            </p>
            <p className="text-green-200/80 text-sm">
              Normalmente, dúvidas simples são respondidas em alguns minutos até 1 dia útil. Casos mais complexos podem levar um pouco mais. 🤝
            </p>
            <p className="text-green-200/80 text-sm">
              Se precisar atualizar ou complementar, pode abrir uma nova solicitação.
            </p>
          </div>
        </div>

        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-400" />
            <p className="text-green-200 text-sm">
              Todas as informações estão corretas? Clique em "Enviar" para finalizar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
