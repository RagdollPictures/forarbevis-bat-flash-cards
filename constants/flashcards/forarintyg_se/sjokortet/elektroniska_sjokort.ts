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
    textTitle: "Typer av elektroniska sjökort",
    textInfo: "Det finns två typer av elektroniska sjökort: vektorsjökort och rastersjökort. Vektorsjökort består av information i olika lager som kan anpassas, till exempel vilka detaljer som visas. Rastersjökort är istället som en bild av ett papperssjökort där all information ligger i ett lager och inte kan ändras."
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
    textTitle: "Zoom – risker",
    textInfo: "Det är viktigt att ha rätt zoomnivå på navigatorn. Om man zoomar in för mycket kan man tappa överblicken, vilket gör det svårt att planera sin färd. Om man zoomar ut för mycket kan viktiga detaljer, som grund och sjömärken, försvinna eller inte synas. Båda situationerna kan vara farliga."
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
    textTitle: "Nackdelar med navigator (elektroniska sjökort)",
    textInfo: "Elektroniska sjökort och navigatorer har flera nackdelar. De kräver el och fungerande utrustning, annars fungerar de inte alls. Sjökortet kan också bli svårläst, eftersom information ibland ligger ovanpå annan information eller för att det visas mycket data samtidigt. Dessutom kan sjökorten inte rättas manuellt, utan måste bytas ut eller uppdateras. Navigatorer kan också ha många funktioner, vilket gör dem svåra att lära sig använda fullt ut. Slutligen kan viktig information ibland vara svår att se eller till och med bortvald, särskilt i vektorsjökort där man kan styra vad som visas."
  },
];
