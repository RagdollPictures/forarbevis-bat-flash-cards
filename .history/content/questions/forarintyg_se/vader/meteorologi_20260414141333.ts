import type { FlashCard } from "../../types";

export const vaderMeteorologi: FlashCard[] = [
  {
    id: "vader_meteorologi-1",
    question:
      "Vad innebär normalt sämre väder – ett högtryck eller ett lågtryck?",
    questionQuiz:
      "Vilken typ av trycksystem förknippas oftast med ostadigt väder?",
    answer: "Ett lågtryck.",
    options: ["Ett högtryck.", "Ett lågtryck.", "Inget av dem.", "Båda lika ofta."],
    correctOptionIndex: 1,
    textTitle: "Högtryck och lågtryck",
textInfo: "Lågtryck innebär oftast sämre väder med moln, nederbörd och mer vind, medan högtryck ofta ger stabilt och klart väder."
  },
  {
    id: "vader_meteorologi-2",
    question: "Vad är det normala/medel lufttrycket?",
    questionQuiz:
      "Vilket lufttryck räknas som normalt medelvärde vid havsytan?",
    answer: "1013 hPa (mbar).",
    options: ["980 hPa.", "1000 hPa.", "1013 hPa.", "1050 hPa."],
    correctOptionIndex: 2,
    textTitle: "Normalt lufttryck",
textInfo: "Det normala lufttrycket är cirka 1013 hPa (hektopascal), vilket används som referensvärde i väderprognoser."
  },
  {
    id: "vader_meteorologi-3",
    question: "Vad heter mätinstrumentet som mäter lufttryck?",
    questionQuiz:
      "Vilket instrument används för att mäta lufttryck?",
    answer: "Barometer.",
    options: ["Termometer.", "Barometer.", "Hygrometer.", "Anemometer."],
    correctOptionIndex: 1,
    textTitle: "Barometer",
textInfo: "Instrumentet som mäter lufttryck kallas barometer och används för att förutse väderförändringar."
  },
  {
    id: "vader_meteorologi-4",
    question:
      "Isobarer heter ringarna runt ett lågtryck som redovisar lufttrycket. Förändras lufttrycket utmed en isobar?",
    questionQuiz:
      "Är lufttrycket detsamma längs en och samma isobar?",
    answer: "Nej. Iso betyder lika.",
    options: [
      "Ja, det varierar kraftigt.",
      "Nej, trycket är detsamma.",
      "Endast vid högtryck.",
      "Endast vid lågtryck.",
    ],
    correctOptionIndex: 1,
    textTitle: "Isobarer",
textInfo: "Lufttrycket förändras inte längs en isobar, eftersom en isobar är en linje där lufttrycket är lika."
  },
  {
    id: "vader_meteorologi-5",
    question:
      "Vilken bokstav markerar centrumet på ett högtryck på en väderkarta?",
    questionQuiz:
      "Hur markeras ett högtryckscentrum på en väderkarta?",
    answer: "H.",
    options: ["L.", "H.", "T.", "P."],
    correctOptionIndex: 1,
    textTitle: "Högtryck på väderkarta",
textInfo: "Ett högtryck markeras med bokstaven H på en väderkarta."
  },
  {
    id: "vader_meteorologi-6",
    question:
      "Vilken bokstav markerar centrumet på ett lågtryck på en väderkarta?",
    questionQuiz:
      "Hur markeras ett lågtryckscentrum på en väderkarta?",
    answer: "L.",
    options: ["H.", "L.", "M.", "K."],
    correctOptionIndex: 1,
    textTitle: "Lågtryck på väderkarta",
textInfo: "Ett lågtryck markeras med bokstaven L på en väderkarta."
  },
  {
    id: "vader_meteorologi-7",
    question:
      "Vilken är den vanligaste tryckbanan/riktningen för hög- och lågtryck som passerar Sverige?",
    questionQuiz:
      "Från vilket håll rör sig oftast hög- och lågtryck över Sverige?",
    answer: "Från sydväst mot nordost.",
    options: [
      "Från nord mot syd.",
      "Från öst mot väst.",
      "Från sydväst mot nordost.",
      "Från nordost mot sydväst.",
    ],
    correctOptionIndex: 2,
    textTitle: "Vanlig tryckbana",
textInfo: "Den vanligaste riktningen för hög- och lågtryck som passerar Sverige är från sydväst mot nordost."
  },
  {
    id: "vader_meteorologi-8",
    question:
      "Vad är orsaken till att vindriktningen förändras i ett område?",
    questionQuiz:
      "Varför ändrar vinden riktning över ett område?",
    answer: "Hög- eller lågtrycket över området flyttar på sig.",
    options: [
      "Temperaturen sjunker.",
      "Molnen löses upp.",
      "Trycksystemet flyttar sig.",
      "Luftfuktigheten ökar.",
    ],
    correctOptionIndex: 2,
    textTitle: "Vindriktning förändras",
textInfo: "Vindriktningen förändras när hög- eller lågtryck rör sig över ett område och påverkar luftens rörelse."
  },
  {
    id: "vader_meteorologi-9",
    question:
      "Om det är nordliga vindar – åt vilket väderstreck förflyttar sig då luften?",
    questionQuiz:
      "Om vinden är nordlig, åt vilket håll rör sig luften?",
    answer: "Mot söder.",
    options: ["Mot norr.", "Mot söder.", "Mot öster.", "Mot väster."],
    correctOptionIndex: 1,
    textTitle: "Nordlig vind",
textInfo: "Nordlig vind innebär att vinden kommer från norr och luften rör sig mot söder."
  },
  {
    id: "vader_meteorologi-10",
    question: "I vilken enhet mäts vindstyrka?",
    questionQuiz:
      "Vilken enhet används vanligtvis i Sverige för att ange vindstyrka?",
    answer: "Meter per sekund (m/s).",
    options: ["Knop.", "Kilometer per timme.", "Meter per sekund.", "Beaufort."],
    correctOptionIndex: 2,
    textTitle: "Vindstyrka",
textInfo: "Vindstyrka mäts i meter per sekund (m/s), vilket anger hur snabbt luften rör sig."
  },
  {
    id: "vader_meteorologi-11",
    question:
      "Vid vilken vindstyrka skickas en kulingvarning ut?",
    questionQuiz:
      "Vid ungefär vilken medelvind utfärdas kulingvarning?",
    answer: "Över 14 m/s.",
    options: ["Över 8 m/s.", "Över 11 m/s.", "Över 14 m/s.", "Över 20 m/s."],
    correctOptionIndex: 2,
    textTitle: "Kuling",
textInfo: "Kulingvarning utfärdas när medelvinden förväntas överstiga 14 m/s."
  },
  {
    id: "vader_meteorologi-12",
    question:
      "I vindprognosen står det \"7 (14)\". Hur tolkar du denna information rätt?",
    questionQuiz:
      "Hur ska du tolka prognosen 7 (14) m/s?",
    answer: "7 m/s i medelvind och upp till 14 m/s i byvindarna.",
    options: [
      "7 m/s i byvind och 14 m/s i medelvind.",
      "7 m/s i medelvind och upp till 14 m/s i byvind.",
      "7 knop i medelvind.",
      "Max 7 m/s hela tiden.",
    ],
    correctOptionIndex: 1,
    textTitle: "Vindprognos 7 (14)",
textInfo: "Angivelsen 7 (14) betyder 7 m/s i medelvind och upp till 14 m/s i byvindar."
  },
  {
    id: "vader_meteorologi-13",
    question:
      "Hur långt ser man som mest då det är dimma enligt väderprognosen?",
    questionQuiz:
      "Vilken maximal sikt innebär dimma enligt prognosdefinition?",
    answer: "1000 meter.",
    options: ["200 meter.", "500 meter.", "1000 meter.", "2000 meter."],
    correctOptionIndex: 2,
    textTitle: "Dimma",
textInfo: "Dimma innebär att sikten är mindre än 1000 meter."
  },
];
