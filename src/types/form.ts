
export interface ProblemItem {
  id: string;
  text: string;
  images: File[];
  audio?: File;
}

export interface SupportFormData {
  type: 'help' | 'error' | 'suggestion' | '';
  title: string;
  description: string;
  problems: ProblemItem[];
  files: File[];
  priority: 'low' | 'medium' | 'high' | 'urgent' | '';
  email: string;
  name: string;
}

export interface FormStep {
  id: number;
  title: string;
  isComplete: boolean;
}
