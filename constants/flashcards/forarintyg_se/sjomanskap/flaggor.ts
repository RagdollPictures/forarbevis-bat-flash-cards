import type { FlashCard } from "../../types";

export const sjomanskapFlaggor: FlashCard[] = [
  {
    id: "sjomanskap_flaggor-1",
    question:
      "Ni är svenskar och har lånat en båt i Danmark från en dansk bekant för några veckors semester. Vilken nationsflagga ska ni hissa på båten?",
    questionQuiz:
      "Vilken nationsflagga ska föras om ni lånar en danskregistrerad båt i Danmark?",
    answer:
      "Dansk flagga, eftersom ägaren av båten är dansk.",
    options: [
      "Svensk flagga eftersom besättningen är svensk.",
      "Ingen flagga behövs eftersom det är en lånebåt.",
      "Dansk flagga eftersom båtens ägare är dansk.",
      "Både svensk och dansk flagga samtidigt.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "sjomanskap_flaggor-2",
    question:
      "På vilken sida av masten eller signalmasten ska man hissa gästflaggan när man färdas i ett annat land?",
    questionQuiz:
      "Var hissas gästflaggan när du besöker ett annat land med din båt?",
    answer:
      "På styrbord sida.",
    options: [
      "På babord sida.",
      "I aktern under nationsflaggan.",
      "På styrbord sida.",
      "I fören.",
    ],
    correctOptionIndex: 2,
  },
];
