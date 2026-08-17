import type { FlashCard } from "../../types";

export const manovreringBatMedRoder: FlashCard[] = [
  {
    id: "manovrering_bat_med_roder-1",
    question:
      "Åt vilket håll vänder/roterar man enklast en båt som har en högergängad propeller?",
    questionQuiz:
      "Vilket håll svänger en båt lättast åt om den har högergående (högergängad) propeller?",
    answer:
      "Åt styrbord (höger, medurs).",
    options: [
      "Åt babord (vänster, moturs).",
      "Åt styrbord (höger, medurs).",
      "Det spelar ingen roll – det är lika lätt åt båda håll.",
      "Rakt fram – den vill inte rotera.",
    ],
    correctOptionIndex: 1,
     textTitle: "Vända med högergängad propeller",
  textInfo: "En båt med högergängad propeller vrider aktern åt babord när man backar. Genom att kombinera back och framåtväxel med rodret lagt åt styrbord kan man effektivt rotera båten medurs (åt höger), vilket gör det lättast att vända i trånga utrymmen."
  },
  {
    id: "manovrering_bat_med_roder-2",
    question:
      "Din långkölade segelbåt går bara att styra åt ett håll när du backar. Varför och hur kommer du undan det?",
    questionQuiz:
      "Varför styr en långkölad segelbåt ofta bara åt ett håll vid backning, och hur kan du minska den effekten?",
    answer:
      "Propellerverkan gör att den bara går att svänga åt ett håll. Skapa lite fart och lägg i friläge så propellern står still. Då finns ingen propellerverkan och båten kan styras åt båda hållen.",
    options: [
      "Kölens form gör att rodret inte fungerar alls vid backning; lösningen är att alltid backa med fullt gaspådrag.",
      "Propellerverkan gör att den bara går att svänga åt ett håll. Skapa lite fart och lägg i friläge så propellern står still. Då finns ingen propellerverkan och båten kan styras åt båda hållen.",
      "Vindpåverkan gör att båten alltid drar åt ett håll; lösningen är att ha segel uppe när du backar.",
      "Strömmen är alltid orsaken; lösningen är att backa enbart i medström.",
    ],
    correctOptionIndex: 1,
     textTitle: "Backa och propellerverkan",
     textInfo: "När man backar är propellerverkan mycket stark och gör att båten gärna svänger åt ett håll. För att kunna styra åt båda håll behöver man först få upp lite fart bakåt och sedan lägga i friläge. Då försvinner propellerverkan och rodret kan användas för att styra båten."
  },
];
