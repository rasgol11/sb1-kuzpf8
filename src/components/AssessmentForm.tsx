import React, { useState } from 'react';
import { Eye, AlertCircle, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { questions } from '../data/questions';
import { translations } from '../translations';
import { calculateRiskLevel } from '../utils/assessment';
import type { Assessment } from '../types/assessment';

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const { setAssessment, language } = useStore();

  const handleOptionSelect = (questionId: string, optionId: string, multiple: boolean) => {
    setError(null);
    setAnswers(prev => {
      if (multiple) {
        const options = prev[questionId]?.map((option: any) => 
          option.id === optionId 
            ? { ...option, selected: !option.selected }
            : option
        ) || [];
        return { ...prev, [questionId]: options };
      } else {
        return { ...prev, [questionId]: optionId };
      }
    });
  };

  const isCurrentQuestionAnswered = () => {
    if (currentStep < 0) return true;
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];

    if (currentQuestion.type === 'multiple') {
      return answer?.some((option: any) => option.selected);
    }
    return !!answer;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCurrentQuestionAnswered()) {
      setError(translations.errorRequired[language]);
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setError(null);
      return;
    }

    const riskLevel = calculateRiskLevel(answers);
    const assessment: Assessment = {
      currentStep,
      answers,
      riskLevel
    };

    setAssessment(assessment);
  };

  if (currentStep === -1) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 space-y-6">
          <div className="flex items-start space-x-6">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {translations.intro.title[language]}
                </h2>
                <p className="text-gray-600 text-lg">
                  {translations.intro.description[language]}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {translations.intro.whatToExpect[language]}
                </h3>
                <ul className="space-y-3">
                  {translations.intro.points[language].map((point, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-blue-500 mr-3 text-lg">•</span>
                      <span className="text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-amber-800">{translations.intro.note[language]}</p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-500">{translations.intro.time[language]}</p>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {translations.intro.startButton[language]}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const questionText = language === 'sv' ? currentQuestion.question : currentQuestion.questionEn;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="card p-8 space-y-8">
        <div className="flex items-center space-x-4">
          <Eye className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {translations.title[language]}
          </h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-6">{questionText}</h3>
            <div className="space-y-4">
              {currentQuestion.options?.map(option => (
                <label key={option.id} className="option-card">
                  <input
                    type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
                    name={currentQuestion.id}
                    checked={
                      currentQuestion.type === 'multiple'
                        ? answers[currentQuestion.id]?.find((o: any) => o.id === option.id)?.selected || false
                        : answers[currentQuestion.id] === option.id
                    }
                    onChange={() => handleOptionSelect(currentQuestion.id, option.id, currentQuestion.type === 'multiple')}
                    className="input-radio"
                  />
                  <span className="text-gray-700 text-lg">
                    {language === 'sv' ? option.label : option.labelEn}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => {
                setCurrentStep(prev => prev - 1);
                setError(null);
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {translations.previous[language]}
            </button>
          )}
          <div className="text-sm text-gray-500 flex-1 text-center">
            {translations.questionProgress[language]
              .replace('{current}', String(currentStep + 1))
              .replace('{total}', String(questions.length))}
          </div>
          <button type="submit" className="btn-primary">
            {currentStep === questions.length - 1 
              ? translations.finish[language] 
              : translations.next[language]}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}