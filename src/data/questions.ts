export const questions = [
  {
    id: 'dryEyesSymptoms',
    question: 'Upplever du att dina ögon ofta känns torra, irriterade eller ansträngda?',
    questionEn: 'Do you experience dry, irritated, or strained eyes?',
    type: 'single' as const,
    options: [
      { id: 'never', label: 'Aldrig', labelEn: 'Never', selected: false },
      { id: 'sometimes', label: 'Ibland', labelEn: 'Sometimes', selected: false },
      { id: 'often', label: 'Ofta', labelEn: 'Often', selected: false },
      { id: 'always', label: 'Alltid', labelEn: 'Always', selected: false }
    ]
  },
  {
    id: 'otherDryness',
    question: 'Upplever du torrhet i andra delar av kroppen, såsom näsa, mun, hals, bröst eller underliv?',
    questionEn: 'Do you experience dryness in other parts of your body, such as nose, mouth, throat, chest, or genitals?',
    type: 'single' as const,
    options: [
      { id: 'never', label: 'Aldrig', labelEn: 'Never', selected: false },
      { id: 'sometimes', label: 'Ibland', labelEn: 'Sometimes', selected: false },
      { id: 'often', label: 'Ofta', labelEn: 'Often', selected: false },
      { id: 'always', label: 'Alltid', labelEn: 'Always', selected: false },
      { id: 'unsure', label: 'Vet inte', labelEn: 'Not sure', selected: false }
    ]
  },
  {
    id: 'irritationSymptoms',
    question: 'Har du symtom som sveda, klåda eller känsla av att något ligger i ögat?',
    questionEn: 'Do you experience symptoms such as burning, itching, or feeling like there\'s something in your eye?',
    type: 'single' as const,
    options: [
      { id: 'never', label: 'Aldrig', labelEn: 'Never', selected: false },
      { id: 'sometimes', label: 'Ibland', labelEn: 'Sometimes', selected: false },
      { id: 'often', label: 'Ofta', labelEn: 'Often', selected: false },
      { id: 'always', label: 'Alltid', labelEn: 'Always', selected: false },
      { id: 'unsure', label: 'Vet inte', labelEn: 'Not sure', selected: false }
    ]
  },
  {
    id: 'duration',
    question: 'Hur länge har du haft dessa besvär?',
    questionEn: 'How long have you had these symptoms?',
    type: 'single' as const,
    options: [
      { id: 'moreThanYear', label: 'Mer än ett år', labelEn: 'More than a year', selected: false },
      { id: 'sixToTwelve', label: '6-12 månader', labelEn: '6-12 months', selected: false },
      { id: 'oneToSix', label: '1-6 månader', labelEn: '1-6 months', selected: false },
      { id: 'lessThanMonth', label: 'mindre än en månad', labelEn: 'Less than a month', selected: false },
      { id: 'unsure', label: 'vet inte', labelEn: 'Not sure', selected: false }
    ]
  },
  {
    id: 'screenTime',
    question: 'Hur många timmar om dagen använder du digitala skärmar?',
    questionEn: 'How many hours per day do you use digital screens?',
    type: 'single' as const,
    options: [
      { id: 'lessThanTwo', label: 'Mindre än 2 timmar', labelEn: 'Less than 2 hours', selected: false },
      { id: 'twoToFour', label: '2-4 timmar', labelEn: '2-4 hours', selected: false },
      { id: 'fiveToSeven', label: '5-7 timmar', labelEn: '5-7 hours', selected: false },
      { id: 'moreThanSeven', label: 'Mer än 7 timmar', labelEn: 'More than 7 hours', selected: false }
    ]
  },
  {
    id: 'contactLenses',
    question: 'Använder du kontaktlinser?',
    questionEn: 'Do you wear contact lenses?',
    type: 'single' as const,
    options: [
      { id: 'no', label: 'Nej', labelEn: 'No', selected: false },
      { id: 'sometimes', label: 'Ja, ibland', labelEn: 'Yes, sometimes', selected: false },
      { id: 'daily', label: 'Ja, dagligen', labelEn: 'Yes, daily', selected: false }
    ]
  },
  {
    id: 'environmentalFactors',
    question: 'Påverkas dina ögon av miljöfaktorer som torr luft eller vind?',
    questionEn: 'Are your eyes affected by environmental factors such as dry air or wind?',
    type: 'single' as const,
    options: [
      { id: 'no', label: 'Nej', labelEn: 'No', selected: false },
      { id: 'sometimes', label: 'Ibland', labelEn: 'Sometimes', selected: false },
      { id: 'often', label: 'Ja, ofta', labelEn: 'Yes, often', selected: false }
    ]
  },
  {
    id: 'eyeDrops',
    question: 'Använder du ögondroppar eller konstgjorda tårar?',
    questionEn: 'Do you use eye drops or artificial tears?',
    type: 'single' as const,
    options: [
      { id: 'no', label: 'Nej', labelEn: 'No', selected: false },
      { id: 'sometimes', label: 'Ja, ibland', labelEn: 'Yes, sometimes', selected: false },
      { id: 'daily', label: 'Ja, dagligen', labelEn: 'Yes, daily', selected: false }
    ]
  },
  {
    id: 'medicalHistory',
    question: 'Har du en medicinsk bakgrund som kan påverka ögonhälsan?',
    questionEn: 'Do you have any medical history that might affect your eye health?',
    type: 'single' as const,
    options: [
      { id: 'no', label: 'Nej', labelEn: 'No', selected: false },
      { id: 'autoimmune', label: 'Ja, autoimmun sjukdom', labelEn: 'Yes, autoimmune disease', selected: false },
      { id: 'surgery', label: 'Ja, tidigare ögonoperation', labelEn: 'Yes, previous eye surgery', selected: false }
    ]
  }
];