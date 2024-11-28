import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../translations';
import type { Language } from '../types/language';

function FlagIcon({ language }: { language: Language }) {
  // Using consistent 3:2 aspect ratio for both flags (60:40)
  return (
    <span className="inline-block w-6 h-4 rounded-[1px] overflow-hidden mr-2 border border-gray-100 shadow-sm">
      {language === 'sv' ? (
        <svg viewBox="0 0 60 40" className="w-full h-full">
          <rect width="60" height="40" fill="#006AA7"/>
          <rect x="18" width="8" height="40" fill="#FECC00"/>
          <rect y="16" width="60" height="8" fill="#FECC00"/>
        </svg>
      ) : (
        <svg viewBox="0 0 60 40" className="w-full h-full">
          <clipPath id="t">
            <path d="M30,20 h30 v20 z v-20 h-30 z h-30 v20 z v-20 h30 z"/>
          </clipPath>
          <path d="M0,0 v40 h60 v-40 z" fill="#012169"/>
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
          <path d="M0,0 L60,40 M60,0 L0,40" clipPath="url(#t)" stroke="#C8102E" strokeWidth="5"/>
          <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13"/>
          <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8"/>
        </svg>
      )}
    </span>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useStore();

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {translations.title[language]}
      </h1>
      <button
        onClick={toggleLanguage}
        className="flex items-center px-3 py-1.5 rounded-md bg-white border shadow-sm hover:bg-gray-50 transition-colors"
        aria-label={`Switch to ${language === 'sv' ? 'English' : 'Swedish'}`}
      >
        <FlagIcon language={language === 'sv' ? 'en' : 'sv'} />
        <span className="text-sm font-medium text-gray-700">
          {language === 'sv' ? 'EN' : 'SV'}
        </span>
      </button>
    </div>
  );
}