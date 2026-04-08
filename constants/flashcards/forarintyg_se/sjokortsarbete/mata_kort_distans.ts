import type { FlashCard } from "../../types";

export const mataKortDistans: FlashCard[] = [
  {
    id: "mata_kort_distans-1",
    question: "Hur långt är det från fyren Hätteberget till Markering B?",
    questionQuiz:
      "Vilken distans mäter du mellan Hätteberget och Markering B i sjökortet?",
    answer: "1,6 M.",
    imageKey: "mata_kort_distans_01_ver02",
    options: [
      "1,2 M.",
      "1,6 M.",
      "2,0 M.", 
      "2,4 M.",
    ],
    correctOptionIndex: 1,
    textTitle: "Hur mäter man distans i sjökort?",
    textInfo: "För att mäta en distans i sjökortet använder man en passare. Man placerar ena spetsen på startpunkten och den andra på slutpunkten så att avståndet mellan spetsarna motsvarar sträckan. Därefter flyttar man passaren till latitudskalan på sidan av sjökortet och placerar spetsarna mot skalan. Där läser man av distansen i distansminuter (M). Latitudskalan används eftersom en minut där alltid motsvarar en distansminut (1852 meter), vilket ger ett korrekt avstånd oavsett var på kartan man mäter."

  },
  {
    id: "mata_kort_distans-2",
    question: "Hur långt är det mellan Markering A och Markering B?",
    answer: "2,4 M.",
     imageKey: "mata_kort_distans_01_ver02",
    options: [
      "1,6 M.",
      "2,4 M.",
      "3,1 M.",
      "0,9 M.",
    ],
    correctOptionIndex: 1,
    textTitle: "",
    textInfo: "",
    
  },
  {
    id: "mata_kort_distans-3",
    question:
      "Hur långt är det mellan fyren Stora Pölsan och Markering C?",
    questionQuiz:
      "Vilken ungefärlig distans är det från Stora Pölsan till Markering C?",
    answer: "~2,1 M.",
    options: [
      "1,4 M.",
      "~2,1 M.",
      "2,8 M.",
      "0,8 M.",
    ],
    correctOptionIndex: 1,
  textTitle: "",
    textInfo: "",
    
  },
  {
    id: "mata_kort_distans-4",
    question:
      "Hur långt är det mellan fyren Skallen (på Marstrandsön) och västkardinalmärket lite norrut?",
    questionQuiz:
      "Vilken distans är det mellan fyren Skallen och västkardinalmärket norrut?",
    answer: "0,95 M.",
    options: [
      "0,5 M.",
      "0,95 M.",
      "1,6 M.",
      "2,0 M.",
    ],
    correctOptionIndex: 1,
  textTitle: "",
    textInfo: "",
    
  },
  {
    id: "mata_kort_distans-5",
    question:
      "Hur långt från närmaste land ligger babordsmärket inne i Marstrands hamn?",
    questionQuiz:
      "Ungefär hur långt från land ligger babordsmärket i Marstrands hamn?",
    answer: "~95 meter.",
    options: [
      "~50 meter.",
      "~95 meter.",
      "~200 meter.",
      "~400 meter.",
    ],
    correctOptionIndex: 1,
  textTitle: "",
    textInfo: "",
    
  },
];
