
export interface ProblemItem {
  id: string;
  text: string;
  images: File[];
  audios: { file: File; transcription?: string }[];
}

export interface SupportFormData {
  type: 'help' | 'error' | 'suggestion' | '';
  problems: ProblemItem[];
  priority: 'low' | 'medium' | 'high' | 'urgent' | '';
  email: string;
  phone: string;
  name: string;
}

export interface FormStep {
  id: number;
  title: string;
  isComplete: boolean;
}
