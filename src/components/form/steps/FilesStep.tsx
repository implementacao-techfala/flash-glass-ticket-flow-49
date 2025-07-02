
import React, { useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupportFormData } from '@/types/form';

interface FilesStepProps {
  formData: SupportFormData;
  updateFormData: (data: Partial<SupportFormData>) => void;
}

const FilesStep: React.FC<FilesStepProps> = ({ formData, updateFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...formData.files, ...selectedFiles].slice(0, 10); // Max 10 files
    updateFormData({ files: newFiles });
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    updateFormData({ files: newFiles });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = formData.files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Anexar Arquivos
        </h2>
        <p className="text-white/70">
          Anexe screenshots, logs ou outros arquivos que possam ajudar (opcional)
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
        <p className="text-white/80 mb-2">
          Clique para selecionar arquivos ou arraste aqui
        </p>
        <p className="text-white/60 text-sm">
          Máximo 10 arquivos, até 100MB total
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip"
          onChange={handleFileSelect}
        />
      </div>

      {formData.files.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-white/90 font-medium">
              Arquivos Selecionados ({formData.files.length}/10)
            </h3>
            <span className="text-white/60 text-sm">
              Total: {formatFileSize(totalSize)}
            </span>
          </div>
          
          <div className="space-y-2">
            {formData.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-md"
              >
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white/90 text-sm font-medium">
                      {file.name}
                    </p>
                    <p className="text-white/60 text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-white/60 hover:text-white hover:bg-red-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesStep;
