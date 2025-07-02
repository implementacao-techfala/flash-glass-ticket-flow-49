
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import { SupportFormData } from '@/types/form';
import ProgressBar from './ProgressBar';
import TypeStep from './steps/TypeStep';
import DetailsStep from './steps/DetailsStep';
import FilesStep from './steps/FilesStep';
import PriorityStep from './steps/PriorityStep';
import ReviewStep from './steps/ReviewStep';

const SupportForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupportFormData>({
    type: '',
    problems: [],
    priority: '',
    email: '',
    phone: '',
    name: '',
  });

  const { loadSavedData, clearSavedData } = useAutoSave(formData);

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData) {
      // Garantir compatibilidade com dados antigos
      const migratedData = {
        ...savedData,
        problems: savedData.problems || [],
        phone: savedData.phone || '',
        email: savedData.email || ''
      };
      setFormData(migratedData);
      toast({
        title: "Dados recuperados",
        description: "Seus dados foram restaurados automaticamente.",
      });
    }
  }, []);

  const updateFormData = (data: Partial<SupportFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.type !== '';
      case 2: return formData.name !== '';
      case 3: return formData.problems.some(p => p.text.trim() !== '');
      case 4: return formData.priority !== '';
      case 5: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const submitForm = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      formDataToSend.append('type', formData.type);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('priority', formData.priority);
      
      if (formData.email) {
        formDataToSend.append('email', formData.email);
      }
      
      if (formData.phone) {
        formDataToSend.append('phone', formData.phone);
      }
      
      // Add problems data
      formDataToSend.append('problems', JSON.stringify(formData.problems.map(p => ({
        text: p.text,
        imageCount: p.images.length,
        audioCount: p.audios.length
      }))));
      
      // Add problem images and audios
      let fileIndex = 0;
      formData.problems.forEach((problem, problemIndex) => {
        problem.images.forEach((image) => {
          formDataToSend.append(`problem_${problemIndex}_image_${fileIndex}`, image);
          fileIndex++;
        });
        
        problem.audios.forEach((audioItem, audioIndex) => {
          formDataToSend.append(`problem_${problemIndex}_audio_${audioIndex}`, audioItem.file);
          if (audioItem.transcription) {
            formDataToSend.append(`problem_${problemIndex}_audio_${audioIndex}_transcription`, audioItem.transcription);
          }
        });
      });

      const response = await fetch('https://integradorwebhook.sanjaworks.com/webhook/formulario-de-tickets-suporte', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Seu ticket foi enviado com sucesso. Entraremos em contato em breve.",
        });
        clearSavedData();
        // Reset form
        setFormData({
          type: '',
          problems: [],
          priority: '',
          email: '',
          phone: '',
          name: '',
        });
        setCurrentStep(1);
      } else {
        throw new Error('Falha ao enviar');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar seu ticket. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TypeStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <DetailsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FilesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PriorityStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <ReviewStep formData={formData} onEdit={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        
        <div className="mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="flex items-center space-x-2">
            <Save className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Auto-salvamento ativo</span>
          </div>

          {currentStep < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={submitForm}
              disabled={!canProceed() || isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
