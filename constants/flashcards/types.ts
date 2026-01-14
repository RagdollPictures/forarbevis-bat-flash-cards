export type FlashCard = {
  id: string;
  question: string;
  answer: string;
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
