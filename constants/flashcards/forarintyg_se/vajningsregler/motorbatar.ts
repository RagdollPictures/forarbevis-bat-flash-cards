import type { FlashCard } from "../../types";

export const vajningsreglerMotorbatar: FlashCard[] = [
  {
    id: "vajningsregler_motorbatar-1",
    question: "Två motorbåtar möts. Vem ska väja?",
    questionQuiz:
      "Två motorbåtar möts stäv mot stäv. Hur ska ni agera?",
    answer:
      "Båda. Och då helst till styrbord/höger i färdriktningen för båda två.",
    options: [
      "Endast den snabbaste båten.",
      "Endast den största båten.",
      "Båda väjer åt styrbord.",
      "Ingen – den med mest kraft fortsätter.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "vajningsregler_motorbatar-2",
    question: "Två motorbåtar har skärande kurs. Vem ska väja?",
    questionQuiz:
      "Två motorbåtar går på skärande kurs. Vem är väjningsskyldig?",
    answer: 'Den som har "mötet" på sin styrbordssida.',
    options: [
      "Den som har den andra båten på styrbordssidan.",
      "Den som har den andra båten på babordssidan.",
      "Den snabbaste båten.",
      "Den med lägst fart.",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "vajningsregler_motorbatar-3",
    question:
      "Ett lastfartyg kör ikapp en fritidsbåt ute på havet. Vem ska väja?",
    questionQuiz:
      "Ett lastfartyg håller på att köra om en fritidsbåt. Vem väjer?",
    answer: "Lastfartyget.",
    options: [
      "Fritidsbåten.",
      "Lastfartyget.",
      "Båda samtidigt.",
      "Den som ligger längst till höger.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "vajningsregler_motorbatar-4",
    question: "En motorbåt möter en segelbåt. Vem ska väja?",
    questionQuiz:
      "En motorbåt möter en segelbåt under normala förhållanden. Vem är väjningsskyldig?",
    answer: "Motorbåten.",
    options: [
      "Segelbåten.",
      "Motorbåten.",
      "Båda.",
      "Den långsammaste båten.",
    ],
    correctOptionIndex: 1,
  },
];
