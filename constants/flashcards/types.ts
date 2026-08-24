export type FlashCard = {
  id: string;

  question?: string;
  questionQuiz?: string;
  answer?: string;

  options?: string[];
  correctOptionIndex?: number;



  imageUrl?: string;
  answerImageUrl?: string;
  optionImageUrls?: (string | undefined)[];

  textTitle?: string;
  textInfo?: string;
};

export type Source = {
  id: string;
  title: string;
  titleShort?: string;
};

export type Chapter = {
  id: string;
  title: string;
  titleShort?: string;
  deckId?: string;
  quizId?: string;
  type?: "deck" | "quiz" | "chapter";
  children?: Chapter[];
};

