export type TestType = 'academic' | 'general';
export type SkillType = 'listening' | 'reading' | 'writing' | 'speaking';

export type QuestionType =
  | 'multiple_choice'
  | 'true_false_not_given'
  | 'yes_no_not_given'
  | 'fill_blank'
  | 'matching_headings'
  | 'matching_information'
  | 'short_answer';

export interface BaseQuestion {
  id: number; // Question number 1 - 40
  type: QuestionType;
  prompt: string;
  options?: string[]; // For multiple choice or matching
  correctAnswer: string | string[]; // Single string or array of accepted answers
  explanation: string;
  passageRef?: string; // Reference to paragraph or line
}

export interface ReadingPassage {
  id: number; // 1, 2, 3
  title: string;
  subtitle?: string;
  paragraphs: Array<{
    label?: string; // 'A', 'B', 'C', etc.
    text: string;
  }>;
  questions: BaseQuestion[];
}

export interface ListeningSection {
  id: number; // 1, 2, 3, 4
  title: string;
  scenario: string;
  speaker: string;
  transcript: string;
  audioAudioScript?: string;
  questions: BaseQuestion[];
}

export interface WritingTaskItem {
  taskNumber: 1 | 2;
  title: string;
  prompt: string;
  minWords: number;
  timeRecommendedMinutes: number;
  imageUrl?: string;
  chartDescription?: string;
  modelAnswerSnippet?: string;
}

export interface SpeakingPartItem {
  partNumber: 1 | 2 | 3;
  title: string;
  instructions: string;
  questions: string[];
  cueCard?: {
    topic: string;
    bulletPoints: string[];
    prepTimeSeconds: number;
    speakTimeSeconds: number;
  };
  sampleResponse?: string;
}

export interface MockTest {
  id: string;
  title: string;
  testType: TestType;
  description: string;
  listening: ListeningSection[];
  reading: ReadingPassage[];
  writing: WritingTaskItem[];
  speaking: SpeakingPartItem[];
}

export interface WritingEvaluation {
  overallBand: number;
  scores: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  };
  wordCount: number;
  penalties?: string[];
  examinerFeedback: string;
  strengths: string[];
  improvements: string[];
  vocabularySuggestions: Array<{
    original: string;
    suggestion: string;
    context: string;
  }>;
  grammarCorrections: Array<{
    error: string;
    correction: string;
    explanation: string;
  }>;
  modelExcerpt: string;
}

export interface SpeakingEvaluation {
  overallBand: number;
  scores: {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
  };
  examinerNotes: string;
  strengths: string[];
  improvements: string[];
  upgradedSample: string;
  idiomaticExpressions: Array<{
    phrase: string;
    meaning: string;
  }>;
}

export interface TestResultRecord {
  id: string;
  timestamp: number;
  testId: string;
  testTitle: string;
  testType: TestType;
  candidateName: string;
  candidateNumber: string;
  listeningScore?: {
    raw: number;
    band: number;
    total: number;
    userAnswers: Record<number, string>;
  };
  readingScore?: {
    raw: number;
    band: number;
    total: number;
    userAnswers: Record<number, string>;
  };
  writingResult?: {
    task1Response?: string;
    task2Response?: string;
    evaluation?: WritingEvaluation;
  };
  speakingResult?: {
    notes?: string;
    evaluation?: SpeakingEvaluation;
  };
  overallBand: number;
}
