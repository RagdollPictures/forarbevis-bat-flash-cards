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
     textTitle: "Segeljollar och väjningsregler",
  textInfo: "Segeljollar följer samma väjningsregler som vanliga segelbåtar. De räknas som segelbåtar så länge de drivs av segel, även om de ofta rör sig mer oregelbundet och i lägre fart."
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
    textTitle: "Hänsyn till småbåtar",
  textInfo: "Småbåtar som kajaker och roddbåtar är långsamma och oskyddade. Därför ska andra båtar visa hänsyn, hålla avstånd och undvika att skapa farliga situationer med hög fart eller svall."
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
    textTitle: "Ansvar mellan småbåtar och större båtar",
  textInfo: "Det finns ingen generell väjningsplikt där större båtar alltid måste väja för småbåtar. I praktiken ska småbåtar hålla undan och helst färdas utanför farleder, samtidigt som större båtar ska visa hänsyn och inte utsätta dem för fara."
  },
];
