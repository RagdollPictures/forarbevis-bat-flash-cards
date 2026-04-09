import type { FlashCard } from "../../types";

export const vaderVindOchVagor: FlashCard[] = [
  {
    id: "vader_vind_och_vagor-1",
    question:
      "Från vilken vindstyrka går man ut med en kulingvarning?",
    questionQuiz:
      "Vid ungefär vilken medelvind utfärdas kulingvarning?",
    answer: "14 m/s.",
    options: ["10 m/s.", "12 m/s.", "14 m/s.", "18 m/s."],
    correctOptionIndex: 2,
    textTitle: "Kulingvarning",
textInfo: "Kulingvarning utfärdas när det finns risk för medelvindar över 14 m/s."
  },
  {
    id: "vader_vind_och_vagor-2",
    question:
      "Hur många gånger kraftigare blir vinden då den ökar från 8 m/s till 13 m/s?",
    questionQuiz:
      "Ungefär hur mycket ökar vindkraften när vinden stiger från 8 m/s till 13 m/s?",
    answer:
      "Cirka 4 gånger (kraften är ca 5 vid 8 m/s och ca 20 vid 13 m/s).",
    options: [
      "Cirka dubbelt så stark.",
      "Cirka tre gånger så stark.",
      "Cirka fyra gånger så stark.",
      "Cirka tio gånger så stark.",
    ],
    correctOptionIndex: 2,
    textTitle: "Vindens kraft ökar snabbt",
textInfo: "När vinden ökar från 8 m/s till 13 m/s ökar kraften cirka 4 gånger eftersom vindens kraft ökar med kubiken."
  },
  {
    id: "vader_vind_och_vagor-3",
    question:
      "Din vind-app visar en vindstyrka på 15 knop. Vad innebär det i enheten m/s?",
    questionQuiz:
      "Hur många meter per sekund motsvarar ungefär 15 knop?",
    answer: "Cirka 7,5 m/s.",
    options: ["Cirka 5 m/s.", "Cirka 7,5 m/s.", "Cirka 10 m/s.", "Cirka 15 m/s."],
    correctOptionIndex: 1,
    textTitle: "Knop till m/s",
textInfo: "15 knop motsvarar cirka 7,5 m/s (dividera knop med 2)."
  },
  {
    id: "vader_vind_och_vagor-4",
    question:
      "Vilka är de vanligaste vindriktningarna i Sverige?",
    questionQuiz:
      "Från vilka väderstreck blåser det oftast i Sverige?",
    answer: "Sydväst och väst.",
    options: [
      "Nord och nordost.",
      "Syd och sydost.",
      "Sydväst och väst.",
      "Öst och nordost.",
    ],
    correctOptionIndex: 2,
    textTitle: "Vanligaste vindriktning i Sverige",
textInfo: "Den vanligaste vindriktningen i Sverige är sydvästlig till västlig vind."
  },
  {
    id: "vader_vind_och_vagor-5",
    question:
      "Vindprognosen visar vindstyrkan 5 (12). Vad betyder de två olika vindstyrkorna?",
    questionQuiz:
      "Hur ska prognosen 5 (12) m/s tolkas?",
    answer:
      "5 m/s i medelvind och 12 m/s i byarna.",
    options: [
      "5 m/s i byvind och 12 m/s i medelvind.",
      "5 m/s i medelvind och 12 m/s i byvind.",
      "Max 5 m/s hela tiden.",
      "12 m/s är medelvinden.",
    ],
    correctOptionIndex: 1,
    textTitle: "Medelvind och byvind",
textInfo: "Vindprognosen 5 (12) betyder 5 m/s i medelvind och 12 m/s i byvindar."
  },
  {
    id: "vader_vind_och_vagor-6",
    question:
      "Vart blåser vinden ifrån då den är sydlig?",
    questionQuiz:
      "Om vinden är sydlig – från vilket håll kommer den?",
    answer:
      "Vinden blåser ifrån söder och förflyttar sig mot norr.",
    options: [
      "Från norr mot söder.",
      "Från söder mot norr.",
      "Från öster mot väster.",
      "Från väster mot öster.",
    ],
    correctOptionIndex: 1,
    textTitle: "Sydlig vind",
textInfo: "En sydlig vind blåser från söder mot norr."
  },
  {
    id: "vader_vind_och_vagor-7",
    question:
      "Vart rinner havsströmmen ifrån då den är västlig?",
    questionQuiz:
      "Om en havsström är västlig – från vilket håll kommer den?",
    answer:
      "Havsströmmen rinner ifrån öster och förflyttar sig mot väster.",
    options: [
      "Från väster mot öster.",
      "Från öster mot väster.",
      "Från norr mot söder.",
      "Från söder mot norr.",
    ],
    correctOptionIndex: 1,
    textTitle: "Strömriktning",
textInfo: "En västlig havsström rinner från öster mot väster."
  },
  {
    id: "vader_vind_och_vagor-8",
    question:
      "Vilken riktning på vinden ger sjöbris upphov till?",
    questionQuiz:
      "Åt vilket håll blåser vinden vid sjöbris?",
    answer: "Vinden blåser mot land.",
    options: [
      "Från land ut mot havet.",
      "Mot land från havet.",
      "Rakt upp i atmosfären.",
      "Parallellt med kusten.",
    ],
    correctOptionIndex: 1,
    textTitle: "Sjöbris",
textInfo: "Sjöbris innebär att vinden blåser från havet in mot land."
  },
  {
    id: "vader_vind_och_vagor-9",
    question:
      "Hur mäts eller anges våghöjd?",
    questionQuiz:
      "Hur definieras våghöjd i prognoser?",
    answer:
      "Höjden från vågdal till vågtopp. Signifikant våghöjd är ett medelvärde som mäts enligt särskilda regler under en viss tid.",
    options: [
      "Från vattenytan till vågtopp.",
      "Från vågdal till vågtopp.",
      "Endast höjden på den högsta vågen.",
      "Genomsnittet av alla vågor utan regler.",
    ],
    correctOptionIndex: 1,
    textTitle: "Våghöjd",
textInfo: "Våghöjd mäts från vågdal till vågtopp och anges som signifikant våghöjd, vilket är ett medelvärde."
  },
];
