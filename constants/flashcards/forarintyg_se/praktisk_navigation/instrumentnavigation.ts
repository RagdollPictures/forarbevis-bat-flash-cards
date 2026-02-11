import type { FlashCard } from "../../types";

export const instrumentnavigation: FlashCard[] = [
  {
    id: "instrumentnavigation-1",
    question:
      "Du pejlar två bäringar till två olika fyrar. Efter att ha rättat dem kan du då lägga ut din position på sjökortet?",
    questionQuiz:
      "Om du tar två rättade bäringar till kända objekt – kan du då bestämma din position i sjökortet?",
    answer: "Ja.",
    options: [
      "Nej, det krävs tre bäringar.",
      "Ja.",
      "Endast om du även mäter distans.",
      "Endast med GPS.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "instrumentnavigation-2",
    question:
      "Vad är problemet med att styra på en kompasskurs då avdriften är stor?",
    questionQuiz:
      "Varför räcker det inte att bara hålla exakt kompasskurs vid kraftig sidvind?",
    answer:
      "Avdriften gör att båten driver i sidled och färdvägen förskjuts.",
    options: [
      "Kompasskursen förändras automatiskt.",
      "Båten tappar fart.",
      "Avdriften gör att båten driver i sidled trots korrekt kurs.",
      "Magnetkompassen slutar fungera.",
    ],
    correctOptionIndex: 2,
  },
];
