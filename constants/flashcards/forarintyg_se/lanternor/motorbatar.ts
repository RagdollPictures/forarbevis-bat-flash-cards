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
     textTitle: "Toppljus på motorbåt",
  textInfo: "Toppljuset på en motorbåt ska vara vitt. Det är placerat högt på båten och visar att det är ett motorfartyg som är i rörelse."
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
     textTitle: "Kombilanterna i fören",
  textInfo: "En motorbåt får ha en kombilanterna i fören som visar grönt ljus åt styrbord och rött ljus åt babord. Detta är en vanlig och godkänd lösning för sidoljusen."
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
     textTitle: "Runtomlysande lanterna",
  textInfo: "En motorbåt som är kortare än 12 meter får använda en runtomlysande vit lanterna istället för separat toppljus och akterljus. Denna lanterna måste vara placerad så att den syns i alla riktningar."
  },
];
