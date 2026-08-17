import type { FlashCard } from "../../types";

export const manovreringBatUtanRoder: FlashCard[] = [
  {
    id: "manovrering_bat_utan_roder-1",
    question:
      "Vilken sida är enklast att förtöja med till kaj med en båt utan roder och en vänstergängad propeller via backmanövrar?",
    questionQuiz:
      "Vilken sida är mest fördelaktig att lägga till mot kaj vid backning med en båt utan roder och vänstergående propeller?",
    answer:
      "Styrbord (höger).",
    options: [
      "Babord (vänster).",
      "Det spelar ingen roll.",
      "Styrbord (höger).",
      "Rakt akterifrån mot kajen.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "manovrering_bat_utan_roder-2",
    question:
      "Hur bra går det att styra då propellern inte snurrar?",
    questionQuiz:
      "Hur effektiv är styrförmågan när propellern står still?",
    answer:
      "Nästan inte alls.",
    options: [
      "Mycket bra – rodret räcker.",
      "Full kontroll i alla farter.",
      "Nästan inte alls.",
      "Bara vid hög fart framåt.",
    ],
    correctOptionIndex: 2,
  },
];
