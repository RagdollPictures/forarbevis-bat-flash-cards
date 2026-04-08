import type { FlashCard } from "../../types";

export const navigationsinstrumentKompass: FlashCard[] = [
  {
    id: "navigationsinstrument_kompass-1",
    question:
      "Åt vilket håll pekar kompassnålen på en kompass?",
    questionQuiz:
      "Vilken riktning visar den magnetiska kompassnålen?",
    answer:
      "Rakt mot norr.",
    options: [
      "Mot geografisk syd.",
      "Mot magnetisk nord.",
      "Mot solens position.",
      "Mot närmaste land.",
    ],
    correctOptionIndex: 1,
     textTitle: "Kompassens riktning",
  textInfo: "En kompass fungerar genom att använda jordens magnetfält. Kompassnålen pekar alltid mot den magnetiska nordpolen, vilket gör att man kan avgöra riktningen norr och därmed navigera."
  },
  {
    id: "navigationsinstrument_kompass-2",
    question:
      "Vad kallas det fel som båtens magnetfält ger upphov till på en magnetkompass?",
    questionQuiz:
      "Vilken typ av kompassfel orsakas av båtens egna magnetiska påverkan?",
    answer:
      "Deviation.",
    options: [
      "Missvisning.",
      "Deviation.",
      "Variation.",
      "DOP.",
    ],
    correctOptionIndex: 1,
    textTitle: "Deviation",
  textInfo: "Deviation är det fel som uppstår i kompassen på grund av magnetiska störningar ombord, till exempel från metallföremål, motorer eller kablar. Felet varierar beroende på båtens kurs men är oberoende av var på jorden man befinner sig."
  },
  {
    id: "navigationsinstrument_kompass-3",
    question:
      "Vad kallas det fel som jordens magnetfält ger upphov till på en magnetkompass?",
    questionQuiz:
      "Vad kallas skillnaden mellan magnetisk nord och geografisk nord?",
    answer:
      "Missvisning.",
    options: [
      "Deviation.",
      "Missvisning.",
      "Kurs över grund.",
      "Avdrift.",
    ],
    correctOptionIndex: 1,
     textTitle: "Missvisning",
  textInfo: "Missvisning är skillnaden mellan geografisk nordpol och magnetisk nordpol. Eftersom kompassen pekar mot den magnetiska nordpolen uppstår ett fel i förhållande till den geografiska nordpolen. Missvisningen varierar beroende på var på jorden man är."
  },
  {
    id: "navigationsinstrument_kompass-4",
    question:
      "Vad ska man tänka på gällande kompassens placering?",
    questionQuiz:
      "Vilka krav bör uppfyllas vid montering av en magnetkompass ombord?",
    answer:
      "Att den är placerad långt ifrån magnetiska störningar, är lätt att avläsa från styrplatsen, monterad parallellt med långskeppslinjen, har belysning och inte riskerar att skadas.",
    options: [
      "Placeras nära elektronik för bättre signal.",
      "Monteras var som helst så länge den är synlig.",
      "Placeras fritt från magnetiska störningar och korrekt riktad i båten.",
      "Placeras så nära motorn som möjligt.",
    ],
    correctOptionIndex: 2,
    textTitle: "Placering av kompass",
  textInfo: "En kompass ska placeras långt ifrån magnetiska störningar, vara lätt att läsa från styrplatsen och monteras parallellt med båtens långskeppslinje. Den bör också skyddas från stötar och gärna ha belysning för användning i mörker."
  },
  {
    id: "navigationsinstrument_kompass-5",
    question:
      "Nämn några olika typer av kompasser?",
    questionQuiz:
      "Vilka av följande är exempel på olika kompasstyper?",
    answer:
      "Magnetisk kompass, elektronisk kompass, gyrokompass och satellitkompass.",
    options: [
      "Magnetisk kompass, gyrokompass och satellitkompass.",
      "Vindkompass och fartkompass.",
      "Radar- och loggkompass.",
      "Laserkompass och djupkompass.",
    ],
    correctOptionIndex: 0,
    textTitle: "Olika typer av kompasser",
  textInfo: "Det finns flera typer av kompasser, bland annat magnetkompass, pejlkompass, elektronisk kompass, gyrokompass och satellitkompass. De används i olika sammanhang beroende på krav på precision och utrustning."
  },
  {
    id: "navigationsinstrument_kompass-6",
    question:
      "Visar en navigator samma kurs som en magnetisk kompass?",
    questionQuiz:
      "Visar GPS-navigatorn normalt samma kurs som magnetkompassen?",
    answer:
      "Nej, om det inte är en magnetisk kompass som är ansluten till navigatorn.",
    options: [
      "Ja, alltid.",
      "Nej, eftersom navigatorn visar kurs över grund.",
      "Ja, men bara i hamn.",
      "Endast vid låg fart.",
    ],
    correctOptionIndex: 1,
     textTitle: "Navigator och kurs",
     textInfo: "En navigator visar kurs över grund (KÖG), vilket är den riktning båten faktiskt rör sig över jordytan. Detta är inte samma sak som kompasskurs, eftersom påverkan från vind och ström kan göra att båten rör sig i en annan riktning än den pekar."
  },
];
