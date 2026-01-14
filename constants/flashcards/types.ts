export type FlashCard = {
  id: string;
  question: string;
  answer: string;
  imageKey?: string;
   answerImageKey?: string; 
};

export type Source = {
  id: string;
  title: string;
};

export type Chapter = {
  id: string;
  title: string;
  deckId: string;
};
