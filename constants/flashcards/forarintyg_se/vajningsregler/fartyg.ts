import type { FlashCard } from "../../types";

export const vajningsreglerFartyg: FlashCard[] = [
  {
    id: "vajningsregler_fartyg-1",
    question:
      "En segelbåt möter en supertanker långt ute till havs. Vem ska väja?",
    questionQuiz:
      "Om en segelbåt och ett maskindrivet handelsfartyg möts på öppet hav – vem är väjningsskyldig?",
    answer:
      "Supertankern. Ett maskindrivet fartyg ska väja för ett segelfartyg när inga specialregler gäller.",
    options: [
      "Segelbåten.",
      "Handelsfartyget.",
      "Båda samtidigt.",
      "Den som är minst.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "vajningsregler_fartyg-2",
    question:
      'Vad gäller för fritidsbåtar (kortare än 20 meter) i en "trång farled"?',
    questionQuiz:
      "Hur ska fritidsbåtar under 20 meter uppträda i en trång farled?",
    answer:
      "Fritidsbåtarna väjer för alla större fartyg och får inte hindra fartyg som endast kan framföras säkert i farleden.",
    options: [
      "De har alltid företräde.",
      "De väjer endast för segelbåtar.",
      "De ska väja för större fartyg och inte hindra dem.",
      "Regler gäller inte fritidsbåtar.",
    ],
    correctOptionIndex: 2,
  },
];
