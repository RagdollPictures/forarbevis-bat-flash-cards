export type QuizItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type MenuLevel = {
  chapterId: string;
  label: string;
  iconName: string;
  layout: any;
  Svg: any;
};

export type BonusLevelItem = {
  id: string;
  title: string;
  unlockWhenClearedQuizId: string;
};

export type ReadPlacedNode = {
  id: string;
  type: "read";
  deckId: string;
  title: string;
  quizId: string;
  x: number;
  y: number;
};

export type QuizPlacedNode = {
  id: string;
  type: "quiz";
  quizId: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
};

export type PlacedNode = ReadPlacedNode | QuizPlacedNode;