import type { FlashCard } from "../../types";

export const navigationsinstrumentSatellit: FlashCard[] = [
  {
    id: "navigationsinstrument_satellit-1",
    question:
      "Vad är GNSS en akronym för?",
    questionQuiz:
      "Vad står förkortningen GNSS för?",
    answer:
      "Global Navigation Satellite System.",
    options: [
      "Global Navigation Satellite System.",
      "Geographical Navigation Signal System.",
      "General Nautical Satellite Service.",
      "Global Nautical Safety System.",
    ],
    correctOptionIndex: 0,
     textTitle: "GNSS och positionering",
  textInfo: "GNSS står för Global Navigation Satellite System och är ett system som använder satelliter för att bestämma position. För att kunna räkna ut en position måste mottagaren ta emot signaler från minst fyra satelliter."
  },
  {
    id: "navigationsinstrument_satellit-2",
    question:
      'Hur många satelliter måste en GNSS-mottagare absolut minst "se" för att kunna ge en position?',
    questionQuiz:
      "Hur många satelliter krävs minst för att en GNSS-mottagare ska kunna beräkna en position?",
    answer:
      "Fyra.",
    options: [
      "Tre.",
      "Fyra.",
      "Fem.",
      "Två.",
    ],
    correctOptionIndex: 1,
      textTitle: "Minst fyra satelliter",
textInfo: "För att en GNSS-mottagare ska kunna beräkna en position krävs signaler från minst fyra satelliter. Fler satelliter ger oftast bättre noggrannhet och stabilare position."
  },
  {
    id: "navigationsinstrument_satellit-3",
    question:
      "Nämn ett av de landbaserade systemen för att förbättra precisionen i en GPS-mottagare?",
    questionQuiz:
      "Vilket system används för att förbättra noggrannheten i GNSS-positionering?",
    answer:
      "Europeiska EGNOS eller amerikanska WAAS.",
    options: [
      "AIS.",
      "EGNOS eller WAAS.",
      "VTS.",
      "Radar.",
    ],
    correctOptionIndex: 1,
    textTitle: "Förbättrad noggrannhet",
textInfo: "Noggrannheten i en GNSS-mottagare kan förbättras med hjälp av landbaserade system som EGNOS i Europa eller WAAS i USA. Dessa skickar korrigeringsdata som gör positionen mer exakt."
  },{
    id: "navigationsinstrument_satellit-4",
    question:
      "Vilken precision på positionen kan man normalt räkna med på en väl fungerande GNSS-mottagare?",
    questionQuiz:
      "Hur noggrann är normalt positionen från en fungerande GNSS-mottagare?",
    answer:
      "Inom 10 meter eller bättre.",
    options: [
      "Inom 100 meter.",
      "Inom 50 meter.",
      "Inom 10 meter eller bättre.",
      "Exakt på centimetern.",
    ],
    correctOptionIndex: 2,
    textTitle: "Positionens noggrannhet",
textInfo: "En modern GNSS-mottagare ger normalt en position med en noggrannhet inom cirka 10 meter eller bättre, vilket är tillräckligt för praktisk navigation."
  },{
    id: "navigationsinstrument_satellit-5",
    question:
      "Vad är fördröjningen i positionen relativt farten ungefär på en GNSS-mottagare?",
    questionQuiz:
      "Hur stor positionsförskjutning kan uppstå per knop på grund av GNSS-fördröjning?",
    answer:
      "Cirka 1 meter per knops fart.",
    options: [
      "Cirka 10 meter per knop.",
      "Ingen fördröjning alls.",
      "Cirka 1 meter per knop.",
      "Cirka 5 meter per knop.",
    ],
    correctOptionIndex: 2,
    textTitle: "Fördröjning i position",
textInfo: "Positionen som visas är alltid något fördröjd eftersom den beräknas utifrån tidigare signaler. Felet är ungefär 1 meter per knop, vilket innebär att högre fart ger större positionsförskjutning."
  },
  {
    id: "navigationsinstrument_satellit-6",
    question:
      "(Överkurs) Nämn, förutom GPS, ett av de GNSS-system som finns?",
    questionQuiz:
      "Vilket av följande är ett annat GNSS-system än GPS?",
    answer:
      "Glonass, BeiDou eller Galileo.",
    options: [
      "Radar.",
      "AIS.",
      "Galileo.",
      "Ekolod.",
    ],
    correctOptionIndex: 2,
    textTitle: "Flera GNSS-system",
textInfo: "Förutom GPS finns flera andra GNSS-system som Glonass, BeiDou och Galileo. Moderna mottagare använder ofta flera system samtidigt för bättre noggrannhet och tillförlitlighet."
  },
];
