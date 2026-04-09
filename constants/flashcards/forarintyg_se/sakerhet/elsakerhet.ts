import type { FlashCard } from "../../types";

export const sakerhetElsakerhet: FlashCard[] = [
  {
    id: "sakerhet_elsakerhet-1",
    question:
      "Vilken ända av landströmskabeln ska anslutas först?",
    questionQuiz:
      "När du ansluter landström – vilken ände kopplar du i först?",
    answer:
      "Den i båten.",
    options: [
      "Den i elstolpen.",
      "Den i båten.",
      "Det spelar ingen roll.",
      "Den med längst kabel.",
    ],
    correctOptionIndex: 1,
    textTitle: "Anslutning av landströmskabel",
textInfo: "Landströmskabeln ska alltid anslutas i båten först och därefter i uttaget på kajen. På så sätt minskar risken för att kabeln är strömförande om den skulle hamna i vattnet."
  },
  {
    id: "sakerhet_elsakerhet-2",
    question:
      "Hur tvättar man av sina batterier i båten?",
    questionQuiz:
      "Hur rengör man batterier på ett säkert sätt?",
    answer:
      "Med en lätt fuktad trasa.",
    options: [
      "Spola med rikligt vatten.",
      "Med en lätt fuktad trasa.",
      "Med bensin.",
      "Med högtryckstvätt.",
    ],
    correctOptionIndex: 1,
    textTitle: "Rengöring av batterier",
textInfo: "Batterier rengörs med en lätt fuktad trasa, gärna med lite diskmedel. Det förhindrar att smuts och fett samlas och minskar risken för brand eller elektriska problem."
  },
  {
    id: "sakerhet_elsakerhet-3",
    question:
      "Ska man ha en säkring mellan batteribanken och elcentralen?",
    questionQuiz:
      "Behövs en huvudsäkring mellan batteribank och elcentral?",
    answer:
      "Ja. Det är huvudsäkringen och den är mycket viktig.",
    options: [
      "Nej, det behövs inte.",
      "Ja, en huvudsäkring är nödvändig.",
      "Endast vid stora båtar.",
      "Endast vid 230V-system.",
    ],
    correctOptionIndex: 1,
    textTitle: "Säkring i elsystemet",
textInfo: "Det ska alltid finnas en säkring mellan batteribanken och elcentralen. Den fungerar som en huvudsäkring och skyddar systemet från skador vid fel eller kortslutning."
  },
  {
    id: "sakerhet_elsakerhet-4",
    question:
      "Vad är det första man ska misstänka om jordfelsbrytaren på bryggan löser ut?",
    questionQuiz:
      "Om jordfelsbrytaren löser ut när båten ansluts – vad är mest sannolikt?",
    answer:
      "Fukt i kontakter eller skador på kabeln.",
    options: [
      "Fel i elstolpen.",
      "Fukt i kontakter eller skadad kabel.",
      "För hög batterispänning.",
      "För låg säkring i båten.",
    ],
    correctOptionIndex: 1,
    textTitle: "Jordfelsbrytare löser ut",
textInfo: "Om jordfelsbrytaren löser ut bör man misstänka fukt i kontakter eller skarvar, eller skador på landströmskabeln. Detta kan orsaka jordfel och måste åtgärdas innan fortsatt användning."
  },
  {
    id: "sakerhet_elsakerhet-5",
    question:
      "Om det luktar 'ruttna ägg' i båten – vad ska du misstänka och göra?",
    questionQuiz:
      "Vad innebär lukt av 'ruttna ägg' i båten och hur bör du agera?",
    answer:
      "Misstänk knallgas, undvik gnistor, stoppa laddning och vädra.",
    options: [
      "Starta motorn direkt.",
      "Ignorera lukten.",
      "Misstänk knallgas, undvik gnistor och vädra.",
      "Tända en lampa för att se bättre.",
    ],
    correctOptionIndex: 2,
    textTitle: "Lukt av ruttna ägg",
textInfo: "Om det luktar ruttna ägg i båten tyder det på att batteriet avger vätgas (knallgas), vilket är explosivt. Man ska omedelbart stoppa laddningen, undvika gnistor, kontrollera batteriet och vädra ordentligt."
  },
];
