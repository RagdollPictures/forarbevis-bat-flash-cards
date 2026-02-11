import type { FlashCard } from "../../types";

export const vajningsreglerSmabatar: FlashCard[] = [
  {
    id: "vajningsregler_smabatar-1",
    question:
      "Har segeljollar egna väjningsregler eller är det samma som för en segelbåt?",
    questionQuiz:
      "Gäller särskilda väjningsregler för segeljollar jämfört med andra segelbåtar?",
    answer: "Samma som för en segelbåt.",
    options: [
      "De har helt egna regler.",
      "Samma regler som för en segelbåt.",
      "Samma regler som för motorbåtar.",
      "De har alltid företräde.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "vajningsregler_smabatar-2",
    question:
      'Får man köra nära en "småbåt" i hög fart?',
    questionQuiz:
      "Är det tillåtet att passera en småbåt på nära håll i hög fart?",
    answer:
      'Nej. Det är inte att visa hänsyn och orsakar ofta problem för "småbåten".',
    options: [
      "Ja, om man håller kursen.",
      "Ja, om man tutar innan.",
      "Nej, man ska visa hänsyn och undvika att skapa svall.",
      "Ja, om man är större båt.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "vajningsregler_smabatar-3",
    question:
      'Har segelbåtar, motorbåtar och fartyg en generell väjningsplikt för "småbåtar"?',
    questionQuiz:
      "Har andra fartyg alltid väjningsplikt mot småbåtar?",
    answer:
      "Nej. Småbåtar ska snarare generellt hålla undan och färdas utanför farlederna.",
    options: [
      "Ja, småbåtar har alltid företräde.",
      "Ja, om de är under 5 meter.",
      "Nej, småbåtar ska oftast hålla undan.",
      "Endast i hamnområde.",
    ],
    correctOptionIndex: 2,
  },
];
