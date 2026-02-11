import type { FlashCard } from "../../types";

export const lanternorMotorbatar: FlashCard[] = [
  {
    id: "lanternor_motorbatar-1",
    question: "Vilken färg ska toppljuset ha på en motorbåt?",
    questionQuiz:
      "Vilken färg ska motorbåtens topplanterna visa?",
    answer: "Vitt.",
    options: ["Grönt.", "Rött.", "Vitt.", "Gult."],
    correctOptionIndex: 2,
  },
  {
    id: "lanternor_motorbatar-2",
    question:
      "Får en motorbåt ha en kombilanterna i fören som lyser grönt åt styrbord och rött åt babord?",
    questionQuiz:
      "Är det tillåtet för en motorbåt att använda en kombilanterna i fören med grönt styrbordsljus och rött babordsljus?",
    answer: "Ja.",
    options: ["Nej.", "Ja.", "Endast i dagsljus.", "Endast över 12 meter."],
    correctOptionIndex: 1,
  },
  {
    id: "lanternor_motorbatar-3",
    question:
      "Får en motorbåt, kortare än 12 meter, ha en runtlysande vit lanterna istället för ett akterljus och ett toppljus?",
    questionQuiz:
      "Kan en motorbåt under 12 meter ersätta akterljus och toppljus med en runtlysande vit lanterna?",
    answer: "Ja.",
    options: [
      "Nej.",
      "Ja.",
      "Endast om den går under 7 knop.",
      "Endast vid ankring.",
    ],
    correctOptionIndex: 1,
  },
];
