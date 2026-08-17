import type { FlashCard } from "../../types";

export const navigationsinstrumentLogg: FlashCard[] = [
  {
    id: "navigationsinstrument_logg-1",
    question:
      "Vilka två värden brukar en logg alltid minst kunna visa?",
    questionQuiz:
      "Vilka grundläggande uppgifter visar en logg normalt?",
    answer:
      "Fart och distans.",
    options: [
      "Djup och temperatur.",
      "Fart och distans.",
      "Kurs och bäring.",
      "Vindstyrka och riktning.",
    ],
    correctOptionIndex: 1,
    textTitle: "Loggens värden",
  textInfo: "En logg är ett navigationsinstrument som mäter hur långt en båt har färdats genom vattnet. Genom att kombinera distans med tid kan den även visa båtens fart. Därför visar en logg normalt både fart och distans."
  },
  {
    id: "navigationsinstrument_logg-2",
    question:
      "Om loggen slutar fungera, vad är det första man då ska kontrollera?",
    questionQuiz:
      "Vad bör du kontrollera först om loggen plötsligt slutar visa fart?",
    answer:
      "Om det har fastnat skräp, tång eller havstulpaner i skovelhjulet på givaren.",
    options: [
      "Om kompasskursen är korrekt.",
      "Om det sitter skräp eller beväxning i loggens givare.",
      "Om batteriet i navigatorn är urladdat.",
      "Om sjökortet är uppdaterat.",
    ],
    correctOptionIndex: 1,
     textTitle: "När loggen visar fel",
  textInfo: "Om loggen slutar fungera beror det ofta på att skovelhjulet i givaren har fastnat. Detta kan orsakas av skräp, tång eller havstulpaner som hindrar hjulet från att snurra. Då visas ofta farten som 0 knop trots att båten rör sig."

  },
  {
    id: "navigationsinstrument_logg-3",
    question:
      "Vilken fart visar loggen?",
    questionQuiz:
      "Visar loggen fart genom vattnet eller fart över grund?",
    answer:
      "Fart genom vattnet.",
    options: [
      "Fart över grund.",
      "Medelfart per dygn.",
      "Fart genom vattnet.",
      "Maxfart sedan start.",
    ],
    correctOptionIndex: 2,
    textTitle: "Fart genom vattnet",
  textInfo: "Loggen visar båtens fart genom vattnet, inte fart över grund. Det innebär att den inte tar hänsyn till ström eller avdrift, vilket kan göra att den faktiska hastigheten över botten är högre eller lägre än vad loggen visar."
  },
];
