export type FlashCard = {
  id: string;
  question: string;
  answer: string;
};

export const sjokortet: FlashCard[] = [
  {
    id: "sjokortet-1",
    question: "Vad skiljer ett båtsportkort från ett vanligt skärgårdskort?",
    answer:
      "Båtsportkortet har samma grundmaterial som ett papperssjökort i originalformat. Det trycks i A3-format, binds samman med spiral och kommer i nytryck med olika tidsintervall.",
  },
  {
    id: "sjokortet-2a",
    question: "Hur många meter i verkligheten är 7 millimeter i ett skärgårdskort?",
    answer: "350 meter.",
  },
  {
    id: "sjokortet-2b",
    question:
      "Hur många meter i verkligheten är 7 millimeter i ett specialkort, till exempel kort 6163 eller 9313?",
    answer: "175 meter.",
  },
  {
    id: "sjokortet-3a",
    question: "Hur kan du avgöra om du har ett aktuellt sjökort?",
    answer:
      "På vanliga sjökort ser du det i nedre vänstra hörnet. På båtsportkort anges aktuellt år på första sidan och varje blad har ett datum i nedre vänstra hörnet.",
  },
  {
    id: "sjokortet-3b",
    question: "Vad innebär det om ett sjökort är ett New Chart?",
    answer:
      "Det är ett nyproducerat sjökort med ny utbredning, skala eller utformning. Sjökortsnumret är nytt.",
  },
  {
    id: "sjokortet-3c",
    question: "Vad innebär det om ett sjökort är en New Edition?",
    answer:
      "Upplagan innehåller större förändringar utöver de som beskrivs i Ufs. Föregående upplaga betraktas som ogiltig för navigering.",
  },
  {
    id: "sjokortet-4",
    question:
      "Var kan du som fritidsskeppare hitta aktuella rättelser till sjökort?",
    answer:
      "På Sjöfartsverkets webbplats under Ufs – Underrättelser för sjöfarande.",
  },
  {
    id: "sjokortet-5",
    question: "Var finns sjökortets karttecken och symboler förklarade?",
    answer: "I publikationen Kort 1 som ges ut av Sjöfartsverket.",
  },
  {
    id: "sjokortet-6",
    question: "Finns alltid alla upplysningar med på skärgårdskortet?",
    answer:
      "Nej. Finns det ett specialkort har man utelämnat viss information i skärgårdskortet och istället redovisat den i specialkortet. Grön bred linje anger att det finns ett sjökort i större skala som ska användas.",
  },
  {
    id: "sjokortet-7",
    question:
      "Kan du använda ett kustkort för navigering inomskärs?",
    answer:
      "Nej. Du ska använda ett tresiffrigt skärgårdskort eller ett fyrsiffrigt specialkort med större skala.",
  },
  {
    id: "sjokortet-8a",
    question:
      "Från vilket år beräknas vattendjupet på sjökort med djupangivelser vid medelvatten?",
    answer:
      "För kort 616 och 6163 från 1980. För kort 931 från 1956 och för 9313 från 1980.",
  },
  {
    id: "sjokortet-8b",
    question: "Hur stor är landhöjningen per år enligt sjökorten?",
    answer:
      "0,4 cm per år i 616 och 6163. 0,1 cm per år i 931 och 0,15 cm per år i 9313.",
  },
  {
    id: "sjokortet-8c",
    question:
      "Vad är fördelen med att använda RH2000 och BSCD2000 som referensdjup?",
    answer:
      "Det ger ett enhetligt system för bland annat justering av landhöjning i svenska sjökort.",
  },
  {
    id: "sjokortet-9",
    question:
      "Finns det andra faktorer som påverkar vattenståndet?",
    answer: "Ja. Högtryck, lågtryck och vindförhållanden.",
  },
  {
    id: "sjokortet-10",
    question:
      "Vad är skillnaden mellan papperssjökort och digitala sjökort när det gäller noggrannhet?",
    answer:
      "Vektorkort har rakare strandlinjer än rasterkort. Rasterkort består av täta punkter och kan vara både digitala och i pappersformat.",
  },
  {
    id: "sjokortet-11",
    question:
      "Vad anger den mörkblå färgen närmast land i sjökortet?",
    answer:
      "Djupkurva 0–3 meter. Området är oftast inte sjömätt.",
  },
  {
    id: "sjokortet-12",
    question:
      "Vad är skillnaden mellan Gauss och Mercators projektioner?",
    answer:
      "Gauss projektion har konstant latitudskala och ökande longitudskala från en medelmeridian. I Mercators projektion växer latitudskalan.",
  },
];
