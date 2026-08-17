import type { FlashCard } from "../../types";

export const symboler: FlashCard[] = [
  {
    id: "symboler-1",
    question:
      "Vad heter publikationen där alla sjökortssymboler finns redovisade?",
    questionQuiz:
      "I vilken publikation hittar du förklaringar till alla sjökortssymboler?",
    answer: "Kort 1.",
    options: [
      "Sjökortsboken.",
      "Kort 1.",
      "Navigationsguiden.",
      "Sjöregler 2020.",
    ],
    correctOptionIndex: 1,
    textTitle: "Publikationen med alla sjökortssymboler",
    textInfo: "Publikationen där sjökortens symboler, beteckningar och förkortningar finns samlade heter Kort 1. Den följer en internationell standard som används på nästan alla moderna sjökort och gör att navigatörer lättare kan förstå sjökort i olika länder."
  },

  {
    id: "symboler-2",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz:
      "Vad anger denna djupmarkering i sjökortet?",
    answer: "Att vattendjupet är 9 meter och 7 decimeter.",
    imageKey: "symboler_02",
    options: [
      "9,0 meter.",
      "9 meter och 7 decimeter.",
      "97 meter.",
      "7 meter och 9 decimeter.",
    ],
    correctOptionIndex: 1,
    textTitle: "Djupsiffra 9⁷",
    textInfo: "Om djupet anges som 9⁷ på sjökortet betyder det 9 meter och 7 decimeter. På sjökort skrivs alltså delar av meter utan decimaltecken i själva djupsiffran. "

  },
  {
    id: "symboler-3",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad representerar denna brosymbol?",
    answer: "Fast bro med segelfri höjd i meter.",
    imageKey: "symboler_03",
    options: [
      "Öppningsbar bro.",
      "Fast bro med segelfri bredd i meter.",
      "Fast bro med segelfri höjd i meter.",
      "Sluss med 20 meters höjdskillnad",
    ],
    correctOptionIndex: 2,
    textTitle: "Fast bro",
    textInfo: "Symbolen för en fast bro visar att bron inte går att öppna. Då måste man alltid kontrollera den segelfria höjden innan man passerar."
  },
  {
    id: "symboler-4",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna brosymbol?",
    answer: "Öppningsbar bro.",
    imageKey: "symboler_04",
    options: [
      "Fast bro.",
      "Öppningsbar bro.",
      "Sluss.",
      "Vägport.",
    ],
    correctOptionIndex: 1,
    textTitle: "Öppningsbar bro",
    textInfo: "Symbolen för en öppningsbar bro visar att bron kan öppnas för att släppa igenom båttrafik. I sjökortet kan det ibland också finnas information om öppningens bredd eller höjd när bron är öppen."
  },
  {
    id: "symboler-5",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad markerar denna symbol i vattnet?",
    answer: "Bränning (grund, grynna).",
    imageKey: "symboler_05",
    options: [
      "Djupgrop.",
      "Grund.",
      "Sandbank.",
      "Ankringsplats.",
    ],
    correctOptionIndex: 1,
    textTitle: "Bränning",
    textInfo: "En bränning är ett grund som ligger precis i vattenytan. Den ritas som ett plustecken med fyra prickar runt om och kan vara svår att upptäcka med ögonen, särskilt vid högvatten. Bränning kallas också ofta för en grynna."
  },
  {
    id: "symboler-6",
    question: "Vad kallas dessa symboler på sjökortet?",
    questionQuiz: "Vad kallas linjer som visar samma djup?",
    answer: "Djupkurvor.",
    imageKey: "symboler_06",
    options: [
      "Farledslinjer.",
      "Djupkurvor.",
      "Bäringslinjer.",
      "Strömlinjer.",
    ],
    correctOptionIndex: 1,
    textTitle: "Djupkurvor",
    textInfo: "Dessa symboler kallas djupkurvor. De markerar gränsen mellan olika djupintervall och hjälper navigatören att snabbt se var vattnet blir grundare eller djupare."
  },
  {
    id: "symboler-7",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna strandlinjesymbol?",
    answer: "Ej kartlagd strandlinje.",
    imageKey: "symboler_07",
    options: [
      "Kartlagd strandlinje.",
      "Brygga.",
      "Ej kartlagd strandlinje.",
      "Sandstrand.",
    ],
    correctOptionIndex: 2,
    textTitle: "Ej kartlagd strandlinje",
    textInfo: "Symbolen betyder ej kartlagd strandlinje. Det visar att strandlinjen inte är bestämd med samma säkerhet som en vanlig kartlagd strandlinje.",
  },
  {
    id: "symboler-8",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna pil i farleden?",
    answer: "Farledspil.",
    imageKey: "symboler_08",
    options: [
      "Strömriktning.",
      "Farledspil.",
      "Vindriktning.",
      "Pejllinje.",
    ],
    correctOptionIndex: 1,
    textTitle: "Farledspil",
    textInfo: "En farledspil visar farledens riktning. I Sverige utgår farledsriktningarna från Strömstad och går runt landet till Haparanda, eller in mot hamn där farleden inte går runt landet."
  },
  {
    id: "symboler-9",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad betyder denna farledsmarkering?",
    answer: "Farled som ligger på en enslinje.",
    imageKey: "symboler_09",
    options: [
      "Farled med utprickning.",
      "Enslinje.",
      "Farled på enslinje.",
      "Alternativ farled.",
    ],
    correctOptionIndex: 2,
    textTitle: "Farled på enslinje",
    textInfo: "Symbolen betyder farled som ligger på en enslinje. Det innebär att det finns fasta sjömärken som hjälper navigatören att hålla rätt kurs längs farleden."
  },
  {
    id: "symboler-10",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad markerar denna farled?",
    answer: "Farled med flytande utprickning.",
    imageKey: "symboler_10",
    options: [
      "Farled utan märken.",
      "Farled med fasta märken.",
      "Farled med flytande utprickning.",
      "Djupgräns.",
    ],
    correctOptionIndex: 2,
    textTitle: "Farled med flytande utprickning",
    textInfo: "Denna symbol visar en farled med flytande utprickning. Det betyder att farleden är markerad med flytande sjömärken istället för fasta märken på land."
  },
  {
    id: "symboler-11",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna anläggning i vattnet?",
    answer: "Fiskodling.",
    imageKey: "symboler_11",
    options: [
      "Hamnområde.",
      "Fiskodling.",
      "Undervattenskabel.",
      "Naturreservat.",
    ],
    correctOptionIndex: 1,
    textTitle: "Fiskodling",
    textInfo: "Symbolen betyder fiskodling. Det är ett sjöfartshinder eller ett område där man måste visa särskild hänsyn vid navigation.",
  },
  {
    id: "symboler-12",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad representerar denna landbaserade symbol?",
    answer: "Kyrka (kyrktorn).",
    imageKey: "symboler_12",
    options: [
      "Fyr.",
      "Kyrka.",
      "Vattentorn.",
      "Radiomast.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kyrka",
    textInfo: "Symbolen betyder kyrka eller kyrktorn. Kyrktorn är ett typiskt landmärke som kan hjälpa till vid navigation eftersom det ofta syns på långt håll.",
  },
  {
    id: "symboler-13",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad markerar detta skyddsområde?",
    answer: "Fågelskyddsområde.",
    imageKey: "symboler_13",
    options: [
      "Naturhamn.",
      "Fågelskyddsområde.",
      "Militärt område.",
      "Fiskeområde.",
    ],
    correctOptionIndex: 1,
    textTitle: "Fågelskyddsområde",
    textInfo: "Symbolen betyder fågelskyddsområde. Sådana områden kan innebära begränsningar för hur man får färdas eller vistas där."
  },
  {
    id: "symboler-14",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna linje i kanten av sjökortet?",
    answer: "Sjökortsgräns till annat sjökort.",
    imageKey: "symboler_14",
    options: [
      "Djupgräns.",
      "Sjökortsgräns.",
      "Terränggräns.",
      "Farledsgräns.",
    ],
    correctOptionIndex: 1,
    textTitle: "Sjökortsgräns till mer detaljerat sjökort",
    textInfo: "Symbolen visar en sjökortsgräns till där ett annat sjökort har med detaljer. Det betyder att det finns ett annat sjökort över området med bättre och mer detaljerad information."
  },
  {
    id: "symboler-15",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna symbol i en kanal?",
    answer: "Sluss.",
    imageKey: "symboler_15",
    options: [
      "Bro.",
      "Sluss.",
      "Färjeläge.",
      "Hamnbassäng.",
    ],
    correctOptionIndex: 1,
    textTitle: "Sluss",
    textInfo: "Symbolen betyder sluss. På sjökort syns slussar så att man kan se var slussportarna finns, vilket är viktigt i kanaler och vissa hamnområden."
  },
  {
    id: "symboler-16",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna strandlinje?",
    answer: "Kartlagd strandlinje.",
    imageKey: "symboler_16",
    options: [
      "Ej kartlagd strandlinje.",
      "Kartlagd strandlinje.",
      "Strand med sand.",
      "Kaj.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kartlagd strandlinje",
    textInfo: "Symbolen betyder kartlagd strandlinje. Den markerar gränsen mellan land och vatten där strandlinjen är fastställd på sjökortet.",
  },
  {
    id: "symboler-17",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad markerar denna symbol under vattenytan?",
    answer: "Undervattenssten.",
    imageKey: "symboler_17",
    options: [
      "Sandbank.",
      "Undervattenssten.",
      "Grund.",
      "Synlig sten.",
    ],
    correctOptionIndex: 1,
    textTitle: "Undervattenssten",
    textInfo: "Symbolen betyder undervattenssten. Det är ett grundare hinder än 2 meter som aldrig syns över vattenytan och därför är viktigt att upptäcka på sjökortet."
  },
  {
    id: "symboler-18",
    question: "Vad betyder denna symbol på sjökortet?",
    questionQuiz: "Vad visar denna linje på sjökortet?",
    answer: "Undervattenskabel.",
    imageKey: "symboler_18",
    options: [
      "Undervattenskabel.",
      "Gasledning.",
      "Strömriktning.",
      "Djupkurva.",
    ],
    correctOptionIndex: 0,
    textTitle: "Undervattenskabel",
    textInfo: "Symbolen betyder undervattenskabel. Vid sådana kablar är det ofta olämpligt eller förbjudet att ankra, eftersom ankaret kan skada kabeln eller fastna."
  },

  {
    id: "symboler-19",
    question: 'Vilken färg menas med "W" på ett sjökort?',
    questionQuiz: 'Vad betyder färgkoden "W" i fyrkaraktärer?',
    answer: "Vit (White).",
    options: ["Vit.", "Gul.", "Blå.", "Grön."],
    correctOptionIndex: 0,
    textTitle: "Färgförkortningen W",
    textInfo: "Förkortningen W betyder vit (White). Färgförkortningar används på sjökort för att beskriva färgen på till exempel sjömärken.",

  },
  {
    id: "symboler-20",
    question: 'Vilken färg menas med "Y" på ett sjökort?',
    questionQuiz: 'Vad står "Y" för i färgförkortningar?',
    answer: "Gul (Yellow).",
    options: ["Vit.", "Röd.", "Gul.", "Grön."],
    correctOptionIndex: 2,
    textTitle: "Färgförkortningen Y",
    textInfo: "Förkortningen Y betyder gul (Yellow)."
  },
  {
    id: "symboler-21",
    question: 'Vilken färg menas med "B" på ett sjökort?',
    questionQuiz: 'Vad betyder bokstaven "B" i sjökortets färgkod?',
    answer: "Svart (Black).",
    options: ["Blå.", "Brun.", "Svart.", "Vit."],
    correctOptionIndex: 2,
    textTitle: "Färgförkortningen B",
    textInfo: "Förkortningen B betyder svart (Black).",
  },
  {
    id: "symboler-22",
    question: 'Vad består botten av om den är beskriven med "M"?',
    questionQuiz: 'Vad betyder bottentypen "M" i sjökort?',
    answer: "Gyttja (Mud).",
    options: ["Sand.", "Gyttja.", "Sten.", "Grus."],
    correctOptionIndex: 1,
    textTitle: "Bottenbeskaffenhet M",
    textInfo: "Om botten är beskriven med M betyder det gyttja (Mud). Bottenbeskaffenhet är särskilt viktig att känna till vid till exempel ankring."
  },
  {
    id: "symboler-23",
    question: 'Vad består botten av om den är beskriven med "S"?',
    questionQuiz: 'Vad betyder bottentypen "S" i sjökort?',
    answer: "Sand (Sand).",
    options: ["Sten.", "Silt.", "Sand.", "Skal."],
    correctOptionIndex: 2,
    textTitle: "Bottenbeskaffenhet S",
    textInfo: "Om botten är beskriven med S betyder det sand."
  },
];
