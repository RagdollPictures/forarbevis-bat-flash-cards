import type { FlashCard } from "../../types";

export const miljoToaletter: FlashCard[] = [
  {
    id: "miljo_toaletter-1",
    question:
      "Hur långt ifrån land ska man vara för att få tömma sin septiktank ut i havet?",
    questionQuiz:
      "Vilket minsta avstånd från land krävs för att lagligt få tömma septiktank i havet?",
    answer: "12 nautiska mil.",
    options: [
      "3 nautiska mil.",
      "6 nautiska mil.",
      "12 nautiska mil.",
      "Det är alltid förbjudet.",
    ],
    correctOptionIndex: 2,
    textTitle: "Tömning av septiktank till havs",
textInfo: "Toalettavfall från fritidsbåtar får endast släppas ut i havet om båten befinner sig minst 12 nautiska mil från land, alltså utanför Sveriges territorialvatten. Detta är för att skydda kustnära miljöer från föroreningar."
  },
  {
    id: "miljo_toaletter-2",
    question:
      "Får man tömma sin septiktank i en insjö?",
    questionQuiz:
      "Är det tillåtet att släppa ut toalettavfall från båt i en insjö?",
    answer: "Nej.",
    options: [
      "Ja, om sjön är större än 1 km².",
      "Ja, om man är långt från land.",
      "Nej.",
      "Ja, om det är biologiskt nedbrytbart.",
    ],
    correctOptionIndex: 2,
    textTitle: "Septiktank i insjö",
textInfo: "Det är aldrig tillåtet att tömma toalettavfall i insjöar. Alla utsläpp där är förbjudna eftersom vattnet är mer känsligt och inte byts ut lika snabbt som i havet."
  },
  {
    id: "miljo_toaletter-3",
    question:
      "Får en båtklubb ta ut en avgift för användande av toatömningsstationen?",
    questionQuiz:
      "Har en båtklubb rätt att ta betalt för användning av sin tömningsstation?",
    answer: "Ja.",
    options: [
      "Nej, det måste alltid vara gratis.",
      "Ja.",
      "Endast för icke-medlemmar.",
      "Endast om kommunen godkänner det.",
    ],
    correctOptionIndex: 1,
    textTitle: "Avgift för toatömning",
textInfo: "Båtklubbar och hamnar får ta ut en avgift för att använda toatömningsstationer. Detta infördes för att kunna täcka kostnader för drift, underhåll och miljösäker hantering av avfallet."
  },
];
