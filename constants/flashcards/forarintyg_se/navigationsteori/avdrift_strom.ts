import type { FlashCard } from "../../types";

export const avdriftStrom: FlashCard[] = [
  {
    id: "avdrift_strom-1",
    question: "Vad är det som orsakar avdrift?",
    questionQuiz:
      "Vad är den huvudsakliga orsaken till att en båt driver i sidled?",
    answer: "Vinden som trycker båten åt sidan.",
    options: [
      "Ström från motorn.",
      "Vinden som påverkar båtens sida.",
      "Kompassens missvisning.",
      "Propellerns rotation.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "avdrift_strom-2",
    question: "Åt vilket håll blir avdriften?",
    questionQuiz:
      "Åt vilket håll driver båten när vinden träffar från sidan?",
    answer:
      "Åt det håll som vinden blåser. Vind som blåser in från vänster sida på båten ger avdrift åt höger.",
    options: [
      "Mot vinden.",
      "Åt det håll vinden blåser.",
      "Alltid mot styrbord.",
      "Alltid mot babord.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "avdrift_strom-3",
    question:
      "Vad blir effekten på båten som färdas i strömmande vatten?",
    questionQuiz:
      "Hur påverkas en båt av vattenström under färd?",
    answer:
      "Vattnet flyttar på sig och därmed flyttar även båten på sig med vattnet.",
    options: [
      "Båten påverkas inte alls.",
      "Båten driver med strömmen.",
      "Båten stannar automatiskt.",
      "Endast farten genom vattnet påverkas.",
    ],
    correctOptionIndex: 1,
  },
];
