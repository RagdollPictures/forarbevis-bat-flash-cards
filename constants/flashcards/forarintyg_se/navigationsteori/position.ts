import type { FlashCard } from "../../types";

export const position: FlashCard[] = [
  {
    id: "position-1",
    question:
      "Vad anges först då man anger en position; longituden eller latituden?",
    questionQuiz:
      "När man skriver en geografisk position – vilken koordinat anges först?",
    answer: "Latituden.",
    options: [
      "Longituden.",
      "Latituden.",
      "Den som är störst.",
      "Valfri ordning.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "position-2",
    question: "Vilket kan en longitud vara; nordlig eller väst?",
    questionQuiz:
      "Vilken av dessa passar in på en longtud?",
    answer: "Västlig.",
    options: [
      "Nordlig.",
      "Sydlig.",
      "Västlig.",
      "Latitud.",
    ],
    correctOptionIndex: 2,
  },
];
