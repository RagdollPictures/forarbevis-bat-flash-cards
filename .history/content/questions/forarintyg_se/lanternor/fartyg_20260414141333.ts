import type { FlashCard } from "../../types";

export const lanternorFartyg: FlashCard[] = [
  {
    id: "lanternor_fartyg-1",
    question: "Hur många toppljus ska ett fartyg längre än 50 meter ha normalt?",
    questionQuiz: "Hur många toppljus krävs normalt på ett fartyg som är över 50 meter långt?",
    answer: "Två.",
    options: ["Ett", "Tre", "Två", "Fyra"],
    correctOptionIndex: 2,
    textTitle: "Toppljus på större fartyg",
  textInfo: "Ett fartyg som är längre än 50 meter ska ha två toppljus. Det ena sitter längre fram och lägre, och det andra längre akterut och högre. Detta gör att andra fartyg lättare kan bedöma storlek och riktning."
  },
  {
    id: "lanternor_fartyg-2",
    question:
      "Skiljer det något i kraven på vilka ljus ett fartyg som är 40 meter långt ska ha jämfört med en 8 meters motorbåt?",
    questionQuiz:
      "Finns det någon skillnad i ljuskraven mellan ett 40 meter långt fartyg och en motorbåt som är 8 meter?",
    answer: "Nej.",
    options: ["Nej", "Ja", "Endast i dålig sikt", "Endast nattetid"],
    correctOptionIndex: 0,
     textTitle: "Lanternor på mindre fartyg",
  textInfo: "Ett fartyg som är kortare än 50 meter har samma lanternor som en motorbåt. Det innebär sidoljus, akterljus och ett toppljus. Det finns alltså ingen skillnad mellan ett mindre fartyg och en vanlig motorbåt när det gäller lanternor."
  },
  {
    id: "lanternor_fartyg-3",
    question:
      "Hur många runtomlysande lanternor ska ett fartyg längre än 100 meter ha tända då de ligger för ankare?",
    questionQuiz:
      "När ett fartyg över 100 meter ligger för ankar, hur många runtlysande lanternor ska då vara tända?",
    answer: "Två.",
    options: ["Fyra", "Två", "En", "Tre"],
    correctOptionIndex: 1,
     textTitle: "Ankarljus på stora fartyg",
  textInfo: "Ett fartyg som är längre än 50 meter ska ha två runtomlysande vita ankarljus när det ligger för ankare – ett i fören och ett i aktern. Detta gör att fartyget syns tydligt från alla håll."
  },
];
