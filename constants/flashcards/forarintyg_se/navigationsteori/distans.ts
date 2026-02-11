import type { FlashCard } from "../../types";

export const distans: FlashCard[] = [
  {
    id: "distans-1",
    question: "Hur många meter lång är en distansminut?",
    questionQuiz:
      "Hur lång är en nautisk mil uttryckt i meter?",
    answer: "1 852 meter.",
    options: [
      "1 000 meter.",
      "1 609 meter.",
      "1 852 meter.",
      "2 000 meter.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "distans-2",
    question:
      "Är en distansminut kopplad till latituden eller longituden?",
    questionQuiz:
      "En nautisk mil motsvarar en minut av vilken koordinat?",
    answer:
      "Latituden. En distansminut är detsamma som en latitudminut.",
    options: [
      "Longituden.",
      "Latituden.",
      "Både latitud och longitud.",
      "Ingen av dem.",
    ],
    correctOptionIndex: 1,
  },
];
