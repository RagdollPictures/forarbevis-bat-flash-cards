import type { FlashCard } from "../../types";

export const sjomanskapSjovardighet: FlashCard[] = [
  {
    id: "sjomanskap_sjovardighet-1",
    question:
      "Du vill ha en båt som du kan segla från Stockholm till Gotland med. Vilken CE-klass ska den minst ha?",
    questionQuiz:
      "Vilken lägsta CE-klass krävs för en båt som ska klara en överfart från Stockholm till Gotland?",
    answer:
      "Minst CE-klass B.",
    options: [
      "CE-klass A.",
      "CE-klass B.",
      "CE-klass C.",
      "CE-klass D.",
    ],
    correctOptionIndex: 1,
    textTitle: "CE-klass och användningsområde",
textInfo: "För färder utomskärs, till exempel mellan Stockholm och Gotland, krävs minst CE-klass B. Denna klass är anpassad för öppet hav med högre vågor och hårdare vindar än inomskärs."
  },
  {
    id: "sjomanskap_sjovardighet-2",
    question:
      "När är en båt sjövärdig?",
    questionQuiz:
      "När anses en båt vara sjövärdig inför en planerad färd?",
    answer:
      "När den har för färden lämplig och nödvändig utrustning.",
    options: [
      "När den är nyservad.",
      "När den är försäkrad.",
      "När den har för färden lämplig och nödvändig utrustning.",
      "När den är CE-märkt.",
    ],
    correctOptionIndex: 2,
    textTitle: "Vad innebär sjövärdighet?",
textInfo: "En båt är sjövärdig när den har rätt utrustning för färden och allt fungerar som det ska. Det gäller särskilt utrustning för navigation, säkerhet och nödsituationer."
  },
  {
    id: "sjomanskap_sjovardighet-3",
    question:
      "Varför är det farligt att lasta en båt över vad den är klassad för?",
    questionQuiz:
      "Vad är den största risken med att överlasta en båt?",
    answer:
      "Båtens stabilitet försämras.",
    options: [
      "Motorn slits snabbare.",
      "Bränsleförbrukningen ökar något.",
      "Båtens stabilitet försämras.",
      "Farten minskar marginellt.",
    ],
    correctOptionIndex: 2,
    textTitle: "Risker med överlast",
textInfo: "Att lasta en båt över dess tillåtna gräns försämrar stabiliteten och gör båten farligare att framföra. En överlastad båt kan bli svår att kontrollera och riskerar att kantra."
  },
];
