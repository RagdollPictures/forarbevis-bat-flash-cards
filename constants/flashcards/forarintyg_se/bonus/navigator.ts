import type { FlashCard } from "../../types";

export const bonusNavigator: FlashCard[] = [
  {
    id: "bonus_navigator-1",
    question: "",
    questionQuiz:
      "I navigatorn visar HDG 038°, COG 045° och BRG 050°. Vilket påstående stämmer bäst?",
    answer:
      "Båten pekar ungefär 038°, går faktiskt ungefär 045° över grund, och waypointen ligger ungefär i riktning 050° från båten.",
    options: [
      "Båten pekar ungefär 038°, går faktiskt ungefär 045° över grund, och waypointen ligger ungefär i riktning 050° från båten.",
      "Båten går exakt dit fören pekar och BRG visar farten i knop.",
      "HDG visar avstånd till waypointen, COG visar bäring och BRG visar rutten.",
      "COG och BRG betyder samma sak och visar alltid samma värde.",
    ],
    correctOptionIndex: 0,
    textTitle: "HDG, COG och BRG",
    textInfo:
      "HDG är båtens heading, alltså vart fören pekar. COG är kurs över grund, alltså vart båten faktiskt rör sig. BRG är riktningen från båten till waypointen just nu.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-2",
    question: "",
    questionQuiz:
      "I navigatorn visar COG 045° och BRG 050°. Vad behöver justeras för att båten ska gå mer direkt mot waypointen?",
    answer:
      "Du behöver justera HDG så att COG kommer närmare BRG.",
    options: [
      "Du behöver justera XTE tills HDG automatiskt blir rätt.",
      "Du behöver justera HDG så att COG kommer närmare BRG.",
      "Du behöver bara öka SOG, då blir riktningen rätt av sig själv.",
      "Du behöver minska DST, då försvinner avvikelsen.",
    ],
    correctOptionIndex: 1,
    textTitle: "Justera HDG",
    textInfo:
      "Man kan inte styra COG direkt. Det man styr är HDG.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-3",
    question: "",
    questionQuiz:
      "I navigatorn visar XTE 0,05. Vad betyder XTE?",
    answer:
      "XTE visar båtens avstånd i sidled från rutten.",
    options: [
      "Avstånd till waypointen.",
      "Fart i knop.",
      "Sidofel från rutten.",
      "Tid till waypoint.",
    ],
    correctOptionIndex: 2,
    textTitle: "XTE",
    textInfo:
      "XTE visar hur långt du ligger vid sidan av rutten.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-4",
    question: "",
    questionQuiz:
      "I navigatorn visar SOG 10,0. Vad betyder det?",
    answer:
      "Båten går 10 knop över grund.",
    options: [
      "10° kurs.",
      "10 knop över grund.",
      "10 Nm kvar.",
      "10 min kvar.",
    ],
    correctOptionIndex: 1,
    textTitle: "SOG",
    textInfo:
      "SOG är verklig fart över grund.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-5",
    question: "",
    questionQuiz:
      "I navigatorn visar DST 1,50. Vad betyder det?",
    answer:
      "1,50 sjömil kvar.",
    options: [
      "1,50 minuter kvar.",
      "1,50 sjömil kvar.",
      "1,50 knop.",
      "1,50 i sidofel.",
    ],
    correctOptionIndex: 1,
    textTitle: "DST",
    textInfo:
      "DST visar kvarvarande distans.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-6",
    question: "",
    questionQuiz:
      "I navigatorn visar TTG 0:09. Vad betyder det?",
    answer:
      "9 minuter kvar.",
    options: [
      "9 knop.",
      "9 sjömil.",
      "9 minuter kvar.",
      "9° kurs.",
    ],
    correctOptionIndex: 2,
    textTitle: "TTG",
    textInfo:
      "TTG är tid kvar till waypoint.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-7",
    question: "",
    questionQuiz:
      "Om HDG och COG inte är samma, vad beror det oftast på?",
    answer:
      "Vind eller ström påverkar båten.",
    options: [
      "Fel på plottern.",
      "Vind eller ström.",
      "Fel waypoint.",
      "För hög fart.",
    ],
    correctOptionIndex: 1,
    textTitle: "HDG och COG",
    textInfo:
      "Om HDG och COG skiljer sig åt betyder det ofta att båten påverkas av yttre faktorer som vind eller ström.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-8",
    question: "",
    questionQuiz:
      "Vad visar BRG i navigatorn?",
    answer:
      "Riktning till waypoint.",
    options: [
      "Riktning till waypoint.",
      "Fart.",
      "Tid.",
      "Sidofel.",
    ],
    correctOptionIndex: 0,
    textTitle: "BRG",
    textInfo:
      "BRG visar riktningen från båten till waypointen just nu.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-9",
    question: "",
    questionQuiz:
      "Vilket värde i navigatorn visar hur snett du ligger i förhållande till rutten?",
    answer:
      "XTE.",
    options: ["COG", "BRG", "XTE", "HDG"],
    correctOptionIndex: 2,
    textTitle: "Sidofel",
    textInfo:
      "XTE är sidofelet från rutten.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-10",
    question: "",
    questionQuiz:
      "I navigatorn visar HDG 090° och COG 105°. Vad betyder det?",
    answer:
      "Båten driver åt höger.",
    options: [
      "Båten driver åt vänster.",
      "Båten driver åt höger.",
      "Båten står stilla.",
      "Det är ingen skillnad.",
    ],
    correctOptionIndex: 1,
    textTitle: "Avdrift",
    textInfo:
      "Om COG är högre än HDG i detta fall betyder det att båten faktiskt går mer åt höger än dit fören pekar.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-11",
    question: "",
    questionQuiz:
      "Om XTE visar att du ligger styrbord om rutten, åt vilket håll ska du styra?",
    answer:
      "Babord.",
    options: ["Styrbord", "Babord", "Rakt fram", "Stanna"],
    correctOptionIndex: 1,
    textTitle: "Korrigera mot rutten",
    textInfo:
      "Ligger du styrbord om rutten ska du styra babord för att komma tillbaka.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-12",
    question: "",
    questionQuiz:
      "Om XTE visar att du ligger babord om rutten, åt vilket håll ska du styra?",
    answer:
      "Styrbord.",
    options: ["Babord", "Styrbord", "Stanna", "Öka farten"],
    correctOptionIndex: 1,
    textTitle: "Styr tillbaka",
    textInfo:
      "Ligger du babord om rutten ska du styra styrbord för att komma tillbaka mot rutten.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-13",
    question: "",
    questionQuiz:
      "Vilket värde i navigatorn visar hur lång tid det är kvar till waypointen?",
    answer:
      "TTG.",
    options: ["DST", "TTG", "COG", "BRG"],
    correctOptionIndex: 1,
    textTitle: "Tid kvar",
    textInfo:
      "TTG betyder Time To Go och visar återstående tid till waypointen.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-14",
    question: "",
    questionQuiz:
      "Vilket värde i navigatorn visar hur långt det är kvar till waypointen?",
    answer:
      "DST.",
    options: ["TTG", "DST", "SOG", "HDG"],
    correctOptionIndex: 1,
    textTitle: "Distans kvar",
    textInfo:
      "DST betyder Distance och visar återstående distans till waypointen.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
  {
    id: "bonus_navigator-15",
    question: "",
    questionQuiz:
      "Vad visar HDG i navigatorn?",
    answer:
      "Vart fören pekar.",
    options: [
      "Fart.",
      "Tid.",
      "Vart fören pekar.",
      "Avstånd.",
    ],
    correctOptionIndex: 2,
    textTitle: "HDG",
    textInfo:
      "HDG är båtens heading, alltså den riktning fören pekar i.\n\n \nHDG → vart fören pekar\nCOG → vart du faktiskt går\nSOG → hur fort du faktiskt går\nBRG → riktning till mål\nXTE → hur snett du ligger\nDST → hur långt kvar\nTTG → hur lång tid kvar",
  },
];