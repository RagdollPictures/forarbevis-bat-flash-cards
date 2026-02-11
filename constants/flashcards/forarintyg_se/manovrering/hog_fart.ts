import type { FlashCard } from "../../types";

export const manovreringHogFart: FlashCard[] = [
  {
    id: "manovrering_hog_fart-1",
    question:
      "Din båt börjar wobbla vid en viss fart och viss sidvind. Hur häver du wobblandet?",
    questionQuiz:
      "Om båten börjar slingra sig i hög fart vid sidvind – vad är rätt åtgärd?",
    answer: "Minskar farten.",
    options: [
      "Ökar farten för att stabilisera båten.",
      "Svänger kraftigt mot vinden.",
      "Minskar farten.",
      "Flyttar besättningen till fören.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "manovrering_hog_fart-2",
    question:
      "Varför ska man använda dödmansgrepp?",
    questionQuiz:
      "Vad är syftet med att använda dödmansgrepp vid körning i hög fart?",
    answer:
      "Så att motorn stannar om föraren lämnar styrplatsen.",
    options: [
      "För att minska bränsleförbrukningen.",
      "För att förbättra styrförmågan i svängar.",
      "För att motorn automatiskt ska stanna om föraren faller överbord eller lämnar platsen.",
      "För att undvika överhettning av motorn.",
    ],
    correctOptionIndex: 2,
  },
];
