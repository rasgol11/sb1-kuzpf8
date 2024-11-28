import React from 'react';
import { ExternalLink, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { Assessment } from '../types/assessment';
import { shouldRecommendDoctor } from '../utils/assessment';
import { useStore } from '../store/useStore';
import { translations } from '../translations';

interface RecommendationsProps {
  assessment: Assessment;
}

export function Recommendations({ assessment }: RecommendationsProps) {
  const needsDoctor = shouldRecommendDoctor(assessment);
  const { language } = useStore();
  const t = translations.recommendations;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">{t.title[language]}</h2>
      
      {needsDoctor && (
        <div className="mb-8">
          <div className="flex items-start space-x-3 text-amber-700 bg-amber-50 p-4 rounded-lg">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">{t.doctorRecommended.title[language]}</h4>
              <p className="mt-1">
                {t.doctorRecommended.description[language]}
              </p>
              <ul className="mt-2 ml-4 list-disc">
                {t.doctorRecommended.reasons[language].map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <a
            href="#boka-tid"
            className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4"
          >
            {t.doctorRecommended.cta[language]}
            <ExternalLink className="w-4 h-4 inline-block ml-2" />
          </a>
        </div>
      )}

      <div className="space-y-6">
        {needsDoctor && (
          <div className="flex items-start space-x-3 text-blue-700 bg-blue-50 p-4 rounded-lg">
            <Clock className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">{t.whileWaiting.title[language]}</h4>
              <p className="mt-1">{t.whileWaiting.description[language]}</p>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-3 text-green-700 bg-green-50 p-4 rounded-lg">
          <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">{t.selfCare.title[language]}</h4>
            <p className="mt-1">{t.selfCare.description[language]}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">{t.selfCare.products.title[language]}</h4>
          <ul className="space-y-3">
            {t.selfCare.products.items[language].map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-blue-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">{t.selfCare.routines.title[language]}</h4>
          <ul className="space-y-2 text-blue-700">
            {t.selfCare.routines.items[language].map((routine, index) => (
              <li key={index}>• {routine}</li>
            ))}
          </ul>
        </div>

        <a
          href="#kop-produkter"
          className="block w-full text-center bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors mt-4"
        >
          {t.selfCare.cta[language]}
          <ExternalLink className="w-4 h-4 inline-block ml-2" />
        </a>
      </div>
    </div>
  );
}