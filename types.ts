
export interface LSCTopicItem {
  id: string;
  title: string;
  shortDescription: string;
  icon?: React.ElementType; // For Heroicons or similar
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[]; // Array of 4 answer choices
  correctAnswer: string; // The text of the correct answer
  userAnswer?: string; // To store user's selected answer
}

export enum ViewState {
  TOPIC_LIST = 'TOPIC_LIST',
  TOPIC_DETAIL = 'TOPIC_DETAIL',
  QUIZ = 'QUIZ',
}
