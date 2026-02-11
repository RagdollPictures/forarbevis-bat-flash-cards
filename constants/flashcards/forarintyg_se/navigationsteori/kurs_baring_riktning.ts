import type { FlashCard } from "../../types";

export const kursBaringRiktning: FlashCard[] = [
  {
    id: "kurs_baring_riktning-1",
    question: "Mellan vad mäts kursen?",
    questionQuiz:
      "Vad utgör referenserna när man mäter en kurs?",
    answer: "Mellan norr och båtens långskeppslinje.",
    options: [
      "Mellan fören och aktern.",
      "Mellan norr och båtens långskeppslinje.",
      "Mellan vinden och båtens sida.",
      "Mellan kompass och GPS.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "kurs_baring_riktning-2",
    question: "Mellan vad mäts en bäring?",
    questionQuiz:
      "Hur definieras en bäring i navigation?",
    answer: 'Mellan norr och dit bäringen "pekar".',
    options: [
      "Mellan båtens fören och objektet.",
      "Mellan norr och det observerade objektet.",
      "Mellan aktern och objektet.",
      "Mellan vinden och kursen.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "kurs_baring_riktning-3",
    question: "Mellan vad mäts en riktning?",
    questionQuiz:
      "Hur mäts en riktning relativt den egna båten?",
    answer:
      'Mellan båtens långskeppslinje och dit riktningen "pekar".',
    options: [
      "Mellan norr och objektet.",
      "Mellan två prickar.",
      "Mellan båtens långskeppslinje och objektet.",
      "Mellan vinden och fören.",
    ],
    correctOptionIndex: 2,
  },
];
