import type { FlashCard } from "../../types";

export const berakningar: FlashCard[] = [
  {
    id: "berakningar-1",
    question:
      "Hur ser formeln ut för att räkna med tid, fart och distans?",
    questionQuiz:
      "Vilket samband gäller mellan distans, fart och tid vid navigationsberäkningar?",
    answer:
      "Distans = fart × tid.",
    options: [
      "Distans = fart × tid.",
      "Fart = tid × distans.",
      "Tid = fart × distans.",
      "Distans = fart ÷ tid.",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "berakningar-2",
    question:
      "Du färdas i 5 knop i 2 timmar. Hur lång distans har du färdats?",
    questionQuiz:
      "Hur långt kommer du på 2 timmar om du håller 5 knop?",
    answer: "10 M (18520 meter)",
    options: [
      "7 M.",
      "10 M.",
      "12 M.",
      "5 M.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "berakningar-3",
    question:
      "Du ska färdas 24 M i farten 6 knop. Hur lång tid kommer färden att ta?",
    questionQuiz:
      "Hur lång tid tar det att köra 24 nautiska mil i 6 knop?",
    answer: "4 timmar.",
    options: [
      "3 timmar.",
      "4 timmar.",
      "5 timmar.",
      "6 timmar.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "berakningar-4",
    question:
      "Du ska färdas 20 M och behöver vara framme senast om 3 timmar. Vilken fart måste du minst hålla?",
    questionQuiz:
      "Vilken minsta fart krävs för att färdas 20 nautiska mil på 3 timmar?",
    answer: "Cirka 7 knop.",
    options: [
      "Cirka 5 knop.",
      "Cirka 6 knop.",
      "Cirka 7 knop.",
      "Cirka 8 knop.",
    ],
    correctOptionIndex: 2,
  },
];
