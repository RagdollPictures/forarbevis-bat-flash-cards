import type { FlashCard } from "../../types";

export const optiskNavigation: FlashCard[] = [
  {
    id: "optisk_navigation-1",
    question:
      "Vad kallas det när man använder bara ena sidan av enslinje i sin navigation för att undvika farligheter?",
    questionQuiz:
      "Vad kallas metoden när man medvetet håller sig på ena sidan av en enslinje för att undvika grund?",
    answer: "Frimärke.",
    options: [
      "Förbindelselinje.",
      "Kardinalmärke.",
      "Frimärke.",
      "Pejllinje.",
    ],
    correctOptionIndex: 2,
      textTitle: "Frimärke i navigation",
  textInfo: "Ett frimärke är en enslinje som används för att undvika ett riskområde. Man använder bara ena sidan av linjen och håller sig på den säkra sidan, bort från farligheten."
  },
  {
    id: "optisk_navigation-2",
    question:
      "Du siktar på två fasta sjömärken samtidigt för att kunna hålla exakt rätt kurs. Vad kallas det du siktar på?",
    questionQuiz:
      "Vad kallas det när två sjömärken ligger exakt bakom varandra i din siktlinje?",
    answer: "Enslinje.",
    options: [
      "Förbindelselinje.",
      "Enslinje.",
      "Lateralmärke.",
      "Kardinalpunkt.",
    ],
    correctOptionIndex: 1,
    textTitle: "Enslinje",
  textInfo: "En enslinje uppstår när två objekt, till exempel fyrar eller öar, ligger rakt bakom varandra. Genom att sikta så att de ligger i linje kan man hålla en exakt kurs och färdas säkert mellan hinder."
  },
  {
    id: "optisk_navigation-3",
    question:
      "Vad är riskerna med att färdas på en förbindelselinje?",
    questionQuiz:
      "Varför är det svårt att navigera exakt på en förbindelselinje?",
    answer:
      "Det är svårt att hålla exakt linje och man riskerar att glida i sidled.",
    options: [
      "Det är omöjligt att mäta distans.",
      "Kompasskursen fungerar inte.",
      "Det är svårt att hålla exakt linje och man riskerar att glida i sidled.",
      "Navigatorn visar fel position.",
    ],
    correctOptionIndex: 2,
    textTitle: "Förbindelselinje",
  textInfo: "En förbindelselinje innebär att man färdas rakt mellan två kända positioner. Det är dock svårt att hålla exakt linje, vilket gör att man lätt driver åt sidan och riskerar att komma för nära faror."
  },
];
