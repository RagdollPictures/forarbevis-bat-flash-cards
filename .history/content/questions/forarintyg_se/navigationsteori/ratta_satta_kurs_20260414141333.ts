import type { FlashCard } from "../../types";

export const rattaSattaKurs: FlashCard[] = [
  {
    id: "ratta_satta_kurs-1",
    question: "Vilket instrument är det som visar KK?",
    questionQuiz:
      "Vilket instrument visar kompasskursen (KK) ombord?",
    answer: "KK / Kompasskursen visas av magnetkompassen.",
    options: [
      "Navigatorn.",
      "Magnetkompassen.",
      "Loggen.",
      "Ekolodet.",
    ],
    correctOptionIndex: 1,
    textTitle: "Vilket instrument visar kompasskurs (KK)?",
    textInfo: "Kompasskursen (KK) visas av den magnetiska kompassen ombord. Det är den kurs du faktiskt styr efter i båten.",
  },
  {
    id: "ratta_satta_kurs-2",
    question: "Du mäter upp en kurs på ett sjökort. Vad benämns denna kurs som?",
    questionQuiz:
      "Vad kallas en kurs som är uppmätt direkt i sjökortet?",
    answer: "K / Rättvisande kurs.",
    options: [
      "Kompasskurs.",
      "Kurs över grund.",
      "Rättvisande kurs.",
      "Magnetisk kurs.",
    ],
    correctOptionIndex: 2,
      textTitle: "Vad kallas kursen man mäter i sjökortet?",
    textInfo: "Den kurs man mäter eller ritar ut i sjökortet kallas rättvisande kurs (K). Den baseras på geografisk nord och är utgångspunkt vid planering.",
  },
  {
    id: "ratta_satta_kurs-3",
    question: "Vilken kurs visas på din navigator?",
    questionQuiz:
      "Vilken typ av kurs visar en GPS-navigator normalt?",
    answer: "KÖG / Kurs Över Grund.",
    options: [
      "Kompasskurs.",
      "Rättvisande kurs.",
      "Kurs över grund.",
      "Magnetisk bäring.",
    ],
    correctOptionIndex: 2,
      textTitle: "Vilken kurs visas på navigatorn?",
    textInfo: "Navigatorn visar kurs över grund (KÖG). Det är den verkliga riktningen båten rör sig över botten.",
  },
  {
    id: "ratta_satta_kurs-4",
    question:
      "Vilka två fel måste räknas med mellan Kompasskurs och Rättvisande kurs?",
    questionQuiz:
      "Vilka två korrigeringar behövs mellan KK och rättvisande kurs?",
    answer: "Deviation och missvisning.",
    options: [
      "Ström och avdrift.",
      "Deviation och missvisning.",
      "Vind och vågor.",
      "Fart och tid.",
    ],
    correctOptionIndex: 1,
      textTitle: "Vilka fel finns mellan kompasskurs och rättvisande kurs?",
    textInfo: "Mellan KK och K måste man ta hänsyn till: Deviation (d) – båtens magnetiska påverkan och missvisning (m) – jordens magnetiska påverkan",
  },
  {
    id: "ratta_satta_kurs-5",
    question:
      "Vilka två fel måste räknas med mellan Rättvisande kurs och Kurs Över Grund?",
    questionQuiz:
      "Vilka faktorer påverkar skillnaden mellan rättvisande kurs och KÖG?",
    answer: "Avdrift och ström.",
    options: [
      "Deviation och missvisning.",
      "Avdrift och ström.",
      "DOP och eftersläpning.",
      "Vindstyrka och siktdjup.",
    ],
    correctOptionIndex: 1,
      textTitle: "Vilka fel finns mellan rättvisande kurs och kurs över grund?",
    textInfo: "Mellan K och KÖG påverkas kursen av: Avdrift – vindens påverkan och ström – vattnets rörelse",
  },
  {
    id: "ratta_satta_kurs-6",
    question:
      "Vilket tecken ska ett ostligt fel ha i den så kallade Chalmers-metoden?",
    questionQuiz:
      "Vilket tecken används för ostlig missvisning i Chalmersmetoden?",
    answer: "+/Positivt.",
    options: [
      "Negativt (-).",
      "Positivt (+).",
      "Inget tecken.",
      "Multiplicerat med två.",
    ],
    correctOptionIndex: 1,
      textTitle: "Vilket tecken har ostliga fel?",
    textInfo: "I beräkningar gäller: Ostliga fel (E) = positiva (+) Västliga fel (W) = negativa (−)",
  },
  {
    id: "ratta_satta_kurs-7",
    question:
      "Du styr 090° på din magnetkompass (KK) och har en ostlig missvisning på 4°. Vad blir rättvisande kurs? Bortse från deviation och ström.",
    questionQuiz:
      "KK 090° med ostlig missvisning 4° – vilken rättvisande kurs får du?",
    answer: "094°.",
    options: [
      "086°.",
      "090°.",
      "094°.",
      "098°.",
    ],
    correctOptionIndex: 2,
      textTitle: "Hur påverkar missvisning kursen?",
    textInfo: "Om du styr 090° (KK) och har +4° ostlig missvisning: kursen blir 094° (KÖG). Ostlig = lägg till",
  },
  {
    id: "ratta_satta_kurs-8",
    question:
      "Du vill färdas med KÖG 090° men har 5° avdrift från höger. Vilken kurs ska du styra? Bortse från missvisning och ström.",
    questionQuiz:
      "Önskad KÖG 090° och 5° avdrift från höger – vilken kompasskurs ska du hålla?",
    answer: "095°.",
    options: [
      "085°.",
      "090°.",
      "095°.",
      "100°.",
    ],
    correctOptionIndex: 2,
      textTitle: "Hur kompenserar man för avdrift?",
    textInfo: "Om du vill gå 090° (KÖG) men har 5° avdrift från höger: du måste styra 095° (KK). Du styr upp mot vinden",
  },
  {
    id: "ratta_satta_kurs-9",
    question:
      "Du pejlar en fyr till 185° (KK). Missvisningen är W4°. Vad är rättvisande bäring?",
    questionQuiz:
      "Pejling 185° med västlig missvisning 4° – vad blir rättvisande bäring?",
    answer: "181°.",
    options: [
      "189°.",
      "181°.",
      "185°.",
      "179°.",
    ],
    correctOptionIndex: 1,
      textTitle: "Hur rättar man en bäring?",
    textInfo: "Om du mäter 185° (KK) och har 4° västlig missvisning: rättvisande bäring blir 181° (K) Västlig = dra bort",
  },
  {
    id: "ratta_satta_kurs-10",
    question:
      "Du ska köra rättvisande kurs 350°. Missvisningen är E4°. Vilken kompasskurs gäller?",
    questionQuiz:
      "Rättvisande kurs 350° och ostlig missvisning 4° – vilken KK ska styras?",
    answer: "346°.",
    options: [
      "346°.",
      "350°.",
      "354°.",
      "342°.",
    ],
    correctOptionIndex: 0,
      textTitle: "Hur sätter man kurs från sjökort till kompass?",
    textInfo: "Om kursen i sjökortet är 350° (K) och missvisningen är +4°E: - kompasskurs blir 346° (KK) Du räknar baklänges",
  },
];
