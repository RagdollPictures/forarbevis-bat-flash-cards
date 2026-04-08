import type { FlashCard } from "../../types";

export const longitudLatitud: FlashCard[] = [
  {
    id: "longlat-001",
    question: "Hur många grader är ett helt varv på en cirkel?",
    questionQuiz:
      "Hur många grader omfattar ett helt cirkelvarv?",
    answer: "360°.",
    options: ["180°.", "360°.", "90°.", "270°."],
    correctOptionIndex: 1,
    textTitle: "Grader – hur många på ett varv?",
    textInfo: "Ett helt varv runt en cirkel är 360°. Man kan tänka sig att cirkeln delas upp i 360 lika stora delar, där varje del är en grad."
  },
  {
    id: "longlat-002",
    question: "Hur många minuter går det på en grad?",
    questionQuiz:
      "Hur många bågminuter motsvarar en grad?",
    answer: "60.",
    options: ["100.", "10.", "60.", "360."],
    correctOptionIndex: 2,
    textTitle: "Minuter – hur delas en grad?",
    textInfo:"En grad delas in i 60 minuter. Minuter används för att ange en mer exakt position än bara hela grader."
  },
  {
    id: "longlat-003",
    question: "Vilken stad passerar nollmeridianen genom?",
    questionQuiz:
      "Genom vilken stad går nollmeridianen?",
    answer: "Greenwich/London.",
    options: [
      "Stockholm/Solna.",
      "Paris/Beauvais.",
      "London/Greenwich.",
      "New York/Brooklyn.",
    ],
    correctOptionIndex: 2,
    textTitle: "Nollmeridianen – var går den?",
    textInfo: "Nollmeridianen går från Nordpolen till Sydpolen och passerar genom Greenwich i London. Den används som utgångspunkt för att mäta longitud."
  },
  {
    id: "longlat-004",
    question: "Är en meridian en longitud eller latitud?",
    questionQuiz:
      "Tillhör en meridian longitud- eller latitudsystemet?",
    answer: "Longitud.",
    options: ["Latitud.", "Longitud.", "Breddgrad.", "Ekvator."],
    correctOptionIndex: 1,
    textTitle: "Meridian – vad är det?",
    textInfo: "En meridian är en linje som går från nordpol till sydpol. Meridianer används för att ange longitud, alltså hur långt öster eller väster man befinner sig."
  },
  {
    id: "longlat-005",
    question: "Vad är det svenska ordet för latitud?",
    questionQuiz:
      "Vad kallas latitud på svenska?",
    answer: "Breddgrad.",
    options: [
      "Längdgrad.",
      "Meridian.",
      "Breddgrad.",
      "Nollgrad.",
    ],
    correctOptionIndex: 2,
    textTitle: "Latitud – vad kallas det på svenska?",
    textInfo: "Latitud kallas på svenska för breddgrad. Den visar hur långt norr eller söder om ekvatorn man är."
  },
  {
    id: "longlat-006",
    question: "Beskriver E018°10,9' en longitud eller latitud?",
    questionQuiz:
      "Är koordinaten E018°10,9' ett exempel på longitud eller latitud?",
    answer: "Longitud.",
    options: ["Latitud.", "Longitud.", "Ekvator.", "Breddgrad."],
    correctOptionIndex: 1,
    textTitle: "Koordinater – vad är E018°10,9'?",
    textInfo: "Koordinaten E018°10,9' är en longitud, eftersom den börjar med E (öst). Longituder visar position öster eller väster om nollmeridianen."
  },
  {
    id: "longlat-007",
    question: "Kan en latitud vara större än 90°?",
    questionQuiz:
      "Kan en latitud överstiga 90 grader?",
    answer: "Nej. N90° är Nordpolen och S90° är Sydpolen.",
    options: [
      "Ja, upp till 180°.",
      "Ja, upp till 360°.",
      "Nej.",
      "Ja, upp till 120°.",
    ],
    correctOptionIndex: 2,
    textTitle: "Latitud – finns det en gräns?",
    textInfo: "En latitud kan aldrig vara större än 90°. N90° är Nordpolen, S90° är Sydpolen, Vid 0° befinner man sig på ekvatorn."
  },
  {
    id: "longlat-008",
    question: "Vilket kan en longitud vara; Nordlig eller Västlig?",
    questionQuiz:
      "Vilken riktning kan en longitud ha?",
    answer: "Västlig.",
    options: ["Nordlig.", "Sydlig.", "Västlig.", "Ingen riktning."],
    correctOptionIndex: 2,
    textTitle: "Longitud – vilka riktningar finns?",
    textInfo: "Longituder kan vara östliga (E) eller västliga (W). De kan alltså vara västliga, men aldrig nordliga eller sydliga."
  },
  {
    id: "longlat-009",
    question: "Hur många longitudgrader finns det?",
    questionQuiz:
      "Hur många grader omfattar hela longitudsystemet?",
    answer: "360. Hälften mot väster och hälften mot öster.",
    options: [
      "180 totalt.",
      "360 totalt, 180° öst och 180° väst.",
      "90 totalt.",
      "720 totalt.",
    ],
    correctOptionIndex: 1,
    textTitle: "Longituder – hur många finns?",
    textInfo: "Det finns totalt 360 longitudgrader runt jorden. Hälften ligger öster om nollmeridianen och hälften väster om den." 
  },
  {
    id: "longlat-010",
    question: "Hur många siffror ska gradtalet på latituden alltid skrivas med?",
    questionQuiz:
      "Hur många siffror ska användas när latitudens gradtal skrivs?",
    answer: "Två.",
    options: ["En.", "Två.", "Tre.", "Fyra."],
    correctOptionIndex: 1,
    textTitle: "Skrivsätt – latitud",
    textInfo: "Latitudens gradtal skrivs alltid med två siffror, även om en nolla måste sättas framför (t.ex. 05°)."
  },
  {
    id: "longlat-011",
    question: "Hur många siffror ska gradtalet på longituden alltid skrivas med?",
    questionQuiz:
      "Hur många siffror ska longitudens gradtal bestå av?",
    answer: "Tre.",
    options: ["En.", "Två.", "Tre.", "Fyra."],
    correctOptionIndex: 2,
    textTitle: "Skrivsätt – longitud",
    textInfo: "Longitudens gradtal skrivs alltid med tre siffror, vilket kan innebära en eller två nollor i början (t.ex. 008°)."
  },
];
