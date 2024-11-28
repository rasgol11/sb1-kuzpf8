import React, { useEffect } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { Recommendations } from './components/Recommendations';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useStore } from './store/useStore';

export default function App() {
  const { assessment, clearStore } = useStore();

  // Clear any stale state on initial load
  useEffect(() => {
    clearStore();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 animate-fadeIn">
        {!assessment ? <AssessmentForm /> : (
          <div className="max-w-2xl mx-auto">
            <Recommendations assessment={assessment} />
          </div>
        )}
      </main>
    </div>
  );
}