import type { FlashCard } from "../../types";

export const sjokortstyper: FlashCard[] = [
  {
    id: "sjokortstyper-1",
    question:
      "Vad heter de sjökort som används för planering eller längre färd på öppet hav?",
    questionQuiz:
      "Vilken typ av sjökort används främst för planering och längre färder på öppet hav?",
    answer: "Översiktskort.",
    options: [
      "Skärgårdskort.",
      "Kustkort.",
      "Översiktskort.",
      "Båtsportkort.",
    ],
    correctOptionIndex: 2,
    textTitle: "Planering och öppet hav",
    textInfo: "De sjökort som används för planering eller längre färder på öppet hav kallas översiktskort. De har liten skala (t.ex. runt 1:500 000) och visar stora områden men med få detaljer."
  },
  {
    id: "sjokortstyper-2",
    question:
      "Vad heter det sjökort man använder då man seglar utanför skärgården?",
    questionQuiz:
      "Vilket sjökort används normalt utanför skärgårdsområden?",
    answer: "Kustkort.",
    options: [
      "Kustkort.",
      "Översiktskort.",
      "Skärgårdskort.",
      "Specialkort.",
    ],
    correctOptionIndex: 0,
    textTitle: "Utanför skärgården",
    textInfo: "När man navigerar utanför skärgården, längs kusten men inte inne bland öar, använder man kustkort. De är anpassade för kustnära navigation men saknar detaljer inne i skärgården."
  },
  {
    id: "sjokortstyper-3",
    question: "Vilken är den vanligaste skalan på skärgårdskort?",
    questionQuiz:
      "Vilken skala är vanligast på skärgårdskort?",
    answer: "1:50 000.",
    options: [
      "1:10 000.",
      "1:25 000.",
      "1:100 000.",
      "1:50 000.",
    ],
    correctOptionIndex: 3,
    textTitle: "Skärgårdskort – skala",
    textInfo: "Skärgårdskort har vanligtvis skalan 1:50 000. De innehåller många detaljer och används för navigation inne i skärgården där noggrannhet är viktig.",
  },
  {
    id: "sjokortstyper-4",
    question:
      "Det finns särskilda sjökort anpassade för fritidsbåtar. Vad heter de?",
    questionQuiz:
      "Vad kallas sjökort som är särskilt framtagna för fritidsbåtar?",
    answer: "Båtsportkort.",
    options: [
      "Kustkort.",
      "Översiktskort.",
      "Båtsportkort.",
      "Djupkort.",
    ],
    correctOptionIndex: 2,
    textTitle: "Sjökort för fritidsbåtar",
    textInfo: "Sjökort som är särskilt anpassade för fritidsbåtar kallas båtsportkort. De är ofta samlade i pärmar och innehåller skärgårdskort, specialkort och hamnkort i ett praktiskt format."
  },
  {
    id: "sjokortstyper-5",
    question:
      "Hur långt i verkligheten är 2 millimeter på ett sjökort med skalan 1:50 000?",
    questionQuiz:
      "Hur långt motsvarar 2 mm i verkligheten på ett sjökort i skala 1:50 000?",
    answer: "100 meter.",
    options: [
      "50 meter.",
      "100 meter.",
      "200 meter.",
      "1 000 meter.",
    ],
    correctOptionIndex: 1,
    textTitle: "Skala – avstånd i verkligheten",
    textInfo: "På ett sjökort i skalan 1:50 000 motsvarar 1 mm i verkligheten 50 meter. Det betyder att 2 mm på sjökortet motsvarar 100 meter i verkligheten."
  },
  {
    id: "sjokortstyper-6",
    question: "Vad kallas de sjökort som används i en navigator?",
    questionQuiz:
      "Vad heter sjökorten som används i elektroniska navigatorer?",
    answer: "Elektroniska sjökort.",
    options: [
      "Skärgårdskort.",
      "Elektroniska sjökort.",
      "Kustkort.",
      "Papperskort.",
    ],
    correctOptionIndex: 1,
    textTitle: "Sjökort i navigator",
    textInfo: "De sjökort som används i en navigator kallas elektroniska sjökort. De visas på en skärm och visar båtens position i realtid."
  },
  {
    id: "sjokortstyper-7",
    question:
      "Vad heter den myndighet som har ansvar för sjökorten i Sverige?",
    questionQuiz:
      "Vilken myndighet ansvarar för sjökortsutgivning i Sverige?",
    answer: "Sjöfartsverket.",
    options: [
      "Transportstyrelsen.",
      "SMHI.",
      "Sjöfartsverket.",
      "Kustbevakningen.",
    ],
    correctOptionIndex: 2,
    textTitle: "Ansvarig myndighet",
    textInfo: "I Sverige är det Sjöfartsverket som ansvarar för att ta fram sjökort och sjökortsdata."
  },
  {
    id: "sjokortstyper-8",
    question:
      "Vilken typ av sjökort är ett papperssjökort med ett tresiffrigt nummer (exempelvis 616 och 931)?",
    questionQuiz:
      "Vad är ett papperssjökort med tresiffrigt nummer (t.ex. 616)?",
    answer: "Skärgårdskort.",
    options: [
      "Översiktskort.",
      "Skärgårdskort.",
      "Kustkort.",
      "Båtsportkort.",
    ],
    correctOptionIndex: 1,
    textTitle: "Tresiffriga sjökort",
    textInfo: "Ett sjökort med ett tresiffrigt nummer, till exempel 616 eller 931, är ett skärgårdskort. Dessa används för detaljerad navigation i skärgården."
  },
  {
    id: "sjokortstyper-9",
    question: "Hur många siffror finns i numret för ett kustkort?",
    questionQuiz:
      "Hur många siffror består kustkortsnummer normalt av?",
    answer: "Två.",
    options: ["En.", "Två.", "Tre.", "Fyra."],
    correctOptionIndex: 1,
    textTitle: "Kustkort – antal siffror",
    textInfo: "Kustkort har tvåsiffriga nummer. Numret visar vilken typ av sjökort det är och skiljer det från andra kategorier."
  },
  {
    id: "sjokortstyper-10",
    question: "Vilken skala är övningssjökortet 616 eller 931 i?",
    questionQuiz:
      "Vilken skala har övningssjökort 616 och 931?",
    answer: "1:50 000.",
    options: [
      "1:25 000.",
      "1:10 000.",
      "1:50 000.",
      "1:100 000.",
    ],
    correctOptionIndex: 2,
    textTitle: "Skala – skärgårdskort (övningskort 616/931)",
    textInfo: "Övningssjökorten 616 och 931 är skärgårdskort och har skalan 1:50 000.",
  },
  {
    id: "sjokortstyper-11",
    question: "Vilken skala är övningssjökorten 6163 eller 9313 i?",
    questionQuiz:
      "Vilken skala har övningssjökort 6163 och 9313?",
    answer: "1:25 000.",
    options: [
      "1:50 000.",
      "1:25 000.",
      "1:75 000.",
      "1:10 000.",
    ],
    correctOptionIndex: 1,
    textTitle: "Skala – specialkort (6163/9313)",
    textInfo: "Övningssjökorten 6163 och 9313 är specialkort och har skalan 1:25 000. De används i områden där ännu fler detaljer behövs, till exempel i trafikerade farleder."
  },
];
