import type { FlashCard } from "../../types";

export const vaderstreck: FlashCard[] = [
  {
    id: "vaderstreck-1",
    question: 'Vilket väderstreck är "uppåt" på jorden?',
    questionQuiz:
      "Vilket väderstreck ligger mot jordens nordpol?",
    answer: "Nord.",
    options: [
      "Syd.",
      "Öst.",
      "Väst.",
      "Nord.",
    ],
    correctOptionIndex: 3,
    textTitle: "Uppåt på jorden",
    textInfo: "På jorden är norr alltid uppåt, det vill säga i riktning mot nordpolen. Detta gäller även på sjökort där norr alltid är uppåt när texten är rättvänd."
  },
  {
    id: "vaderstreck-2",
    question: "Vilket gradtal har ost/öst?",
    questionQuiz:
      "Vilket gradtal motsvarar öst på en kompass?",
    answer: "90°.",
    options: [
      "0°.",
      "90°.",
      "180°.",
      "270°.",
    ],
    correctOptionIndex: 1,
    textTitle: "Gradtal – öst",
    textInfo: "Riktningen öst (E) motsvarar 90° i 360°-systemet. Gradtalen används för att ange riktning mer exakt än med bara ord."
  },
  {
    id: "vaderstreck-3",
    question: "Vilket gradtal har väst?",
    questionQuiz:
      "Vilket gradtal motsvarar väst på en kompass?",
    answer: "270°.",
    options: [
      "180°.",
      "270°.",
      "90°.",
      "360°.",
    ],
    correctOptionIndex: 1,
    textTitle: "Gradtal – väst",
    textInfo: "Riktningen väst (W) motsvarar 270°. Det är motsatt riktning till öst (90°)."
  },
  {
    id: "vaderstreck-4",
    question: "Vilken väderstreck indikerar E?",
    questionQuiz:
      "Vad betyder bokstaven E på en kompassros?",
    answer: "Ost/Öst (East).",
    options: [
      "Nord.",
      "Syd.",
      "Öst.",
      "Väst.",
    ],
    correctOptionIndex: 2,
    textTitle: "Bokstaven E",
    textInfo: "Bokstaven E står för öst (East). Internationellt används E istället för Ö eller O för att undvika missförstånd."
  },
  {
    id: "vaderstreck-5",
    question:
      'Vad är samlingsnamnet för de "delväderstreck" som ligger mellan de fyra huvudväderstrecken?',
    questionQuiz:
      "Vad kallas väderstrecken mellan nord, syd, öst och väst?",
    answer: "Interkardinaler.",
    options: [
      "Paralleller.",
      "Meridianer.",
      "Interkardinaler.",
      "Azimuter.",
    ],
    correctOptionIndex: 2,
    textTitle: "Delväderstreck",
    textInfo: "De väderstreck som ligger mellan de fyra huvudväderstrecken kallas interkardinaler. Exempel är nordost (NE), sydost (SE), sydväst (SW) och nordväst (NW)."
  },
];
