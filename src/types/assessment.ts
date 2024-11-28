export interface Question {
  id: string;
  question: string;
  questionEn: string;
  type: 'multiple' | 'single' | 'scale';
  options?: {
    id: string;
    label: string;
    labelEn: string;
    selected?: boolean;
  }[];
}

export interface Assessment {
  currentStep: number;
  answers: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high' | null;
}

export interface DailyLog {
  date: string;
  dryness: number;
  discomfort: number;
  notes: string;
}