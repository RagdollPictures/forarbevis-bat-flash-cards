import type { FlashCard } from "../../types";

export const tillforlitlighet: FlashCard[] = [
  {
    id: "tillforlitlighet-1",
    question: "Vad heter den myndighet som gör sjömätningar i Sverige?",
    questionQuiz:
      "Vilken myndighet ansvarar för sjömätning i Sverige?",
    answer: "Sjöfartsverket.",
    options: [
      "Transportstyrelsen.",
      "SMHI.",
      "Sjöfartsverket.",
      "Kustbevakningen.",
    ],
    correctOptionIndex: 2,
    textTitle: "Myndighet som gör sjömätningar",
    textInfo: "I Sverige är det främst Sjöfartsverket som gör sjömätningar för svenska sjökort. Det finns också privata företag som mäter upp vissa områden, men Sjöfartsverket är den myndighet som ansvarar för de svenska sjökorten."
  },
  {
    id: "tillforlitlighet-2",
    question:
      "Vad är förkortningen för de rättelser som ges ut varje vecka för alla sjökort?",
    questionQuiz:
      "Vilken förkortning används för veckovisa rättelser av sjökort?",
    answer: "Ufs.",
    options: [
      "SRS.",
      "Ufs.",
      "NAV.",
      "SJV.",
    ],
    correctOptionIndex: 1,
    textTitle: "Veckovisa rättelser",
    textInfo: "De rättelser och uppdateringar som ges ut varje vecka för sjökort kallas Ufs, vilket står för Underrättelser för sjöfarande. Där publiceras löpande ny information om förändringar och fel som har upptäckts i sjökort eller farvatten."
  },
  {
    id: "tillforlitlighet-4",
    question:
      "Till vem anmäler man fel på ett sjökort? (Exempelvis ett grund som inte finns med.)",
    questionQuiz:
      "Vilken myndighet kontaktas vid fel i ett sjökort?",
    answer: "Sjöfartsverket.",
    options: [
      "Sweden Traffic.",
      "Transportstyrelsen.",
      "Sjöfartsverket.",
      "JRCC.",
    ],
    correctOptionIndex: 2,
    textTitle: "Fel på sjökort",
    textInfo: "Om man upptäcker fel på ett sjökort, till exempel ett grund som inte finns markerat, ska det anmälas till Sjöfartsverket. De tar emot felrapporter och ansvarar för att sjökort och sjökortsdata rättas."
  },
  {
    id: "tillforlitlighet-5",
    question:
      "För hur länge sedan gjordes ofta sjömätningar mellan öarna inomskärs?",
    questionQuiz:
      "Hur gamla är många sjömätningar i inomskärsområden?",
    answer: "Runt 100 år sedan.",
    options: [
      "10–20 år sedan.",
      "Runt 50 år sedan.",
      "Runt 100 år sedan.",
      "Över 300 år sedan.",
    ],
    correctOptionIndex: 2,
    textTitle: "Gamla sjömätningar inomskärs",
    textInfo: "Mellan öarna inomskärs är sjömätningarna ofta mycket gamla. I många områden gjordes de för runt 100 år sedan, ibland ännu längre tillbaka, vilket betyder att sjökorten där kan vara mindre tillförlitliga än i moderna farleder och ute till havs."
  },
];
