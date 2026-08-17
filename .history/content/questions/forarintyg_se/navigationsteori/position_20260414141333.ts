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
    textTitle: "Vad anges först i en position – latitud eller longitud?",
    textInfo: "En position består av både latitud och longitud och beskriver exakt var något finns på jorden. När man skriver en position anges alltid latituden först och longituden därefter.",
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
      textTitle: "Vad kan en longitud vara – nordlig eller väst?",
    textInfo: "En longitud anger läget i öst–västlig riktning och kan därför vara östlig (E) eller västlig (W). Den kan alltså inte vara nordlig eller sydlig, eftersom det är latituden som beskriver nord–syd.",
  },
];
