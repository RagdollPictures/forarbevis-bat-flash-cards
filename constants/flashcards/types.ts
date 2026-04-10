export type FlashCard = {
  id: string;
  question?: string;
  questionQuiz?: string;
  answer?: string;
  options?: string[];
  correctOptionIndex?: number;
  imageKey?: string;
  answerImageKey?: string;
  textTitle?: string;
  textInfo?: string;
};

export type Source = {
  id: string;
  title: string;
};

export type Chapter = {
  id: string;
  title: string;
  deckId?: string;
  quizId?: string;
  type?: "deck" | "quiz" | "chapter";
  children?: Chapter[];
};

