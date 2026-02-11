import type { FlashCard } from "../../types";

export const sjukvardNedkylning: FlashCard[] = [
  {
    id: "sjukvard_nedkylning-1",
    question:
      "Hur mycket snabbare kyler kallt vatten ner jämfört med kall luft?",
    questionQuiz:
      "Ungefär hur mycket snabbare förlorar kroppen värme i kallt vatten jämfört med kall luft?",
    answer:
      "Cirka 20 gånger snabbare.",
    options: [
        "Cirka 5 gånger snabbare.",
        "Cirka 10 gånger snabbare.",
        "Cirka 20 gånger snabbare.",
        "Cirka 50 gånger snabbare.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "sjukvard_nedkylning-2",
    question:
      "Hur förebygger man att bli nedkyld?",
    questionQuiz:
      "Vad är det bästa sättet att minska risken för nedkylning vid kallt väder till sjöss?",
    answer:
      "Genom att använda rätt och torr klädsel i flera lager när det är kallt.",
    options: [
        "Genom att röra sig så lite som möjligt.",
        "Genom att dricka kallt vatten ofta.",
        "Genom att använda rätt och torr klädsel i flera lager.",
        "Genom att undvika mössa.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "sjukvard_nedkylning-3",
    question:
      "Hur behandlas en person med lätt nedkylning?",
    questionQuiz:
      "Vilken åtgärd är lämplig vid lindrig nedkylning?",
    answer:
      "Genom byte till torra kläder om de är blöta, mer kläder och gärna bädda ner eller packa in personen i en sovsäck eller liknande.",
    options: [
        "Ge kall dryck och låta personen vila ute i friska luften.",
        "Massera kraftigt armar och ben i kall miljö.",
        "Byta till torra kläder och värma personen gradvis.",
        "Lämna personen att värma sig själv genom rörelse.",
    ],
    correctOptionIndex: 2,
  },
];
