import type { FlashCard } from "../../types";

export const farledsnavigation: FlashCard[] = [
  {
    id: "farledsnavigation-1",
    question:
      "Vad heter de röda- och gröna sjömärkena som används för att markera sidorna på en farled?",
    questionQuiz:
      "Vad kallas de röda och gröna prickar som markerar farledens sidor?",
    answer: "Lateralmärken.",
    options: [
      "Kardinalmärken.",
      "Lateralmärken.",
      "Specialmärken.",
      "Mittledsmärken.",
    ],
    correctOptionIndex: 1,
     textTitle: "Lateralmärken",
  textInfo: "De röda och gröna sjömärken som markerar sidorna på en farled kallas lateralmärken. De visar var det är säkert att färdas i förhållande till farledens riktning."

  },
  {
    id: "farledsnavigation-2",
    question:
      "Du kör mot denna enslinje. Vilket håll ska du gira (svänga) för att komma rakt på enslinjen?",
    questionQuiz:
      "Om du ligger fel i förhållande till denna enslinje – åt vilket håll ska du styra för att hamna rätt?",
    answer: "Vänster/babord.",
    options: [
      "Höger/styrbord.",
      "Vänster/babord.",
      "Rakt fram.",
      "Backa.",
    ],
    correctOptionIndex: 1,
    imageKey: "farledsnavigation_02",
       textTitle: "Enslinje och kurskorrigering",
  textInfo: "Om man ligger fel i sidled mot en enslinje måste man styra mot linjen för att komma rätt. Genom att justera kursen tills objekten ligger i linje hamnar man på rätt färdväg."
  },
  {
    id: "farledsnavigation-3",
    question:
      "Hur ser symbolen ut som visar farledens riktning?",
    questionQuiz:
      "Hur markeras farledens riktning i ett sjökort?",
    answer:
      "En pil med en grön prick på styrbord sida och röd prick på babord sida.",
    options: [
      "En pil med grön prick styrbord och röd babord.",
      "En blå linje utan markering.",
      "En cirkel med röd ram.",
      "Ett ankarsymbol.",
    ],
    correctOptionIndex: 0,
      textTitle: "Farledens riktning i sjökort",
  textInfo: "Farledens riktning visas med en pil i sjökortet. Pilen har en grön prick på styrbord sida och en röd prick på babord sida och pekar i färdriktningen."
  },
  {
    id: "farledsnavigation-4",
    question:
      "Då du färdas i en farleds riktning, på vilken sida ska du då ha de röda lateralmärkena?",
    questionQuiz:
      "När du går i farledens huvudriktning – var ska de röda prickarna ligga?",
    answer: "Babord.",
    options: [
      "Styrbord.",
      "Babord.",
      "Mitt i farleden.",
      "Det spelar ingen roll.",
    ],
    correctOptionIndex: 1,
         textTitle: "Lateralmärken i farledens riktning",
  textInfo: "När man färdas i farledens riktning ska de röda lateralmärkena vara på babord sida och de gröna på styrbord sida."
  },
  {
    id: "farledsnavigation-5",
    question:
      "Du färdas i Kalmarsund på väg norrut. I vilken riktning går farleden?",
    questionQuiz:
      "I Kalmarsund – vilken är farledens huvudriktning enligt huvudregeln?",
    answer:
      "Norrut.",
    options: [
      "Söderut.",
      "Österut.",
      "Västerut.",
      "Norrut.",
    ],
    correctOptionIndex: 3,
      textTitle: "Farledens huvudriktning i Sverige",
  textInfo: "Huvudregeln i Sverige är att farleder går från Strömstad till Haparanda, vilket innebär att de i regel går i nordlig riktning."
    
  },
  {
    id: "farledsnavigation-6",
    question:
      "Om du färdas mot farledens riktning och ser rött till höger och grönt till vänster – hur ska du passera?",
    questionQuiz:
      "Du går mot farledens riktning och har rött styrbord och grönt babord – hur passerar du?",
    answer:
      "Mellan dem.",
    options: [
      "Till höger om båda.",
      "Till vänster om båda.",
      "Mellan dem.",
      "Vända om.",
    ],
    correctOptionIndex: 2,
      textTitle: "Passage mot farledens riktning",
  textInfo: "När man färdas mot farledens riktning passerar man fortfarande mellan märkena. Färgerna blir då omvända, men de markerar fortfarande farledens gränser."
  },
];
