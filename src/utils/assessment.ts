import { Assessment } from '../types/assessment';

export function calculateRiskLevel(answers: Record<string, any>): 'low' | 'medium' | 'high' {
  let riskScore = 0;

  // Primary symptoms
  if (answers.dryEyesSymptoms === 'always') riskScore += 3;
  if (answers.dryEyesSymptoms === 'often') riskScore += 2;
  if (answers.dryEyesSymptoms === 'sometimes') riskScore += 1;

  // Irritation symptoms
  if (answers.irritationSymptoms === 'always') riskScore += 3;
  if (answers.irritationSymptoms === 'often') riskScore += 2;

  // Duration
  if (answers.duration === 'moreThanYear') riskScore += 3;
  if (answers.duration === 'sixToTwelve') riskScore += 2;
  if (answers.duration === 'oneToSix') riskScore += 1;

  // Screen time
  if (answers.screenTime === 'moreThanSeven') riskScore += 3;
  if (answers.screenTime === 'fiveToSeven') riskScore += 2;
  if (answers.screenTime === 'twoToFour') riskScore += 1;

  // Contact lenses
  if (answers.contactLenses === 'daily') riskScore += 2;
  if (answers.contactLenses === 'sometimes') riskScore += 1;

  // Environmental factors
  if (answers.environmentalFactors === 'often') riskScore += 2;
  if (answers.environmentalFactors === 'sometimes') riskScore += 1;

  // Medical history
  if (answers.medicalHistory === 'autoimmune') riskScore += 3;
  if (answers.medicalHistory === 'surgery') riskScore += 2;

  // Other dryness (systemic symptoms)
  if (answers.otherDryness === 'always' || answers.otherDryness === 'often') riskScore += 2;

  if (riskScore >= 10) return 'high';
  if (riskScore >= 6) return 'medium';
  return 'low';
}

export function shouldRecommendDoctor(assessment: Assessment): boolean {
  const { answers } = assessment;
  
  if (assessment.riskLevel === 'high') return true;
  if (answers.dryEyesSymptoms === 'always') return true;
  if (answers.irritationSymptoms === 'always') return true;
  if (answers.duration === 'moreThanYear') return true;
  if (answers.medicalHistory === 'autoimmune') return true;
  if (answers.contactLenses === 'daily' && answers.screenTime === 'moreThanSeven') return true;
  if (answers.environmentalFactors === 'often' && answers.dryEyesSymptoms === 'often') return true;
  
  return false;
}