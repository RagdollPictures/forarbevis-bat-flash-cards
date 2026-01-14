export type FlashCard = {
  id: string;
  question: string;
  answer: string;
};

export const cards: FlashCard[] = [
  {
    id: "1",
    question: "Vad är ett sjökort?",
    answer: "En karta som visar vattenområden, djup, hinder och sjömärken.",
  },
  {
    id: "2",
    question: "Vad betyder ett rött sjömärke?",
    answer: "Att märket ska passeras på babord sida.",
  },
  {
    id: "3",
    question: "Vad är babord?",
    answer: "Vänster sida av båten sett i färdriktningen.",
  },
];
