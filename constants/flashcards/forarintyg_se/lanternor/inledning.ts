import type { FlashCard } from "../../types";

export const lanternorInledning: FlashCard[] = [
  {
    id: "lanternor_inledning-1",
    question: "Vad heter en båts röda och gröna lanternor som lyser framåt?",
    questionQuiz:
      "Vad kallas båtens röda och gröna lanternor som lyser framåt?",
    answer: "Sidoljus.",
    options: ["Sidoljus", "Akterljus", "Toppljus", "Runtomlysande ljus"],
    correctOptionIndex: 0,
    textTitle: "Sidoljus",
  textInfo: "Sidoljus är de röda och gröna lanternorna som sitter på båtens sidor och lyser framåt. Det röda ljuset sitter på babord sida och det gröna på styrbord sida. De används för att visa från vilket håll en båt ses och hur den rör sig."
  },
  {
    id: "lanternor_inledning-2",
    question: "Vilken lysvinkel har dessa röda och gröna lanternor?",
    questionQuiz:
      "Hur stor sektor (lysvinkel) täcker båtens röda och gröna sidoljus?",
    answer: "112,5°.",
    options: ["90°", "112,5°", "135°", "225°"],
    correctOptionIndex: 1,
    textTitle: "Sidoljusens lysvinkel",
  textInfo: "Sidoljus lyser i en sektor på 112,5°. De syns från rakt förut och bak till 22,5° akter om tvärs på respektive sida. Detta gör att andra kan avgöra båtens riktning."
  },
  {
    id: "lanternor_inledning-3",
    question: "Vad heter en båts lanterna som lyser vitt bakåt?",
    questionQuiz: "Vad kallas den vita lanternan som lyser akterut?",
    answer: "Akterljus.",
    options: ["Akterljus", "Sidoljus", "Toppljus", "Ankarlanterna"],
    correctOptionIndex: 0,
    textTitle: "Akterljus",
  textInfo: "Akterljuset är ett vitt ljus som lyser bakåt från båten. Det sitter längst bak eller så högt att det inte skyms, och visar att man ser båten akterifrån."
  },
  {
    id: "lanternor_inledning-4",
    question: "Vilken lysvinkel har denna vita lanterna?",
    questionQuiz: "Vilken lysvinkel har akterljuset?",
    answer: "135°.",
    options: ["112,5°", "135°", "180°", "225°"],
    correctOptionIndex: 1,
    textTitle: "Akterljusets lysvinkel",
  textInfo: "Akterljuset har en lysvinkel på 135°. Det lyser bakåt över 67,5° åt varje sida från rakt akterut."
  },
  {
    id: "lanternor_inledning-5",
    question:
      "Vad heter en båts vita lanterna som lyser framåt då den kör för motor?",
    questionQuiz:
      "Vad kallas den vita lanternan som lyser framåt när båten går för motor?",
    answer: "Toppljus.",
    options: ["Toppljus", "Akterljus", "Sidoljus", "Däcksljus"],
    correctOptionIndex: 0,
     textTitle: "Toppljus",
  textInfo: "Toppljuset är ett vitt ljus placerat högt på båten. Det används när båten går för motor och visar att det är ett motorfartyg."
  },
  {
    id: "lanternor_inledning-6",
    question: "Vilken lysvinkel har denna vita lanterna?",
    questionQuiz: "Vilken lysvinkel har toppljuset?",
    answer: "225°.",
    options: ["135°", "180°", "225°", "360°"],
    correctOptionIndex: 2,
     textTitle: "Toppljusets lysvinkel",
  textInfo: "Toppljuset lyser i en sektor på 225°. Det syns från rakt förut till 22,5° akter om tvärs på båda sidor."
  },
];
