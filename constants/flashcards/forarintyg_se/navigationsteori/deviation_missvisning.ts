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
    textTitle: "Vad orsakar deviation på magnetkompassen ombord?",
    textInfo: "Deviation orsakas av magnetiska störningar ombord på båten. Det kan vara metallföremål, motorer, kablar och annan utrustning som påverkar kompassen och gör att den visar fel.",
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
      textTitle: "Förändras deviationen om kursen ändras?",
    textInfo: "Ja, deviationen förändras när man ändrar kurs. Det beror på att båtens magnetiska påverkan samverkar olika med jordens magnetfält beroende på vilken riktning båten har.",
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
      textTitle: "Är deviationen olika beroende på var man befinner sig?",
    textInfo: "Nej, deviationen beror på båten – inte platsen. Samma båt har samma deviation oavsett om den befinner sig på västkusten eller ostkusten.",
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
      textTitle: "Vad orsakar missvisning på magnetkompassen?",
    textInfo: "Missvisning orsakas av jordens magnetfält och att den magnetiska nordpolen inte ligger på samma plats som den geografiska nordpolen. Kompassen pekar mot den magnetiska nordpolen, medan kartor utgår från den geografiska.",
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
      textTitle: "Förändras missvisningen om kursen ändras?",
    textInfo: "Nej, missvisningen påverkas inte av vilken kurs man håller. Den är i princip konstant inom ett område och förändras bara om man flyttar sig geografiskt eller över tid.",
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
      textTitle: "Är missvisningen olika på västkusten och ostkusten?",
    textInfo: "Ja, missvisningen varierar beroende på plats. I Sverige är den till exempel mindre på västkusten och större i norra Östersjön.",
  },
];
