import type { FlashCard } from "../../types";

export const planering: FlashCard[] = [
  {
    id: "planering-1",
    question:
      "Räkna upp minst tre saker som ingår i färdplaneringen.",
    questionQuiz:
      "Vilka av följande ingår normalt i en genomtänkt färdplanering?",
    answer:
      "Bränsle, reservhamn, hamninformation, väderprognos, utrustning, navigationshjälpmedel och kunskap.",
    options: [
      "Endast bränsle och mat.",
      "Bränsle, reservhamn och väderprognos.",
      "Endast navigator och kompass.",
      "Bara hamninformation.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "planering-2",
    question:
      "När man gör sin ruttplanering, vad bör man då göra för att dokumentera den planerade rutten?",
    questionQuiz:
      "Hur bör du dokumentera en planerad rutt inför avfärd?",
    answer:
      "Rita in den på papperssjökort eller lägga in rutten i navigatorn.",
    options: [
      "Memorera den.",
      "Skriva den på ett löst papper utan karta.",
      "Rita in den i sjökortet eller lägga in den i navigatorn.",
      "Låta besättningen komma ihåg den.",
    ],
    correctOptionIndex: 2,
  },
];
