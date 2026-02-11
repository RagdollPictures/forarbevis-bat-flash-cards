import type { FlashCard } from "../../types";

export const sjukvardGrundlaggande: FlashCard[] = [
  {
    id: "sjukvard_grundlaggande-1",
    question:
      "En i besättningen har mått dåligt i några dagar och ni vet inte riktigt vad ni ska göra. Vilken del av sjukvårdssystemet ska du kontakta?",
    questionQuiz:
      "Om någon ombord varit sjuk i flera dagar och du behöver råd (men det är inte akut) – vart ringer du?",
    answer: "1177 – Sjukvårdsrådgivning.",
    options: ["112.", "1177.", "114 14.", "Kanal 16."],
    correctOptionIndex: 1,
  },
  {
    id: "sjukvard_grundlaggande-2",
    question:
      "En person ramlar och skadar sig allvarligt vid hopp ifrån båten till bryggan i en gästhamn. Vilket telefonnummer ringer ni?",
    questionQuiz:
      "Vid en allvarlig olycka i hamn – vilket nummer ringer du för att få akut hjälp?",
    answer: "112.",
    options: ["112.", "1177.", "113 13.", "114 14."],
    correctOptionIndex: 0,
  },
  {
    id: "sjukvard_grundlaggande-3",
    question:
      "Vilken kanal på en VHF-radio ska användas vid akuta medicinska problem till sjöss?",
    questionQuiz:
      "Vilken VHF-kanal använder du för akuta situationer till sjöss (t.ex. medicinskt nödläge)?",
    answer: "Kanal 16.",
    options: ["Kanal 68.", "Kanal 70.", "Kanal 16.", "Kanal 72."],
    correctOptionIndex: 2,
  },
  {
    id: "sjukvard_grundlaggande-4",
    question:
      "Nämn några saker som alltid ska finnas i en första hjälpen-väska?",
    questionQuiz:
      "Vilket av alternativen innehåller typiska saker som bör finnas i en första hjälpen-väska ombord?",
    answer: "Sax, tryckförband, lindor, plåster och sårrengöring.",
    options: [
      "Sax, tryckförband, lindor, plåster och sårrengöring.",
      "Skruvmejsel, buntband, extra säkringar och multimeter.",
      "Solglasögon, keps, badhandduk och extra laddare.",
      "Vinterjacka, paraply, stövlar och termos.",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "sjukvard_grundlaggande-5",
    question:
      "Vad betyder bokstäverna i L-ABCDE och i vilken ordning ska de användas?",
    questionQuiz:
      "Vad står L-ABCDE för, och i vilken ordning går du igenom stegen?",
    answer:
      "L – Livsfarligt läge. A – Airways (luftvägar). B – Breathing (andning). C – Cirkulation. D – Disability (medvetandegrad). E – Exponera.",
    options: [
      "L: Livsfarligt läge, A: Luftvägar, B: Andning, C: Cirkulation, D: Medvetandegrad, E: Exponera.",
      "L: Larma, A: Adrenalin, B: Bandage, C: Chock, D: Dropp, E: Evakuera.",
      "L: Lugn, A: Armar, B: Ben, C: Cirkel, D: Djup, E: Energi.",
      "L: Livboj, A: Ankare, B: Bogsering, C: Cederträ, D: Däck, E: Ekolod.",
    ],
    correctOptionIndex: 0,
  },
];
