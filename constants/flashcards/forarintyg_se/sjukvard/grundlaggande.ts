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
    textTitle: "Sjukvårdsrådgivning vid osäkerhet",
textInfo: "Vid icke akuta sjukvårdsproblem, exempelvis om någon mår dåligt och man är osäker på vad man ska göra, ska man kontakta 1177. Där får man rådgivning om hur situationen bör hanteras."
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
    textTitle: "Akut sjukvård i hamn",
textInfo: "Vid en allvarlig skada i hamn, exempelvis om någon ramlar och skadar sig, ska man ringa 112. SOS Alarm kopplar då in rätt räddningsresurser."
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
    textTitle: "Akut sjukvård till sjöss",
textInfo: "Vid akuta medicinska problem till sjöss använder man VHF-radio på kanal 16 för att larma. Alternativt kan man ringa 112 om täckning finns."
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
    textTitle: "Innehåll i första hjälpen-väska",
textInfo: "En första hjälpen-väska bör innehålla utrustning som sax, tryckförband, lindor, plåster och sårrengöringsmedel. Med denna utrustning kan man hantera många skador i väntan på vård."
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
    textTitle: "L-ABCDE-metoden",
textInfo: "L-ABCDE är en metod för att prioritera åtgärder vid allvarliga olyckor. L står för livsfarligt läge, A för luftvägar, B för andning, C för cirkulation, D för medvetandegrad och E för exponering av kroppen för att upptäcka skador. Metoden säkerställer att livshotande problem hanteras i rätt ordning."
  },
];
