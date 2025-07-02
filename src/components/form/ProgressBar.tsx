
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">
          Etapa {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-white/80">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
