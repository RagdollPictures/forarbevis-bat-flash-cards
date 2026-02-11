import type { FlashCard } from "../../types";

export const navigatornavigation: FlashCard[] = [
  {
    id: "navigatornavigation-1",
    question: "Vad är en rutt?",
    questionQuiz:
      "Vad innebär det att skapa en rutt i en navigator?",
    answer:
      'Flera waypoints/girpunkter som tillsammans ger en väg från en position till en annan.',
    options: [
      "En enda waypoint.",
      "En inspelad logg över tidigare färd.",
      "Flera waypoints som bildar en planerad färdväg.",
      "En automatisk kurs utan girpunkter.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "navigatornavigation-2",
    question:
      "Din navigator visar KÖG 100°. Din magnetiska kompass visar K 115°. Varför skiljer det 15° mellan dem?",
    questionQuiz:
      "Varför kan det skilja mellan kompasskurs och kurs över grund?",
    answer:
      "Deviation, missvisning, avdrift och ström påverkar skillnaden.",
    options: [
      "Navigatorn visar alltid fel.",
      "Kompasskursen är alltid exakt.",
      "Deviation, missvisning, avdrift och ström påverkar skillnaden.",
      "Batteriet är svagt.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "navigatornavigation-3",
    question:
      "Du har lagt in en girpunkt. Navigatorn visar bäring 280° och KÖG är 250°. Åt vilket håll måste du gira?",
    questionQuiz:
      "Om bäringen till waypoint är större än din nuvarande KÖG – åt vilket håll ska du styra?",
    answer: "Åt styrbord.",
    options: [
      "Åt babord.",
      "Åt styrbord.",
      "Rakt fram.",
      "Vända 180°.",
    ],
    correctOptionIndex: 1,
  },
];
