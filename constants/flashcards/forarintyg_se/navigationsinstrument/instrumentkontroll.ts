import type { FlashCard } from "../../types";

export const navigationsinstrumentInstrumentkontroll: FlashCard[] = [
  {
    id: "navigationsinstrument_instrumentkontroll-1",
    question:
      "Vilka är de tre vanligaste orsakerna till att en magnetkompass inte visar den exakt rätta kursen?",
    questionQuiz:
      "Vilka faktorer orsakar normalt avvikelser i en magnetkompass?",
    answer:
      "Deviation, missvisning och att kompassen är snett monterad (A-felet).",
    options: [
      "Ström, batterispänning och temperatur.",
      "Deviation, missvisning och monteringsfel (A-fel).",
      "Vind, ström och fart.",
      "Satellitfel och DOP-värde.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kompassfel",
textInfo: "De tre vanligaste orsakerna till att en magnetkompass visar fel är deviation från båtens egna magnetfält, missvisning från jordens magnetfält samt att kompassen är felmonterad, till exempel snett i förhållande till båtens längdriktning."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-2",
    question:
      "Vilken är den bästa metoden för att kontrollera en magnetisk kompass?",
    questionQuiz:
      "Hur kontrollerar du mest tillförlitligt att en magnetkompass visar rätt kurs?",
    answer:
      "Att kontrollera visad kurs mot den kurs som en enslinje har.",
    options: [
      "Jämföra med GPS:ens kurs över grund.",
      "Jämföra med vindriktningen.",
      "Kontrollera mot en enslinje.",
      "Se om kompassen pekar mot norr i hamn.",
    ],
    correctOptionIndex: 2,
    textTitle: "Kontroll med enslinje",
textInfo: "Den bästa metoden för att kontrollera en magnetkompass är att köra längs en enslinje med känd kurs. Om kompassens visning avviker från den kända kursen finns ett kompassfel."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-3",
    question:
      "Varför är en kontroll av en magnetisk kompass gentemot en navigator en relativt dålig metod?",
    questionQuiz:
      "Varför är det osäkert att jämföra magnetkompassen direkt med navigatorns kurs?",
    answer:
      "För att navigatorn inte visar magnetisk kurs utan kurs över grund.",
    options: [
      "För att navigatorn alltid visar fel.",
      "För att navigatorn visar kurs över grund, inte magnetisk kurs.",
      "För att magnetkompassen är mer exakt än navigatorn.",
      "För att enslinjer är förbjudna att använda.",
    ],
    correctOptionIndex: 1,
    textTitle: "Jämförelse med navigator",
textInfo: "Att jämföra kompassens kurs med navigatorns kurs är en relativt dålig metod eftersom navigatorn visar kurs över grund, medan kompassen visar magnetisk kurs. Dessa kan skilja sig mycket beroende på vind och ström."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-4",
    question:
      "Hur kalibreras en elektronisk kompass?",
    questionQuiz:
      "Hur justeras en elektronisk kompass så att den visar korrekt riktning?",
    answer:
      "Genom att följa tillverkarens anvisningar, om kalibrering är möjlig.",
    options: [
      "Genom att jämföra med GPS.",
      "Genom att vrida båten i hög fart.",
      "Genom att följa tillverkarens instruktioner.",
      "Den kalibreras automatiskt utan åtgärd.",
    ],
    correctOptionIndex: 2,
    textTitle: "Kalibrering av elektronisk kompass",
textInfo: "En elektronisk kompass kalibreras genom att följa tillverkarens anvisningar, vilket ofta innebär att båten körs i cirklar medan kompassen justerar sig själv."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-5",
    question:
      "Hur kontrolleras loggen?",
    questionQuiz:
      "Hur kan du kontrollera att loggen mäter distans korrekt?",
    answer:
      "Genom att köra en noggrant uppmätt distans på sjökortet och jämföra den med loggens uppmätta distans.",
    options: [
      "Genom att jämföra med bränsleförbrukningen.",
      "Genom att mäta en känd distans och jämföra med loggens värde.",
      "Genom att kontrollera djupet.",
      "Genom att jämföra med ekolodet.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kontroll av logg",
textInfo: "Loggen kontrolleras genom att jämföra uppmätt distans eller fart med kända värden, till exempel en noggrant uppmätt sträcka på sjökortet eller navigatorns fart, även om ström och vind kan påverka resultatet."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-6",
    question:
      "Hur kontrolleras ekolodet?",
    questionQuiz:
      "Hur kan du verifiera att ekolodet visar rätt djup?",
    answer:
      "Genom att jämföra visat djup på ekolodet med ett djup angivet på sjökortet.",
    options: [
      "Genom att jämföra med kompasskursen.",
      "Genom att jämföra med ett känt djup enligt sjökortet.",
      "Genom att mäta farten.",
      "Genom att kontrollera DOP-värdet.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kontroll av ekolod",
textInfo: "Ekolodet kontrolleras genom att jämföra det visade djupet med ett känt djup från sjökortet på en plats där botten är jämn och vattenståndet är normalt."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-7",
    question:
      "Hur kontrolleras navigatorn?",
    questionQuiz:
      "Hur kan du kontrollera att navigatorn visar korrekt position?",
    answer:
      "Genom att förtöja längs en brygga eller kaj som finns på sjökortet och kontrollera att navigatorn visar rätt position.",
    options: [
      "Genom att jämföra med kompassens kurs.",
      "Genom att förtöja vid en känd plats på sjökortet och kontrollera positionen.",
      "Genom att kontrollera bränslemätaren.",
      "Genom att starta om enheten.",
    ],
    correctOptionIndex: 1,
    textTitle: "Kontroll av navigator",
textInfo: "Navigatorn kontrolleras genom att jämföra den visade positionen med verkligheten, till exempel genom att förtöja vid en brygga och kontrollera att båten visas på rätt plats på sjökortet."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-8",
    question:
      "Vad indikerar ett högt DOP-värde på navigatorn?",
    questionQuiz:
      "Vad betyder det om navigatorn visar ett högt DOP-värde?",
    answer:
      "Att signalstyrkan från GNSS-systemen till navigatorn är svag eller dålig.",
    options: [
      "Att positionen är mycket exakt.",
      "Att signalmottagningen är dålig.",
      "Att batteriet är lågt.",
      "Att magnetkompassen störs.",
    ],
    correctOptionIndex: 1,
    textTitle: "DOP-värde",
textInfo: "Ett högt DOP-värde indikerar att GNSS-mottagningen är dålig och att positionen kan vara mindre noggrann. Lägre värde innebär bättre precision."
  },
  {
    id: "navigationsinstrument_instrumentkontroll-9",
    question:
      "Kan GNSS-signalerna från satelliterna störas ut?",
    questionQuiz:
      "Är det möjligt att GNSS-signaler påverkas eller slås ut?",
    answer:
      "Ja. Det finns militära system som kan störa ut GNSS-information i stora områden.",
    options: [
      "Nej, satellitsignaler kan inte störas.",
      "Ja, GNSS-signaler kan störas ut.",
      "Endast vid åska.",
      "Endast nära höga berg.",
    ],
    correctOptionIndex: 1,
    textTitle: "Störningar i GNSS",
textInfo: "GNSS-signaler kan störas ut av externa faktorer, till exempel militära system eller omgivande hinder. Detta kan leda till felaktig position eller att ingen position visas alls."
  },
];
