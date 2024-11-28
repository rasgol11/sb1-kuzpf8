export type Language = 'sv' | 'en';

export interface Translation {
  title: Record<Language, string>;
  next: Record<Language, string>;
  previous: Record<Language, string>;
  finish: Record<Language, string>;
  questionProgress: Record<Language, string>;
  errorRequired: Record<Language, string>;
  recommendations: {
    title: Record<Language, string>;
    riskLevels: {
      low: Record<Language, string>;
      medium: Record<Language, string>;
      high: Record<Language, string>;
    };
    doctorRecommended: {
      title: Record<Language, string>;
      description: Record<Language, string>;
      reasons: Record<Language, string[]>;
      cta: Record<Language, string>;
    };
    whileWaiting: {
      title: Record<Language, string>;
      description: Record<Language, string>;
    };
    selfCare: {
      title: Record<Language, string>;
      description: Record<Language, string>;
      products: {
        title: Record<Language, string>;
        items: Record<Language, string[]>;
      };
      routines: {
        title: Record<Language, string>;
        items: Record<Language, string[]>;
      };
      cta: Record<Language, string>;
    };
  };
}