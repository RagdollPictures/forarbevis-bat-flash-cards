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
  },
  {
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
  },
  {
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
  },
];
