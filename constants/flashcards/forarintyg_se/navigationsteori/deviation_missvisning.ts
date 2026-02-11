import type { FlashCard } from "../../types";

export const deviationMissvisning: FlashCard[] = [
  {
    id: "deviation_missvisning-1",
    question: "Vad orsakar deviation på magnetkompassen ombord?",
    questionQuiz:
      "Vad är den vanligaste orsaken till deviation i en magnetkompass ombord?",
    answer:
      "Magnetiska störningar ombord från metallföremål och kablar.",
    options: [
      "Jordens magnetfält.",
      "Satellitsignaler.",
      "Magnetiska störningar från metall och el ombord.",
      "Vindens påverkan.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "deviation_missvisning-2",
    question:
      "Är det sannolikt att deviationen förändras om kursen ändras 90°?",
    questionQuiz:
      "Förändras deviationen när båten ändrar kurs?",
    answer:
      "Ja, mycket sannolikt! Deviationen varierar för olika kurser.",
    options: [
      "Nej, deviationen är alltid densamma.",
      "Ja, deviationen varierar beroende på kurs.",
      "Endast vid hög fart.",
      "Endast i hård vind.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "deviation_missvisning-3",
    question: "Är deviationen olika på västkusten och ostkusten?",
    questionQuiz:
      "Skiljer sig deviationen mellan olika geografiska platser i Sverige?",
    answer:
      "Nej. Deviationen beror på båten, inte var den befinner sig.",
    options: [
      "Ja, den varierar mellan väst- och ostkusten.",
      "Nej, den beror på båtens magnetiska påverkan.",
      "Ja, den styrs av jordens magnetfält.",
      "Endast i insjöar.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "deviation_missvisning-4",
    question: "Vad orsakar missvisning på magnetkompassen ombord?",
    questionQuiz:
      "Vad är orsaken till missvisning i en magnetkompass?",
    answer:
      "Jordens magnetfält och skillnaden mellan geografisk och magnetisk nord.",
    options: [
      "Magnetiska störningar i båten.",
      "Felaktig montering.",
      "Skillnaden mellan magnetisk och geografisk nord.",
      "Batterifel.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "deviation_missvisning-5",
    question:
      "Är det sannolikt att missvisningen förändras om kursen ändras 90°?",
    questionQuiz:
      "Påverkas missvisningen av vilken kurs båten håller?",
    answer:
      "Nej. Missvisningen är helt oberoende av aktuell kurs.",
    options: [
      "Ja, den varierar med kursen.",
      "Nej, den är oberoende av kurs.",
      "Endast vid hård ström.",
      "Endast vid låg fart.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "deviation_missvisning-6",
    question: "Är missvisningen olika på västkusten och ostkusten?",
    questionQuiz:
      "Kan missvisningen skilja sig mellan västkusten och ostkusten?",
    answer:
      "Ja. Missvisningen skiljer flera grader mellan väst- och ostkusten.",
    options: [
      "Nej, den är densamma överallt.",
      "Ja, den varierar geografiskt.",
      "Endast om deviationen ändras.",
      "Endast i insjöar.",
    ],
    correctOptionIndex: 1,
  },
];
