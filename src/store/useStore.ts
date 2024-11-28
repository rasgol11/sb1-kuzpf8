import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Assessment, DailyLog } from '../types/assessment';
import type { Language } from '../types/language';

interface Store {
  assessment: Assessment | null;
  language: Language;
  dailyLogs: DailyLog[];
  setAssessment: (assessment: Assessment) => void;
  setLanguage: (language: Language) => void;
  addDailyLog: (log: DailyLog) => void;
  resetAssessment: () => void;
  clearStore: () => void;
}

const initialState = {
  assessment: null,
  language: 'sv',
  dailyLogs: []
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      setAssessment: (assessment) => set({ assessment }),
      setLanguage: (language) => set({ language }),
      addDailyLog: (log) => set((state) => ({
        dailyLogs: [...state.dailyLogs, log]
      })),
      resetAssessment: () => set({ assessment: null }),
      clearStore: () => {
        localStorage.removeItem('dry-eyes-storage');
        set(initialState);
      }
    }),
    {
      name: 'dry-eyes-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        return initialState;
      }
    }
  )
);