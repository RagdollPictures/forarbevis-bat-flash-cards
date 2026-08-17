import type { FlashCard } from "../../types";

export const navigationsinstrumentNavigator: FlashCard[] = [
  {
    id: "navigationsinstrument_navigator-1",
    question:
      "Nämn några risker med att navigera med hjälp av en navigator?",
    questionQuiz:
      "Vilka risker finns med att enbart förlita sig på en elektronisk navigator?",
    answer:
      "Eftersläpning, många funktioner, kan gå sönder och batterierna kan ta slut.",
    options: [
      "Den visar alltid exakt position utan fel.",
      "Den kan ha eftersläpning, gå sönder eller få slut på ström.",
      "Den påverkas inte av yttre störningar.",
      "Den kräver inga uppdateringar.",
    ],
    correctOptionIndex: 1,
    textTitle: "Risker med navigator",
textInfo: "Navigation med navigator innebär vissa risker. Eftersläpning kan göra att positionen som visas inte är helt aktuell, särskilt vid hög fart. Många funktioner kan också göra att man tappar fokus, och navigatorn kan sluta fungera om den går sönder eller får slut på batteri."
  },
  {
    id: "navigationsinstrument_navigator-2",
    question:
      "Vilken fart och kurs är det som en navigator visar?",
    questionQuiz:
      "Vilken typ av fart och kurs presenteras normalt av en GPS-navigator?",
    answer:
      "Fart över grund (FÖG) och kurs över grund (KÖG).",
    options: [
      "Fart genom vattnet och magnetisk kurs.",
      "Medelfart och kompasskurs.",
      "Fart över grund och kurs över grund.",
      "Planingsfart och girvinkel.",
    ],
    correctOptionIndex: 2,
    textTitle: "Fart och kurs över grund",
textInfo: "En navigator visar fart över grund (FÖG) och kurs över grund (KÖG). Dessa värden visar hur båten faktiskt rör sig över jordens yta och påverkas av både egen fart och ström."
  },
  {
    id: "navigationsinstrument_navigator-3",
    question:
      "Bör man ha en backup till sin primära navigator?",
    questionQuiz:
      "Är det god sjömanssed att ha en reservlösning om navigatorn slutar fungera?",
    answer:
      "Ja. Det är inte gott sjömanskap att sakna backup.",
    options: [
      "Nej, moderna navigatorer är helt tillförlitliga.",
      "Ja, man bör alltid ha en backup.",
      "Endast vid långfärder.",
      "Bara om man saknar kompass.",
    ],
    correctOptionIndex: 1,
    textTitle: "Backup till navigator",
textInfo: "Det är viktigt att ha en backup till sin navigator eftersom den kan sluta fungera. En vanlig reservlösning är en mobiltelefon med navigationsapp som förvaras i ett vattentätt fodral."
  },
  {
    id: "navigationsinstrument_navigator-4",
    question:
      "Om du använder en mobiltelefon som navigator, hur skyddar man den då bäst mot vatten?",
    questionQuiz:
      "Hur bör en mobiltelefon skyddas om den används för navigation ombord?",
    answer:
      "Genom att ha den i ett flytande vattentätt fodral.",
    options: [
      "Placera den i en plastpåse.",
      "Hålla den i handen hela tiden.",
      "Använda ett flytande vattentätt fodral.",
      "Stänga av den när det regnar.",
    ],
    correctOptionIndex: 2,
    textTitle: "Skydd av mobiltelefon",
textInfo: "Om en mobiltelefon används som navigator bör den skyddas mot vatten. Det görs bäst genom att förvara den i ett vattentätt fodral som också skyddar mot stänk och regn."
  },
  {
    id: "navigationsinstrument_navigator-5",
    question:
      "Nämn fyra olika typer av navigatorer?",
    questionQuiz:
      "Vilka av följande är exempel på olika typer av navigatorer?",
    answer:
      "Plotter, mobiltelefon, surfplatta och dator.",
    options: [
      "Plotter, mobiltelefon, surfplatta och dator.",
      "Radar, logg, kompass och ekolod.",
      "VHF, AIS, autopilot och logg.",
      "Vindmätare, barometer, termometer och logg.",
    ],
    correctOptionIndex: 0,
    textTitle: "Olika typer av navigatorer",
textInfo: "Det finns flera typer av navigatorer, till exempel plotter, mobiltelefon, surfplatta och dator. De fungerar på liknande sätt men skiljer sig i funktion, robusthet och användningsområde."
  },
];
