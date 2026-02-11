import type { FlashCard } from "../../types";

export const miljoAllemansratten: FlashCard[] = [
  {
    id: "miljo_allemansratten-1",
    question:
      "Ger allemansrätten tillåtelse att förtöja vid en privatägd brygga en natt om bryggan inte ligger nära ett bostadshus?",
    questionQuiz:
      "Får du enligt allemansrätten lägga till en natt vid en privat brygga som inte ligger i direkt anslutning till bostadshus?",
    answer: "Ja.",
    options: [
      "Ja.",
      "Nej, aldrig vid privat brygga.",
      "Endast med markägarens skriftliga tillstånd.",
      "Endast dagtid.",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "miljo_allemansratten-2",
    question:
      "Gäller allemansrätten även på vattnet?",
    questionQuiz:
      "Omfattar allemansrätten även färd och vistelse på vatten?",
    answer: "Ja.",
    options: [
      "Nej, den gäller bara på land.",
      "Ja.",
      "Endast i insjöar.",
      "Endast i skärgården.",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "miljo_allemansratten-3",
    question:
      "Får man störa en fastighetsägare inom ramen för allemansrätten?",
    questionQuiz:
      "Är det tillåtet att orsaka störningar för markägare när du utnyttjar allemansrätten?",
    answer: "Nej.",
    options: [
      "Ja, om det bara är tillfälligt.",
      "Ja, om man är på vatten.",
      "Nej.",
      "Ja, om man inte skadar något.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "miljo_allemansratten-4",
    question:
      "Gäller allemansrätten även i nationalparker och naturreservat?",
    questionQuiz:
      "Hur fungerar allemansrätten inom nationalparker och naturreservat?",
    answer:
      "Ja, men allemansrätten kan vara begränsad.",
    options: [
      "Nej, den gäller aldrig där.",
      "Ja, utan några undantag.",
      "Ja, men det kan finnas särskilda begränsningar.",
      "Endast i naturreservat, inte i nationalparker.",
    ],
    correctOptionIndex: 2,
  },
  {
    id: "miljo_allemansratten-5",
    question:
      "Vad gäller för att flytta en båt från en sjö där kräftsmitta finns?",
    questionQuiz:
      "Vilken åtgärd krävs innan du flyttar en båt från vatten med konstaterad kräftsmitta?",
    answer:
      "Båten måste tvättas noga innan den flyttas därifrån.",
    options: [
      "Ingenting, det är fritt att flytta båten.",
      "Båten måste tvättas noggrant innan den flyttas.",
      "Endast motorn behöver rengöras.",
      "Båten måste stå torr i minst en vecka.",
    ],
    correctOptionIndex: 1,
  },
];
