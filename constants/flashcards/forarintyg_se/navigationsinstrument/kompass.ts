import type { FlashCard } from "../../types";

export const navigationsinstrumentKompass: FlashCard[] = [
  {
    id: "navigationsinstrument_kompass-1",
    question:
      "Åt vilket håll pekar kompassnålen på en kompass?",
    questionQuiz:
      "Vilken riktning visar den magnetiska kompassnålen?",
    answer:
      "Rakt mot norr.",
    options: [
      "Mot geografisk syd.",
      "Mot magnetisk nord.",
      "Mot solens position.",
      "Mot närmaste land.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "navigationsinstrument_kompass-2",
    question:
      "Vad kallas det fel som båtens magnetfält ger upphov till på en magnetkompass?",
    questionQuiz:
      "Vilken typ av kompassfel orsakas av båtens egna magnetiska påverkan?",
    answer:
      "Deviation.",
    options: [
      "Missvisning.",
      "Deviation.",
      "Variation.",
      "DOP.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "navigationsinstrument_kompass-3",
    question:
      "Vad kallas det fel som jordens magnetfält ger upphov till på en magnetkompass?",
    questionQuiz:
      "Vad kallas skillnaden mellan magnetisk nord och geografisk nord?",
    answer:
      "Missvisning.",
    options: [
      "Deviation.",
      "Missvisning.",
      "Kurs över grund.",
      "Avdrift.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "navigationsinstrument_kompass-4",
    question:
      "Vad ska man tänka på gällande kompassens placering?",
    questionQuiz:
      "Vilka krav bör uppfyllas vid montering av en magnetkompass ombord?",
    answer:
      "Att den är placerad långt ifrån magnetiska störningar, är lätt att avläsa från styrplatsen, monterad parallellt med långskeppslinjen, har belysning och inte riskerar att skadas.",
    options: [
      "Placeras nära elektronik för bättre signal.",
      "Monteras var som helst så länge den är synlig.",
      "Placeras fritt från magnetiska störningar och korrekt riktad i båten.",
      "Placeras så nära motorn som möjligt.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "navigationsinstrument_kompass-5",
    question:
      "Nämn några olika typer av kompasser?",
    questionQuiz:
      "Vilka av följande är exempel på olika kompasstyper?",
    answer:
      "Magnetisk kompass, elektronisk kompass, gyrokompass och satellitkompass.",
    options: [
      "Magnetisk kompass, gyrokompass och satellitkompass.",
      "Vindkompass och fartkompass.",
      "Radar- och loggkompass.",
      "Laserkompass och djupkompass.",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "navigationsinstrument_kompass-6",
    question:
      "Visar en navigator samma kurs som en magnetisk kompass?",
    questionQuiz:
      "Visar GPS-navigatorn normalt samma kurs som magnetkompassen?",
    answer:
      "Nej, om det inte är en magnetisk kompass som är ansluten till navigatorn.",
    options: [
      "Ja, alltid.",
      "Nej, eftersom navigatorn visar kurs över grund.",
      "Ja, men bara i hamn.",
      "Endast vid låg fart.",
    ],
    correctOptionIndex: 1,
  },
];
