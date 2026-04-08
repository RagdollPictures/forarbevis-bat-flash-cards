import type { FlashCard } from "../../types";

export const manovreringInledning: FlashCard[] = [
  {
    id: "manovrering_inledning-1",
    question:
      "Du drar rorkulten mot styrbord. Åt vilket håll girar båten?",
    questionQuiz:
      "När du för rorkulten åt höger – vilket håll svänger båten då?",
    answer: "Babord.",
    options: [
      "Styrbord.",
      "Babord.",
      "Rakt fram.",
      "Aktern svänger men fören ligger kvar.",
    ],
    correctOptionIndex: 1,
     textTitle: "Rorkult och styrning",
  textInfo: "När du styr med rorkult sker styrningen tvärtom mot hur båten svänger. För du rorkulten åt styrbord kommer båten att gira åt babord."
  },
  {
    id: "manovrering_inledning-2",
    question:
      "Du vrider ratten mot styrbord. Åt vilket håll girar båten?",
    questionQuiz:
      "Om du vrider ratten åt höger – åt vilket håll svänger båten?",
    answer: "Styrbord.",
    options: [
      "Babord.",
      "Styrbord.",
      "Aktern åt styrbord.",
      "Båten svänger inte.",
    ],
    correctOptionIndex: 1,
    textTitle: "Ratt och styrning",
  textInfo: "När du styr med ratt fungerar det som i en bil. Vrider du ratten åt styrbord så girar båten åt styrbord."
  },
  {
    id: "manovrering_inledning-3",
    question:
      "Beskriv kort vad propellerverkan gör med en båt?",
    questionQuiz:
      "Hur påverkas båtens akter av propellerverkan vid manövrering?",
    answer:
      "Den knuffar båtens akter åt ena eller andra hållet beroende på åt vilket håll propellern roterar.",
    options: [
      "Den trycker ner fören i vattnet.",
      "Den knuffar aktern i sidled beroende på propellerns rotationsriktning.",
      "Den får båten att alltid svänga åt styrbord.",
      "Den påverkar bara farten, inte riktningen.",
    ],
    correctOptionIndex: 1,
     textTitle: "Propellerverkan",
  textInfo: "Propellerverkan är en sidokraft som uppstår när propellern roterar. Den gör att aktern trycks åt ena sidan, vilket påverkar båtens riktning – särskilt vid låg fart och vid back."
  },
  {
    id: "manovrering_inledning-4",
    question:
      "Är en propeller som roterar åt höger (sedd akterifrån) då den driver framåt höger- eller vänstergängad?",
    questionQuiz:
      "Om propellern snurrar medurs sett akterifrån när du kör framåt – vilken typ av gängning har den?",
    answer: "Höger.",
    options: [
      "Vänster.",
      "Neutral.",
      "Höger.",
      "Dubbelgängad.",
    ],
    correctOptionIndex: 2,
     textTitle: "Högergängad propeller",
  textInfo: "En propeller som roterar åt höger (sett akterifrån) när båten kör framåt kallas högergängad propeller."

  },
  {
    id: "manovrering_inledning-5",
    question:
      "Åt vilket håll knuffas aktern med en högergängad propeller då man backar?",
    questionQuiz:
      "När du backar med en högergängad propeller – åt vilket håll påverkas aktern?",
    answer: "Åt vänster (babord).",
    options: [
      "Åt höger (styrbord).",
      "Åt vänster (babord).",
      "Rakt bakåt utan sidoförflyttning.",
      "Åt fören.",
    ],
    correctOptionIndex: 1,
    textTitle: "Propellerverkan vid back",
  textInfo: "Med en högergängad propeller kommer aktern att tryckas åt vänster (babord) när man backar. Detta är tydligast när båten rör sig långsamt."
  },
  {
    id: "manovrering_inledning-6",
    question:
      "Åt vilket håll förs aktern då du svänger åt styrbord (höger)?",
    questionQuiz:
      "När båten svänger åt höger – åt vilket håll rör sig aktern?",
    answer: "Åt babord (vänster).",
    options: [
      "Åt styrbord.",
      "Åt babord.",
      "Rakt bakåt.",
      "Den rör sig inte i sidled.",
    ],
    correctOptionIndex: 1,
     textTitle: "Aktern vid gir",
     textInfo: "När båten svänger åt styrbord är det egentligen aktern som trycks åt babord. Det är denna rörelse som gör att fören pekar åt höger."
  },
];
