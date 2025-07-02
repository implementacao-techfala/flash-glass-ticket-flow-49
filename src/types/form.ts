
export interface SupportFormData {
  type: 'help' | 'error' | 'suggestion' | '';
  title: string;
  description: string;
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
