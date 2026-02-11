import type { FlashCard } from "../../types";

export const navigationsinstrumentEkolod: FlashCard[] = [
  {
    id: "navigationsinstrument_ekolod-1",
    question:
      "Din båt har ett djupgående på 1 meter och ekolodsgivaren är placerad där båten är som djupast. Det är 4 meter djupt i hamnen. Ditt ekolod är inte kalibrerat. Vilket djup visas på ekolodets display?",
    questionQuiz:
      "Om det är 4 meter djupt och din ekolodsgivare sitter 1 meter under vattenytan utan kalibrering – vilket djup visas?",
    answer: "3 meter.",
    options: [
      "4 meter.",
      "3 meter.",
      "1 meter.",
      "5 meter.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "navigationsinstrument_ekolod-2",
    question:
      "Ute till havs där vattnet är djupt börjar siffrorna på ditt ekolod att blinka. Vad är den troligaste orsaken till detta?",
    questionQuiz:
      "Om ekolodets siffror blinkar ute på djupt vatten – vad är den mest sannolika förklaringen?",
    answer:
      "Djupet är större än vad ekolodet kan mäta.",
    options: [
      "Batteriet är nästan slut.",
      "Ekolodet störs av fiskstim.",
      "Djupet överstiger ekolodets mätområde.",
      "Båten går för långsamt.",
    ],
    correctOptionIndex: 2,
  },
];
