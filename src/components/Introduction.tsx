import React from 'react';
import { Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import { translations } from '../translations';

export function Introduction() {
  const { language } = useStore();
  const t = translations.intro;

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.title[language]}</h2>
            <p className="text-gray-600 mb-6">{t.description[language]}</p>
            
            <h3 className="font-semibold text-gray-800 mb-3">{t.whatToExpect[language]}</h3>
            <ul className="space-y-2 mb-6">
              {t.points[language].map((point, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-800 text-sm">{t.note[language]}</p>
            </div>

            <p className="text-sm text-gray-500">{t.time[language]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}