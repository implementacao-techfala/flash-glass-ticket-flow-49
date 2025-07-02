
import { useEffect, useRef } from 'react';
import { SupportFormData } from '@/types/form';

export const useAutoSave = (formData: SupportFormData, isEnabled: boolean = true) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<string>('');

  useEffect(() => {
    if (!isEnabled) return;

    const currentData = JSON.stringify(formData);
    
    if (currentData !== lastSaveRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem('support-form-data', currentData);
          lastSaveRef.current = currentData;
          console.log('Form auto-saved');
        } catch (error) {
          console.error('Failed to auto-save form:', error);
        }
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, isEnabled]);

  const loadSavedData = (): SupportFormData | null => {
    try {
      const saved = localStorage.getItem('support-form-data');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load saved data:', error);
      return null;
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem('support-form-data');
      lastSaveRef.current = '';
    } catch (error) {
      console.error('Failed to clear saved data:', error);
    }
  };

  return { loadSavedData, clearSavedData };
};
