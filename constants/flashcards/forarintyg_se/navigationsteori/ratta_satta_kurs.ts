import type { FlashCard } from "../../types";

export const rattaSattaKurs: FlashCard[] = [
  {
    id: "ratta_satta_kurs-1",
    question: "Vilket instrument är det som visar KK?",
    answer: "KK / Kompasskursen visas av magnetkompassen.",
  },
  {
    id: "ratta_satta_kurs-2",
    question: "Du mäter upp en kurs på ett sjökort. Vad benämns denna kurs som?",
    answer: "K / Rättvisande kurs.",
  },
  {
    id: "ratta_satta_kurs-3",
    question: "Vilken kurs visas på din navigator?",
    answer: "KÖG / Kurs Över Grund.",
  },
  {
    id: "ratta_satta_kurs-4",
    question:
      "Vilka två fel måste räknas med mellan Kompasskurs och Rättvisande kurs?",
    answer: "Deviation och missvisning.",
  },
  {
    id: "ratta_satta_kurs-5",
    question:
      "Vilka två fel måste räknas med mellan Rättvisande kurs och Kurs Över Grund?",
    answer: "Avdrift och ström.",
  },
  {
    id: "ratta_satta_kurs-6",
    question:
      "Vilket tecken ska ett ostligt fel ha i den så kallade Chalmers-metoden?",
    answer: "+/Positivt.",
  },
  {
    id: "ratta_satta_kurs-7",
    question:
      "Du styr 090° på din magnetkompass (KK) och har en missvisning som är ostlig på 4°. Vilken KÖG får du? Bortse ifrån ström, deviation och avdrift.",
    answer: "090° (KK) + 4° (ostlig missvisning) = 094° (KÖG).",
  },
  {
    id: "ratta_satta_kurs-8",
    question:
      "Du vill färdas med KÖG 090° men har en avdrift med 5° i och med den sydliga vinden. Vilken kurs ska du styra på din kompass? Bortse från missvisning, ström och deviation.",
    answer: "090° (KÖG). Avdrift från höger -5°. Chalmersmetoden ger = 095° (KK).",
  },
  {
    id: "ratta_satta_kurs-9",
    question:
      "Du har gjort en pejling till en fyr med din pejlkompass och läser av kompasskursen på den till 185°. På sjökortet ser du att missvisningen i området är W4°. Bortse ifrån eventuell deviation. Vad är rättvisande bäring till fyren?",
    answer: "185° (KK) - 4° (västlig missvisning) = 181° (K).",
  },
  {
    id: "ratta_satta_kurs-10",
    question:
      "Du mäter på sjökortet ut att du ska köra rättvisande kurs 350° (K). Du vill nu veta vilken kompasskurs (KK) det innebär. På sjökortet ser du att missvisningen är E4°. Bortse ifrån eventuell deviation.",
    answer: "350° (K). Missvisningen är E/+4°. Chalmersmetoden ger = 346° (KK).",
  },
];
