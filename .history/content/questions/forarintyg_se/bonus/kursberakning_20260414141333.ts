import type { FlashCard } from "../../types";

export const bonusKursberakning: FlashCard[] = [
  {
    id: "bonus_kursberakning-1",
    question: "",
    questionQuiz:
      "Missvisningen är 5°E. Vad är magnetisk kurs om rättvisande kurs är 090°?",
    answer: "085°",
    options: ["095°", "090°", "085°", "080°"],
    correctOptionIndex: 2,
    textTitle: "Missvisning öst",
    textInfo:
      "Vid missvisning öst drar man bort från rättvisande kurs.\n090° − 5° = 085°.\n\nMinnesregel:\nÖst = minus\nVäst = plus",
  },
  {
    id: "bonus_kursberakning-2",
    question: "",
    questionQuiz:
      "Missvisningen är 4°W. Vad är magnetisk kurs om rättvisande kurs är 100°?",
    answer: "104°",
    options: ["096°", "100°", "104°", "108°"],
    correctOptionIndex: 2,
    textTitle: "Missvisning väst",
    textInfo:
      "Vid väst lägger man till.\n100° + 4° = 104°.\n\nMinnesregel:\nÖst = minus\nVäst = plus",
  },
  {
    id: "bonus_kursberakning-3",
    question: "",
    questionQuiz:
      "Deviation är 3°E. Vad blir kompasskursen om magnetisk kurs är 090°?",
    answer: "087°",
    options: ["093°", "090°", "087°", "084°"],
    correctOptionIndex: 2,
    textTitle: "Deviation öst",
    textInfo:
      "Deviation fungerar som missvisning.\nÖst = minus.\n090° − 3° = 087°.",
  },
  {
    id: "bonus_kursberakning-4",
    question: "",
    questionQuiz:
      "Deviation är 2°W. Vad blir kompasskursen om magnetisk kurs är 120°?",
    answer: "122°",
    options: ["118°", "120°", "122°", "124°"],
    correctOptionIndex: 2,
    textTitle: "Deviation väst",
    textInfo:
      "Väst = plus.\n120° + 2° = 122°.",
  },
  {
    id: "bonus_kursberakning-5",
    question: "",
    questionQuiz:
      "Missvisning 5°E och deviation 2°W. Hur stort är det totala felet?",
    answer: "3°E",
    options: ["7°E", "3°W", "3°E", "7°W"],
    correctOptionIndex: 2,
    textTitle: "Totalt fel",
    textInfo:
      "5°E − 2°W = 3°E.\nMan räknar ihop med tecken.\n\nÖst = minus\nVäst = plus",
  },
  {
    id: "bonus_kursberakning-6",
    question: "",
    questionQuiz:
      "Du vill gå 090° rättvisande. Missvisning är 4°E. Vilken magnetisk kurs ska du hålla?",
    answer: "086°",
    options: ["094°", "090°", "086°", "082°"],
    correctOptionIndex: 2,
    textTitle: "RV → MV",
    textInfo:
      "Öst dras bort.\n090° − 4° = 086°.",
  },
  {
    id: "bonus_kursberakning-7",
    question: "",
    questionQuiz:
      "Du vill gå 180° rättvisande. Missvisning 4°E och deviation 2°E. Vilken kompasskurs?",
    answer: "174°",
    options: ["186°", "180°", "174°", "176°"],
    correctOptionIndex: 2,
    textTitle: "RV → KK",
    textInfo:
      "Totalt fel: 4°E + 2°E = 6°E.\n180° − 6° = 174°.",
  },
  {
    id: "bonus_kursberakning-8",
    question: "",
    questionQuiz:
      "Du styr 090°. Avdriften är 10° styrbord. Vilken COG får du?",
    answer: "100°",
    options: ["080°", "090°", "100°", "110°"],
    correctOptionIndex: 2,
    textTitle: "Avdrift",
    textInfo:
      "Styrbord = höger.\nDu driver åt höger.\n090° + 10° = 100°.",
  },
  {
    id: "bonus_kursberakning-9",
    question: "",
    questionQuiz:
      "Du vill få COG 090°. Avdriften är 10° styrbord. Vad ska du styra?",
    answer: "080°",
    options: ["100°", "090°", "080°", "070°"],
    correctOptionIndex: 2,
    textTitle: "Kompensera avdrift",
    textInfo:
      "Du driver höger → styr vänster.\n090° − 10° = 080°.",
  },
  {
    id: "bonus_kursberakning-10",
    question: "",
    questionQuiz:
      "Ström sätter dig 15° åt babord. Du vill gå 120°. Vad ska du styra?",
    answer: "135°",
    options: ["105°", "120°", "135°", "140°"],
    correctOptionIndex: 2,
    textTitle: "Ström",
    textInfo:
      "Ström vänster → styr höger.\n120° + 15° = 135°.",
  },
  {
    id: "bonus_kursberakning-11",
    question: "",
    questionQuiz:
      "Du vill gå 090°. Missvisning 5°E. Avdrift 5° styrbord. Vad styr du?",
    answer: "080°",
    options: ["090°", "085°", "080°", "075°"],
    correctOptionIndex: 2,
    textTitle: "Missvisning + avdrift",
    textInfo:
      "Först missvisning: 090 − 5 = 085.\nSedan avdrift: 085 − 5 = 080.",
  },
  {
    id: "bonus_kursberakning-12",
    question: "",
    questionQuiz:
      "Du vill gå 200°. Missvisning 4°W. Avdrift 6° babord. Vad styr du?",
    answer: "198°",
    options: ["210°", "204°", "198°", "194°"],
    correctOptionIndex: 2,
    textTitle: "Flera steg",
    textInfo:
      "Missvisning: 200 + 4 = 204.\nAvdrift vänster → styr höger: 204 − 6 = 198.",
  },
  {
    id: "bonus_kursberakning-13",
    question: "",
    questionQuiz:
      "Du styr 100°. Missvisning 5°E. Vad är rättvisande kurs?",
    answer: "105°",
    options: ["095°", "100°", "105°", "110°"],
    correctOptionIndex: 2,
    textTitle: "KK → RV",
    textInfo:
      "Omvänd regel.\nÖst = lägg till.\n100° + 5° = 105°.",
  },
  {
    id: "bonus_kursberakning-14",
    question: "",
    questionQuiz:
      "Du styr 180°. Deviation 4°W. Vad är magnetisk kurs?",
    answer: "176°",
    options: ["184°", "180°", "176°", "172°"],
    correctOptionIndex: 2,
    textTitle: "KK → MV",
    textInfo:
      "Omvänd regel.\nVäst = minus.\n180° − 4° = 176°.",
  },
  {
    id: "bonus_kursberakning-15",
    question: "",
    questionQuiz:
      "Du vill gå 090°. Missvisning 4°E, deviation 2°W och avdrift 6° styrbord. Vad styr du?",
    answer: "082°",
    options: ["094°", "090°", "082°", "078°"],
    correctOptionIndex: 2,
    textTitle: "Stegvis kursberäkning",
    textInfo:
      "Steg för steg:\nMissvisning: 090 − 4 = 086\nDeviation: 086 + 2 = 088\nAvdrift: 088 − 6 = 082\n\nAlltid i ordning:\n1. Missvisning\n2. Deviation\n3. Avdrift",
  },
];