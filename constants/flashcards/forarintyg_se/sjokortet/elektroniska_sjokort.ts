import type { FlashCard } from "../../types";

export const elektroniskaSjokort: FlashCard[] = [
  {
    id: "elektroniska_sjokort-1",
    question: "Vilka två typer av elektroniska sjökort finns det?",
    questionQuiz:
      "Vilka två huvudtyper av elektroniska sjökort används i navigatorer?",
    answer: "Vektorsjökort och rastersjökort.",
    options: [
      "Satellitkort och papperskort.",
      "Vektorsjökort och rastersjökort.",
      "Digitala och analoga sjökort.",
      "Radar- och plotterkort.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "elektroniska_sjokort-2",
    question:
      "Vad är de största riskerna med att ha fel zoomläge på navigatorn?",
    questionQuiz:
      "Vad kan hända om du använder fel zoomnivå på ett elektroniskt sjökort?",
    answer:
      "Ingen överblick vid för mycket zoom. Detaljer saknas vid för lite zoom.",
    options: [
      "Positionen visas fel.",
      "Båten tappar satellitsignal.",
      "Ingen överblick vid för mycket zoom och detaljer saknas vid för lite zoom.",
      "Kompasskursen påverkas.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "elektroniska_sjokort-3",
    question: "Nämn några nackdelar med en navigator.",
    questionQuiz:
      "Vilken är en nackdel med att navigera enbart med elektroniskt sjökort?",
    answer:
      "Kräver el. Sjökortet kan bli svårläst. Kan inte rättas utan måste bytas eller uppgraderas. Kan ha för många funktioner. Sjökortsinformation och sjökortsfakta kan vara svåra att se.",
    options: [
      "Den fungerar utan el.",
      "Den kräver el och kan vara svårläst eller ha för många funktioner.",
      "Den visar aldrig fel position.",
      "Den behöver inte uppdateras.",
    ],
    correctOptionIndex: 1,
  },
];
