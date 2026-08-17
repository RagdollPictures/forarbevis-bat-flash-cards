import type { FlashCard } from "../../types";

export const lanternorSarskildaFartyg: FlashCard[] = [
  {
    id: "lanternor_sarskilda_fartyg-1",
    question:
      "Vilken färg har de tre toppljusen på en linfärja?",
    questionQuiz:
      "Vilken färg visar de tre topplanternorna på en linfärja?",
    answer: "Röda.",
    options: ["Vita.", "Gröna.", "Röda.", "Gula."],
    correctOptionIndex: 2,
     textTitle: "Linfärjans lanternor",
  textInfo: "En linfärja ska ha tre röda toppljus. Dessa ljus är placerade så att de bildar en lodrät triangel med spetsen uppåt, vilket gör att fartyget lätt kan identifieras."
  },
  {
    id: "lanternor_sarskilda_fartyg-2",
    question:
      "Hur ser den belysta signalflaggan ut som visar att en båt har dykare nere då det är mörkt?",
    questionQuiz:
      "Vilka färger har den upplysta signalflaggan som visar att dykare finns i vattnet under mörker?",
    answer: "Vit och blå.",
    options: [
      "Röd och vit.",
      "Gul och svart.",
      "Vit och blå.",
      "Grön och vit.",
    ],
    correctOptionIndex: 2,
     textTitle: "Dykflagga i mörker",
  textInfo: "När dykning pågår ska en särskild signal visas som är vit innerst och blå ytterst. Under mörker ska denna flagga vara belyst så att den syns tydligt från alla håll."
  },
  {
    id: "lanternor_sarskilda_fartyg-3",
    question:
      "Vilken extralanterna får ett utryckningsfartyg använda vid brådskande tjänsteutövning?",
    questionQuiz:
      "Vilket extra ljus får ett utryckningsfartyg använda vid akut insats?",
    answer:
      "Blått blixtljus (lika en polisbil eller ambulans).",
    options: [
      "Rött fast sken.",
      "Blått blixtljus (lika en polisbil eller ambulans).",
      "Gult roterande ljus.",
      "Vitt blinkande ljus.",
    ],
    correctOptionIndex: 1,
    textTitle: "Utryckningsfartyg",
  textInfo: "Utryckningsfartyg får vid brådskande tjänsteutövning använda ett runtomlysande blått blixtljus. Det signalerar att de är i tjänst, men ger inte automatiskt rätt till fri väg."
  },
];
