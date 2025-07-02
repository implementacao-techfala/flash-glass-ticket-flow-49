
import React, { useRef } from 'react';
import { Plus, X, Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProblemItem } from '@/types/form';
import AudioRecorder from './AudioRecorder';

interface ProblemManagerProps {
  problems: ProblemItem[];
  onProblemsChange: (problems: ProblemItem[]) => void;
}

const ProblemManager: React.FC<ProblemManagerProps> = ({ problems, onProblemsChange }) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const addProblem = () => {
    const newProblem: ProblemItem = {
      id: Date.now().toString(),
      text: '',
      images: []
    };
    onProblemsChange([...problems, newProblem]);
  };

  const removeProblem = (id: string) => {
    onProblemsChange(problems.filter(p => p.id !== id));
  };

  const updateProblemText = (id: string, text: string) => {
    onProblemsChange(problems.map(p => 
      p.id === id ? { ...p, text } : p
    ));
  };

  const addImagesToProblem = (id: string, newImages: File[]) => {
    onProblemsChange(problems.map(p => 
      p.id === id ? { ...p, images: [...p.images, ...newImages] } : p
    ));
  };

  const removeImageFromProblem = (problemId: string, imageIndex: number) => {
    onProblemsChange(problems.map(p => 
      p.id === problemId ? { 
        ...p, 
        images: p.images.filter((_, i) => i !== imageIndex) 
      } : p
    ));
  };

  const addAudioToProblem = (id: string, audioFile: File) => {
    onProblemsChange(problems.map(p => 
      p.id === id ? { ...p, audio: audioFile } : p
    ));
  };

  const removeAudioFromProblem = (id: string) => {
    onProblemsChange(problems.map(p => 
      p.id === id ? { ...p, audio: undefined } : p
    ));
  };

  const handleFileSelect = (problemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );
    if (files.length > 0) {
      addImagesToProblem(problemId, files);
    }
  };

  const handlePaste = (problemId: string, event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    const imageFiles: File[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }

    if (imageFiles.length > 0) {
      addImagesToProblem(problemId, imageFiles);
      event.preventDefault();
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
      {problems.map((problem, index) => (
        <div key={problem.id} className="p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Problema #{index + 1}</h4>
            {problems.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProblem(problem.id)}
                className="text-white/60 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Texto do problema */}
            <div>
              <Textarea
                value={problem.text}
                onChange={(e) => updateProblemText(problem.id, e.target.value)}
                onPaste={(e) => handlePaste(problem.id, e)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md min-h-[100px]"
                placeholder="Descreva o problema... (Cole imagens com Ctrl+V)"
              />
            </div>

            {/* Botão para adicionar imagens */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRefs.current[problem.id]?.click()}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Image className="w-4 h-4 mr-2" />
                Adicionar Imagens
              </Button>
              
              <input
                ref={(el) => fileInputRefs.current[problem.id] = el}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(problem.id, e)}
              />
            </div>

            {/* Imagens do problema */}
            {problem.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {problem.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Problema ${index + 1} - Imagem ${imageIndex + 1}`}
                      className="w-full h-24 object-cover rounded border border-white/20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImageFromProblem(problem.id, imageIndex)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-600 text-white p-1 h-auto w-auto"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                      {formatFileSize(image.size)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gravador de áudio */}
            <div>
              <p className="text-white/70 text-sm mb-2">Áudio explicativo (opcional):</p>
              <AudioRecorder
                onAudioRecorded={(audioFile) => addAudioToProblem(problem.id, audioFile)}
                existingAudio={problem.audio}
                onDeleteAudio={() => removeAudioFromProblem(problem.id)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={addProblem}
        variant="outline"
        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Outro Problema
      </Button>
    </div>
  );
};

export default ProblemManager;
