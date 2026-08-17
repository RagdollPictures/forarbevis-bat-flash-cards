import type { FlashCard } from "../../types";

export const signaleringLjudsignaler: FlashCard[] = [
  {
    id: "signalering_ljudsignaler-1",
    question:
      "Hur långt ska en kort ljudsignal vara?",
    questionQuiz:
      "Hur lång är en kort signal enligt sjövägsreglerna?",
    answer:
      "Cirka 1 sekund.",
    options: [
      "Cirka 1 sekund.",
      "Cirka 3 sekunder.",
      "Mellan 4–6 sekunder.",
      "10 sekunder.",
    ],
    correctOptionIndex: 0,
    textTitle: "Kort ljudsignal",
textInfo: "En kort ljudsignal ska vara ungefär 1 sekund lång och används för att signalera olika manövrar, till exempel kursändringar."
  },
  {
    id: "signalering_ljudsignaler-2",
    question:
      "Hur lång ska en lång ljudsignal vara?",
    questionQuiz:
      "Hur lång är en lång signal enligt regelverket?",
    answer:
      "Mellan 4 och 6 sekunder.",
    options: [
      "1 sekund.",
      "2 sekunder.",
      "Mellan 4 och 6 sekunder.",
      "10 sekunder.",
    ],
    correctOptionIndex: 2,
    textTitle: "Lång ljudsignal",
textInfo: "En lång ljudsignal ska vara mellan 4 och 6 sekunder lång. Den används bland annat för uppmärksamhet och i dimma för att visa hur ett fartyg rör sig."
  },
  {
    id: "signalering_ljudsignaler-3",
    question:
      'Vad är ljudsignalen för "min propeller arbetar back"?',
    questionQuiz:
      "Vilken signal betyder att ett fartyg backar?",
    answer:
      "Tre korta signaler.",
    options: [
      "En kort signal.",
      "Två korta signaler.",
      "Tre korta signaler.",
      "Fem korta signaler.",
    ],
    correctOptionIndex: 2,
    textTitle: "Backsignal",
textInfo: "Tre korta ljudsignaler (. . .) betyder att propellern arbetar för back. Det innebär inte alltid att båten rör sig bakåt, utan att propellern driver i backläge."
  },
  {
    id: "signalering_ljudsignaler-4",
    question:
      'Vad är ljudsignalen för "jag ändrar min kurs åt styrbord"?',
    questionQuiz:
      "Vilken signal visar kursändring åt styrbord?",
    answer:
      "En kort signal.",
    options: [
      "En kort signal.",
      "Två korta signaler.",
      "Tre korta signaler.",
      "En lång signal.",
    ],
    correctOptionIndex: 0,
    textTitle: "Kursändring styrbord",
textInfo: "En kort ljudsignal (.) betyder att fartyget ändrar sin kurs åt styrbord, alltså åt höger sett i färdriktningen."
  },
  {
    id: "signalering_ljudsignaler-5",
    question:
      "Ett fartyg du möter tutar två korta signaler. Vad betyder det?",
    questionQuiz:
      "Två korta signaler från mötande fartyg betyder?",
    answer:
      "Att fartyget ändrar kurs åt babord.",
    options: [
      "Att det backar.",
      "Att det ändrar kurs åt styrbord.",
      "Att det ändrar kurs åt babord.",
      "Att det är i fara.",
    ],
    correctOptionIndex: 2,
    textTitle: "Kursändring babord",
textInfo: "Två korta ljudsignaler (. .) betyder att fartyget ändrar sin kurs åt babord, alltså åt vänster."
  },
  {
    id: "signalering_ljudsignaler-6",
    question:
      "Du hör fem korta signaler. Vad betyder det?",
    questionQuiz:
      "Vad innebär fem korta ljudsignaler?",
    answer:
      "Tveksamhetssignal – situationen uppfattas som farlig.",
    options: [
      "Backmanöver.",
      "Tveksamhetssignal – fara.",
      "Ankarläge.",
      "Dimmesignal.",
    ],
    correctOptionIndex: 1,
    textTitle: "Tveksamhetssignal",
textInfo: "Minst fem korta ljudsignaler (. . . . .) är en tveksamhetssignal. Den används när man är osäker på ett annat fartygs avsikter eller om man tror att man inte blivit uppmärksammad."
  },
  {
    id: "signalering_ljudsignaler-7",
    question:
      "Du hör en lång signal i en slingrig kanal utan att se fartyg. Vad betyder det?",
    questionQuiz:
      "Vad betyder en lång signal i smal farled vid krök?",
    answer:
      "Fartyg finns bakom krök eller risk för möte.",
    options: [
      "Någon backar.",
      "Fartyg finns bakom krök eller risk för möte.",
      "Ankarläge.",
      "Tveksamhetssignal.",
    ],
    correctOptionIndex: 1,
    textTitle: "Uppmärksamhetssignal",
textInfo: "En lång ljudsignal (_) används som uppmärksamhetssignal, till exempel vid skymd sikt eller i en farledskrök för att varna andra fartyg."
  },
  {
    id: "signalering_ljudsignaler-8",
    question:
      "I dimma hör du två långa signaler varannan minut. Vad närmar du dig?",
    questionQuiz:
      "Två långa signaler varannan minut i dimma betyder?",
    answer:
      "Ett fartyg som ligger stilla eller för ankare.",
    options: [
      "Ett fartyg under gång.",
      "Ett fartyg som backar.",
      "Ett fartyg som ligger stilla eller för ankare.",
      "En linfärja.",
    ],
    correctOptionIndex: 2,
    textTitle: "Mistsignaler",
textInfo: "I dimma används särskilda mistsignaler. Två långa signaler (_ _) varannan minut betyder att ett fartyg ligger stilla eller för ankare, medan en lång signal (_) betyder att ett fartyg gör fart genom vattnet."
  },
];
