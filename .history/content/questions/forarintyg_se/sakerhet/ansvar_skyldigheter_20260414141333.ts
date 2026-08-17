import type { FlashCard } from "../../types";

export const sakerhetAnsvarSkyldigheter: FlashCard[] = [
  {
    id: "sakerhet_ansvar_skyldigheter-1",
    question:
      "Har du som befälhavare på en fritidsbåt skyldighet att bistå vid en nödsituation till sjöss?",
    questionQuiz:
      "Är du skyldig att hjälpa till vid sjönöd om du är befälhavare?",
    answer:
      "Ja, om det kan göras utan risk för det egna fartyget och besättningen.",
    options: [
      "Nej, det är frivilligt.",
      "Ja, alltid oavsett risk.",
      "Ja, om det kan ske utan fara för egen båt och besättning.",
      "Endast om Kustbevakningen begär det.",
    ],
    correctOptionIndex: 2,
    textTitle: "Skyldighet att bistå vid nödsituation",
textInfo: "Som befälhavare har man skyldighet att bistå andra fartyg i sjönöd, så länge det kan ske utan allvarlig fara för det egna fartyget eller besättningen. Detta är en grundläggande del av gott sjömanskap."
  },
  {
    id: "sakerhet_ansvar_skyldigheter-2",
    question:
      "Vad krävs för att du ska få köra en vattenskoter i Sverige?",
    questionQuiz:
      "Vilket krav gäller för att få framföra en vattenskoter i Sverige?",
    answer:
      "Att du innehar förarbevis för vattenskoter.",
    options: [
      "Inget särskilt krav.",
      "Förarbevis för vattenskoter.",
      "Kustskepparintyg.",
      "Endast körkort för bil.",
    ],
    correctOptionIndex: 1,
    textTitle: "Krav för vattenskoter",
textInfo: "För att få köra vattenskoter i Sverige krävs att man har ett särskilt förarbevis för vattenskoter. Detta intyg utfärdas av Transportstyrelsen."
  },
  {
    id: "sakerhet_ansvar_skyldigheter-3",
    question:
      "Du planerar att köpa en båt som är längre än 12 meter och bredare än 4 meter. Vilket intyg måste du ha?",
    questionQuiz:
      "Vilket behörighetskrav gäller för fritidsbåt över 12 m lång och 4 m bred?",
    answer:
      "Kustskepparintyg.",
    options: [
      "Förarintyg.",
      "Sjökaptensexamen.",
      "Kustskepparintyg.",
      "Inget intyg krävs.",
    ],
    correctOptionIndex: 2,
    textTitle: "Krav för större fritidsbåt",
textInfo: "För att få vara befälhavare på en fritidsbåt som är längre än 12 meter och bredare än 4 meter krävs att man har kustskepparintyg. Detta intyg visar att man har tillräcklig kunskap för att framföra större båtar."
  },
];
