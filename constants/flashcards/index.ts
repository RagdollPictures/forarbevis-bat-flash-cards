import { miljoEcoDriving } from "./forarintyg_se/miljo/eco_driving";

import { lanternorFartyg } from "./forarintyg_se/lanternor/fartyg";
import { lanternorInledning } from "./forarintyg_se/lanternor/inledning";
import { lanternorMotorbatar } from "./forarintyg_se/lanternor/motorbatar";
import { lanternorSarskildaFartyg } from "./forarintyg_se/lanternor/sarskilda_fartyg";
import { lanternorSegelbatar } from "./forarintyg_se/lanternor/segelbatar";
import { lanternorSmabatar } from "./forarintyg_se/lanternor/smabatar";
import { manovreringBatMedRoder } from "./forarintyg_se/manovrering/bat_med_roder";
import { manovreringBatUtanRoder } from "./forarintyg_se/manovrering/bat_utan_roder";
import { manovreringFortoja } from "./forarintyg_se/manovrering/fortoja";
import { manovreringHogFart } from "./forarintyg_se/manovrering/hog_fart";
import { manovreringInledning } from "./forarintyg_se/manovrering/inledning";
import { manovreringKastaLoss } from "./forarintyg_se/manovrering/kasta_loss";
import { manovreringSegelbat } from "./forarintyg_se/manovrering/segelbat";
import { miljoAllemansratten } from "./forarintyg_se/miljo/allemansratten";
import { miljoBottenfarg } from "./forarintyg_se/miljo/bottenfarg";
import { miljoMiljovett } from "./forarintyg_se/miljo/miljovett";
import { miljoSkyddsomraden } from "./forarintyg_se/miljo/skyddsomraden";
import { miljoToaletter } from "./forarintyg_se/miljo/toaletter";
import { navigationsinstrumentEkolod } from "./forarintyg_se/navigationsinstrument/ekolod";
import { navigationsinstrumentInstrumentkontroll } from "./forarintyg_se/navigationsinstrument/instrumentkontroll";
import { navigationsinstrumentKompass } from "./forarintyg_se/navigationsinstrument/kompass";
import { navigationsinstrumentLogg } from "./forarintyg_se/navigationsinstrument/logg";
import { navigationsinstrumentNavigator } from "./forarintyg_se/navigationsinstrument/navigator";
import { navigationsinstrumentSatellit } from "./forarintyg_se/navigationsinstrument/satellit";
import { avdriftStrom } from "./forarintyg_se/navigationsteori/avdrift_strom";
import { berakningar } from "./forarintyg_se/navigationsteori/berakningar";
import { deviationMissvisning } from "./forarintyg_se/navigationsteori/deviation_missvisning";
import { distans } from "./forarintyg_se/navigationsteori/distans";
import { kursBaringRiktning } from "./forarintyg_se/navigationsteori/kurs_baring_riktning";
import { navigationsbestick } from "./forarintyg_se/navigationsteori/navigationsbestick";
import { position } from "./forarintyg_se/navigationsteori/position";
import { rattaSattaKurs } from "./forarintyg_se/navigationsteori/ratta_satta_kurs";
import { vaderstreck } from "./forarintyg_se/navigationsteori/vaderstreck";
import { farledsnavigation } from "./forarintyg_se/praktisk_navigation/farledsnavigation";
import { instrumentnavigation } from "./forarintyg_se/praktisk_navigation/instrumentnavigation";
import { navigatornavigation } from "./forarintyg_se/praktisk_navigation/navigatornavigation";
import { optiskNavigation } from "./forarintyg_se/praktisk_navigation/optisk_navigation";
import { planering } from "./forarintyg_se/praktisk_navigation/planering";
import { sakerhetAnsvarSkyldigheter } from "./forarintyg_se/sakerhet/ansvar_skyldigheter";
import { sakerhetBransle } from "./forarintyg_se/sakerhet/bransle";
import { sakerhetElsakerhet } from "./forarintyg_se/sakerhet/elsakerhet";
import { sakerhetFlytvast } from "./forarintyg_se/sakerhet/flytvast";
import { sakerhetNodsituationer } from "./forarintyg_se/sakerhet/nodsituationer";
import { sakerhetNodutrustning } from "./forarintyg_se/sakerhet/nodutrustning";
import { sakerhetSakerhetsutrustning } from "./forarintyg_se/sakerhet/sakerhetsutrustning";
import { sakerhetSjoraddning } from "./forarintyg_se/sakerhet/sjoraddning";
import { signaleringDagersignaler } from "./forarintyg_se/signalering/dagersignaler";
import { signaleringLjudsignaler } from "./forarintyg_se/signalering/ljudsignaler";
import { signaleringNodsignaler } from "./forarintyg_se/signalering/nodsignaler";
import { signaleringSignalflaggor } from "./forarintyg_se/signalering/signalflaggor";
import { elektroniskaSjokort } from "./forarintyg_se/sjokortet/elektroniska_sjokort";
import { longitudLatitud } from "./forarintyg_se/sjokortet/longitud_latitud";
import { papperssjokort } from "./forarintyg_se/sjokortet/papperssjokort";
import { sjokortstyper } from "./forarintyg_se/sjokortet/sjokortstyper";
import { tillforlitlighet } from "./forarintyg_se/sjokortet/tillforlitlighet";
import { fastaSjomarken } from "./forarintyg_se/sjokortet_sjomarken/fasta_sjomarken";
import { flytandeSjomarken } from "./forarintyg_se/sjokortet_sjomarken/flytande_sjomarken";
import { krysspejling } from "./forarintyg_se/sjokortsarbete/krysspejling";
import { laggaUtKurs } from "./forarintyg_se/sjokortsarbete/lagga_ut_kurs";
import { markeraPosition } from "./forarintyg_se/sjokortsarbete/markera_position";
import { mataKortDistans } from "./forarintyg_se/sjokortsarbete/mata_kort_distans";
import { mataLangreDistans } from "./forarintyg_se/sjokortsarbete/mata_langre_distans";
import { mataUppKurs } from "./forarintyg_se/sjokortsarbete/mata_upp_kurs";
import { taFramPosition } from "./forarintyg_se/sjokortsarbete/ta_fram_position";
import { symboler } from "./forarintyg_se/sjokortssymboler/symboler";
import { sjomanskapAnkring } from "./forarintyg_se/sjomanskap/ankring";
import { sjomanskapFlaggor } from "./forarintyg_se/sjomanskap/flaggor";
import { sjomanskapHansynHjalpsamhet } from "./forarintyg_se/sjomanskap/hansyn_hjalpsamhet";
import { sjomanskapKladsel } from "./forarintyg_se/sjomanskap/kladsel";
import { knoparOchLinor } from "./forarintyg_se/sjomanskap/knopar_och_linor";
import { sjomanskapKontrollerUnderhall } from "./forarintyg_se/sjomanskap/kontroller_undehall";
import { sjomanskapSjofylleri } from "./forarintyg_se/sjomanskap/sjofylleri";
import { sjomanskapSjovardighet } from "./forarintyg_se/sjomanskap/sjovardighet";
import { sjomanskapStabilitet } from "./forarintyg_se/sjomanskap/stabilitet";
import { sjukvardBrannskador } from "./forarintyg_se/sjukvard/brannskador";
import { sjukvardGrundlaggande } from "./forarintyg_se/sjukvard/grundlaggande";
import { sjukvardNedkylning } from "./forarintyg_se/sjukvard/nedkylning";
import { sjukvardSjosjuka } from "./forarintyg_se/sjukvard/sjosjuka";
import { vaderMeteorologi } from "./forarintyg_se/vader/meteorologi";
import { vaderRisker } from "./forarintyg_se/vader/risker";
import { vaderVaderprognoser } from "./forarintyg_se/vader/vaderprognoser";
import { vaderVindOchVagor } from "./forarintyg_se/vader/vind_och_vagor";
import { vajningsreglerFartyg } from "./forarintyg_se/vajningsregler/fartyg";
import { vajningsreglerInledning } from "./forarintyg_se/vajningsregler/inledning";
import { vajningsreglerMotorbatar } from "./forarintyg_se/vajningsregler/motorbatar";
import { vajningsreglerSegelbatar } from "./forarintyg_se/vajningsregler/segelbatar";
import { vajningsreglerSmabatar } from "./forarintyg_se/vajningsregler/smabatar";
import { batlivet } from "./fritidsskepparen/batlivet";
import { kompassen } from "./fritidsskepparen/kompassen";
import { positionFartTidDistans } from "./fritidsskepparen/position_fart_tid_distans";
import { praktiskSkargardsnavigering } from "./fritidsskepparen/praktisk_skargardsnavigering";
import { sakerBatISkargardOchTillHavs } from "./fritidsskepparen/saker_bat_i_skargard_och_till_havs";
import { sjokortet } from "./fritidsskepparen/sjokortet";
import { sjomanskap } from "./fritidsskepparen/sjomanskap";
import { utmarkningAvGrundPrickarOchBojar } from "./fritidsskepparen/utmarkning_av_grund_prickar_och_bojar";
import { vader } from "./fritidsskepparen/vader";
import type { Chapter, FlashCard, Source } from "./types";

export const sources: Source[] = [
  { id: "fritidsskepparen", title: "Fritidsskepparen" },
  { id: "forarintyg", title: "Forarintyg.se" },
];

export const chaptersBySourceId: Record<string, Chapter[]> = {
  fritidsskepparen: [
    { id: "sjokortet", title: "Sjökortet", deckId: "sjokortet" },
    {
      id: "position_fart_tid_distans",
      title: "Position, fart, tid och distans",
      deckId: "position_fart_tid_distans",
    },
    { id: "kompassen", title: "Kompassen", deckId: "kompassen" },
    {
      id: "utmarkning_av_grund_prickar_och_bojar",
      title: "Utmärkning av grund Prickar och bojar",
      deckId: "utmarkning_av_grund_prickar_och_bojar",
    },
    {
      id: "praktisk_skargardsnavigering",
      title: "Praktisk skärgårdsnavigering",
      deckId: "praktisk_skargardsnavigering",
    },
    { id: "vader", title: "Väder", deckId: "vader" },
    {
      id: "saker_bat_i_skargard_och_till_havs",
      title: "Säker båt i skärgård och till havs",
      deckId: "saker_bat_i_skargard_och_till_havs",
    },
    { id: "batlivet", title: "Båtlivet", deckId: "batlivet" },
    { id: "sjomanskap", title: "Sjömanskap", deckId: "sjomanskap" },
  ],
  forarintyg: [
    {
      id: "sjokortet",
      title: "Kartunderlag & Koordinater",
      deckId: "sjokortet",
      children: [
        { id: "sjokortstyper", title: "Sjökortstyper", deckId: "sjokortstyper" },
        { id: "papperssjokort", title: "Papperssjökort", deckId: "papperssjokort" },
        { id: "elektroniska_sjokort", title: "Elektroniska sjökort", deckId: "elektroniska_sjokort" },
        { id: "tillforlitlighet", title: "Tillförlitlighet", deckId: "tillforlitlighet" },
        { id: "longitud_latitud", title: "Longitud och latitud", deckId: "longitud_latitud" },
      ],
    },

    {
      id: "sjokortSymboler",
      title: "Karttecken & Beteckningar",
      children: [{ id: "symboler", title: "Symboler", deckId: "symboler" }],
    },
    {
      id: "sjokortet_sjomarken",
      title: "Sjövägsmärken & Markeringar",
      children: [
        { id: "flytande_sjomarken", title: "Flytande sjömärken", deckId: "flytande_sjomarken" },
        { id: "fasta_sjomarken", title: "Fasta sjömärken", deckId: "fasta_sjomarken" },
      ],
    },

    {
      id: "sjokortsarbete",
      title: "Praktiskt Arbete i Sjökort",
      children: [
        { id: "mata_kort_distans", title: "Mäta kort distans", deckId: "mata_kort_distans" },
        { id: "mata_langre_distans", title: "Mäta längre distans", deckId: "mata_langre_distans" },
        { id: "ta_fram_position", title: "Ta fram position", deckId: "ta_fram_position" },
        { id: "markera_position", title: "Markera position", deckId: "markera_position" },
        { id: "lagga_ut_kurs", title: "Lägga ut kurs", deckId: "lagga_ut_kurs" },
        { id: "mata_upp_kurs", title: "Mäta upp kurs", deckId: "mata_upp_kurs" },
        { id: "krysspejling", title: "Krysspejling", deckId: "krysspejling" },
      ],
    },
    {
      id: "navigationsteori",
      title: "Navigationsprinciper",
      children: [
        { id: "vaderstreck", title: "Väderstreck", deckId: "vaderstreck" },
        { id: "navigationsbestick", title: "Navigationsbestick", deckId: "navigationsbestick" },
        { id: "kurs_baring_riktning", title: "Kurs, bäring och riktning", deckId: "kurs_baring_riktning" },
        { id: "position", title: "Position", deckId: "position" },
        { id: "distans", title: "Distans", deckId: "distans" },
        { id: "berakningar", title: "Beräkningar", deckId: "berakningar" },
        { id: "deviation_missvisning", title: "Deviation & missvisning", deckId: "deviation_missvisning" },
        { id: "avdrift_strom", title: "Avdrift & ström", deckId: "avdrift_strom" },
        { id: "ratta_satta_kurs", title: "Rätta & sätta kurs", deckId: "ratta_satta_kurs" },
      ],
    },
    {
      id: "praktisk_navigation",
      title: "Navigering i Praktiken",
      children: [
        { id: "planering", title: "Planering", deckId: "planering" },
        { id: "farledsnavigation", title: "Farledsnavigation", deckId: "farledsnavigation" },
        { id: "optisk_navigation", title: "Optisk navigation", deckId: "optisk_navigation" },
        { id: "instrumentnavigation", title: "Instrumentnavigation", deckId: "instrumentnavigation" },
        { id: "navigatornavigation", title: "Navigatornavigation", deckId: "navigatornavigation" },
      ],
    },
    {
      id: "vajningsregler",
      title: "Trafikregler till Sjöss",
      children: [
        { id: "vajningsregler_inledning", title: "Inledning", deckId: "vajningsregler_inledning" },
        { id: "vajningsregler_smabatar", title: "Småbåtar", deckId: "vajningsregler_smabatar" },
        { id: "vajningsregler_segelbatar", title: "Segelbåtar", deckId: "vajningsregler_segelbatar" },
        { id: "vajningsregler_motorbatar", title: "Motorbåtar", deckId: "vajningsregler_motorbatar" },
        { id: "vajningsregler_fartyg", title: "Fartyg", deckId: "vajningsregler_fartyg" },
      ],
    },
    {
      id: "lanternor",
      title: "Navigationsljus",
      children: [
        { id: "lanternor_inledning", title: "Inledning", deckId: "lanternor_inledning" },
        { id: "lanternor_smabatar", title: "Småbåtar", deckId: "lanternor_smabatar" },
        { id: "lanternor_segelbatar", title: "Segelbåtar", deckId: "lanternor_segelbatar" },
        { id: "lanternor_motorbatar", title: "Motorbåtar", deckId: "lanternor_motorbatar" },
        { id: "lanternor_fartyg", title: "Fartyg", deckId: "lanternor_fartyg" },
        { id: "lanternor_sarskilda_fartyg", title: "Särskilda fartyg", deckId: "lanternor_sarskilda_fartyg" },
      ],
    },
    {
      id: "manovrering",
      title: "Båtens Rörelser & Kontroll",
      children: [
        { id: "manovrering_inledning", title: "Inledning", deckId: "manovrering_inledning" },
        { id: "manovrering_bat_med_roder", title: "Båt med roder", deckId: "manovrering_bat_med_roder" },
        { id: "manovrering_bat_utan_roder", title: "Båt utan roder", deckId: "manovrering_bat_utan_roder" },
        { id: "manovrering_hog_fart", title: "Hög fart", deckId: "manovrering_hog_fart" },
        { id: "manovrering_fortoja", title: "Förtöja", deckId: "manovrering_fortoja" },
        { id: "manovrering_kasta_loss", title: "Kasta loss", deckId: "manovrering_kasta_loss" },
        { id: "manovrering_segelbat", title: "Segelbåt", deckId: "manovrering_segelbat" },
      ],
    },
    {
      id: "navigationsinstrument",
      title: "Instrument & Utrustning",
      children: [
        { id: "navigationsinstrument_kompass", title: "Kompass", deckId: "navigationsinstrument_kompass" },
        { id: "navigationsinstrument_logg", title: "Logg", deckId: "navigationsinstrument_logg" },
        { id: "navigationsinstrument_ekolod", title: "Ekolod", deckId: "navigationsinstrument_ekolod" },
        { id: "navigationsinstrument_satellit", title: "Satellit", deckId: "navigationsinstrument_satellit" },
        { id: "navigationsinstrument_navigator", title: "Navigator", deckId: "navigationsinstrument_navigator" },
        { id: "navigationsinstrument_instrumentkontroll", title: "Instrumentkontroll", deckId: "navigationsinstrument_instrumentkontroll" },
      ],
    },
    {
      id: "sjomanskap",
      title: "Båtvett & Ombordkunskap",
      children: [
        { id: "sjomanskap_hansyn_hjalpsamhet", title: "Hänsyn & hjälpsamhet", deckId: "sjomanskap_hansyn_hjalpsamhet" },
        { id: "knopar_och_linor", title: "Knopar och linor", deckId: "knopar_och_linor" },
        { id: "sjomanskap_sjovardighet", title: "Sjövärdighet", deckId: "sjomanskap_sjovardighet" },
        { id: "sjomanskap_ankring", title: "Ankring", deckId: "sjomanskap_ankring" },
        { id: "sjomanskap_kontroller_underhall", title: "Kontroller & underhåll", deckId: "sjomanskap_kontroller_underhall" },
        { id: "sjomanskap_kladsel", title: "Klädsel", deckId: "sjomanskap_kladsel" },
        { id: "sjomanskap_sjofylleri", title: "Sjöfylleri", deckId: "sjomanskap_sjofylleri" },
        { id: "sjomanskap_flaggor", title: "Flaggor", deckId: "sjomanskap_flaggor" },
        { id: "sjomanskap_stabilitet", title: "Stabilitet", deckId: "sjomanskap_stabilitet" },
      ],
    },
    {
      id: "signalering",
      title: "Kommunikation till Sjöss",
      children: [
        { id: "signalering_nodsignaler", title: "Nödsignaler", deckId: "signalering_nodsignaler" },
        { id: "signalering_dagersignaler", title: "Dagersignaler", deckId: "signalering_dagersignaler" },
        { id: "signalering_ljudsignaler", title: "Ljudsignaler", deckId: "signalering_ljudsignaler" },
        { id: "signalering_signalflaggor", title: "Signalflaggor", deckId: "signalering_signalflaggor" },
      ],
    },
    {
      id: "sakerhet",
      title: "Säkerhet & Beredskap",
      children: [
        { id: "sakerhet_flytvast", title: "Flytväst", deckId: "sakerhet_flytvast" },
        { id: "sakerhet_nodsituationer", title: "Nödsituationer", deckId: "sakerhet_nodsituationer" },
        { id: "sakerhet_sakerhetsutrustning", title: "Säkerhetsutrustning", deckId: "sakerhet_sakerhetsutrustning" },
        { id: "sakerhet_nodutrustning", title: "Nödutrustning", deckId: "sakerhet_nodutrustning" },
        { id: "sakerhet_elsakerhet", title: "Elsäkerhet", deckId: "sakerhet_elsakerhet" },
        { id: "sakerhet_bransle", title: "Bränsle", deckId: "sakerhet_bransle" },
        { id: "sakerhet_sjoraddning", title: "Sjöräddning", deckId: "sakerhet_sjoraddning" },
        { id: "sakerhet_ansvar_skyldigheter", title: "Ansvar & skyldigheter", deckId: "sakerhet_ansvar_skyldigheter" },
      ],
    },
    {
      id: "sjukvard",
      title: "Första Hjälpen Ombord",
      children: [
        { id: "sjukvard_grundlaggande", title: "Grundläggande", deckId: "sjukvard_grundlaggande" },
        { id: "sjukvard_sjosjuka", title: "Sjösjuka", deckId: "sjukvard_sjosjuka" },
        { id: "sjukvard_nedkylning", title: "Nedkylning", deckId: "sjukvard_nedkylning" },
        { id: "sjukvard_brannskador", title: "Brännskador", deckId: "sjukvard_brannskador" },
      ],
    },
    {
      id: "vader",
      title: "Meteorologi för båtfolk",
      children: [
        { id: "vader_meteorologi", title: "Meteorologi", deckId: "vader_meteorologi" },
        { id: "vader_vaderprognoser", title: "Väderprognoser", deckId: "vader_vaderprognoser" },
        { id: "vader_vind_och_vagor", title: "Vind och vågor", deckId: "vader_vind_och_vagor" },
        { id: "vader_risker", title: "Risker", deckId: "vader_risker" },
      ],
    },
    {
      id: "miljo",
      title: "Natur och ansvar",
      children: [
        { id: "miljo_miljovett", title: "Miljövett", deckId: "miljo_miljovett" },
        { id: "miljo_bottenfarg", title: "Bottenfärg", deckId: "miljo_bottenfarg" },
        { id: "miljo_toaletter", title: "Toaletter", deckId: "miljo_toaletter" },
        { id: "miljo_eco_driving", title: "Eco-driving", deckId: "miljo_eco_driving" },
        { id: "miljo_allemansratten", title: "Allemansrätten", deckId: "miljo_allemansratten" },
        { id: "miljo_skyddsomraden", title: "Skyddsområden", deckId: "miljo_skyddsomraden" },
      ],
    },
  ],
};

export const decksById: Record<string, FlashCard[]> = {
  sjokortet,
  position_fart_tid_distans: positionFartTidDistans,
  kompassen,
  utmarkning_av_grund_prickar_och_bojar: utmarkningAvGrundPrickarOchBojar,
  praktisk_skargardsnavigering: praktiskSkargardsnavigering,
  vader,
  saker_bat_i_skargard_och_till_havs: sakerBatISkargardOchTillHavs,
  batlivet,
  sjomanskap,

  longitud_latitud: longitudLatitud,
  sjokortstyper,
  papperssjokort,
  elektroniska_sjokort: elektroniskaSjokort,
  symboler,
  flytande_sjomarken: flytandeSjomarken,
  fasta_sjomarken: fastaSjomarken,
  tillforlitlighet,

  vaderstreck,
  navigationsbestick,
  kurs_baring_riktning: kursBaringRiktning,
  position,
  distans,
  berakningar,
  deviation_missvisning: deviationMissvisning,
  avdrift_strom: avdriftStrom,
  ratta_satta_kurs: rattaSattaKurs,

  mata_kort_distans: mataKortDistans,
  mata_langre_distans: mataLangreDistans,
  ta_fram_position: taFramPosition,
  markera_position: markeraPosition,
  lagga_ut_kurs: laggaUtKurs,
  mata_upp_kurs: mataUppKurs,
  krysspejling,

  planering,
  farledsnavigation,
  optisk_navigation: optiskNavigation,
  instrumentnavigation,
  navigatornavigation,

  vajningsregler_inledning: vajningsreglerInledning,
  vajningsregler_smabatar: vajningsreglerSmabatar,
  vajningsregler_segelbatar: vajningsreglerSegelbatar,
  vajningsregler_motorbatar: vajningsreglerMotorbatar,
  vajningsregler_fartyg: vajningsreglerFartyg,

  lanternor_inledning: lanternorInledning,
  lanternor_smabatar: lanternorSmabatar,
  lanternor_segelbatar: lanternorSegelbatar,
  lanternor_motorbatar: lanternorMotorbatar,
  lanternor_fartyg: lanternorFartyg,
  lanternor_sarskilda_fartyg: lanternorSarskildaFartyg,

  manovrering_inledning: manovreringInledning,
  manovrering_bat_med_roder: manovreringBatMedRoder,
  manovrering_bat_utan_roder: manovreringBatUtanRoder,
  manovrering_hog_fart: manovreringHogFart,
  manovrering_fortoja: manovreringFortoja,
  manovrering_kasta_loss: manovreringKastaLoss,
  manovrering_segelbat: manovreringSegelbat,

  navigationsinstrument_kompass: navigationsinstrumentKompass,
  navigationsinstrument_logg: navigationsinstrumentLogg,
  navigationsinstrument_navigator: navigationsinstrumentNavigator,
  navigationsinstrument_satellit: navigationsinstrumentSatellit,
  navigationsinstrument_ekolod: navigationsinstrumentEkolod,
  navigationsinstrument_instrumentkontroll: navigationsinstrumentInstrumentkontroll,

  sjomanskap_hansyn_hjalpsamhet: sjomanskapHansynHjalpsamhet,
  knopar_och_linor: knoparOchLinor,
  sjomanskap_sjovardighet: sjomanskapSjovardighet,
  sjomanskap_ankring: sjomanskapAnkring,
  sjomanskap_kontroller_underhall: sjomanskapKontrollerUnderhall,
  sjomanskap_kladsel: sjomanskapKladsel,
  sjomanskap_sjofylleri: sjomanskapSjofylleri,
  sjomanskap_flaggor: sjomanskapFlaggor,
  sjomanskap_stabilitet: sjomanskapStabilitet,

  signalering_nodsignaler: signaleringNodsignaler,
  signalering_dagersignaler: signaleringDagersignaler,
  signalering_ljudsignaler: signaleringLjudsignaler,
  signalering_signalflaggor: signaleringSignalflaggor,

  sakerhet_flytvast: sakerhetFlytvast,
  sakerhet_nodsituationer: sakerhetNodsituationer,
  sakerhet_sakerhetsutrustning: sakerhetSakerhetsutrustning,
  sakerhet_nodutrustning: sakerhetNodutrustning,
  sakerhet_elsakerhet: sakerhetElsakerhet,
  sakerhet_bransle: sakerhetBransle,
  sakerhet_sjoraddning: sakerhetSjoraddning,
  sakerhet_ansvar_skyldigheter: sakerhetAnsvarSkyldigheter,

  sjukvard_grundlaggande: sjukvardGrundlaggande,
  sjukvard_sjosjuka: sjukvardSjosjuka,
  sjukvard_nedkylning: sjukvardNedkylning,
  sjukvard_brannskador: sjukvardBrannskador,

  vader_meteorologi: vaderMeteorologi,
  vader_vaderprognoser: vaderVaderprognoser,
  vader_vind_och_vagor: vaderVindOchVagor,
  vader_risker: vaderRisker,

  miljo_miljovett: miljoMiljovett,
  miljo_bottenfarg: miljoBottenfarg,
  miljo_toaletter: miljoToaletter,
  miljo_eco_driving: miljoEcoDriving,
  miljo_allemansratten: miljoAllemansratten,
  miljo_skyddsomraden: miljoSkyddsomraden,
};

export function getChapters(sourceId: string): Chapter[] {
  return chaptersBySourceId[sourceId] ?? [];
}

export function getDeck(deckId: string): FlashCard[] {
  return decksById[deckId] ?? [];
}

export type MultipleChoiceCard = FlashCard & {
  options: string[];
  correctOptionIndex: number;
  questionQuiz?: string;
};

export type Quiz = {
  id: string;
  title: string;
  subtitle?: string;
  sourceId: string;
  deck: MultipleChoiceCard[];
};

function isMultipleChoiceCard(c: FlashCard): c is MultipleChoiceCard {
  const anyC: any = c;
  return (
    Array.isArray(anyC.options) &&
    anyC.options.length >= 2 &&
    typeof anyC.correctOptionIndex === "number" &&
    anyC.correctOptionIndex >= 0 &&
    anyC.correctOptionIndex < anyC.options.length
  );
}

function collectQuizChapters(
  chapters: Chapter[],
  parents: Chapter[] = []
): Array<{ ch: Chapter; parents: Chapter[] }> {
  const out: Array<{ ch: Chapter; parents: Chapter[] }> = [];

  for (const ch of chapters) {
    const nextParents = [...parents, ch];

    if (ch.deckId) {
      out.push({ ch, parents });
    }

    if (ch.children?.length) {
      out.push(...collectQuizChapters(ch.children, nextParents));
    }
  }

  return out;
}

function buildQuizDeckFromDeckId(deckId: string): MultipleChoiceCard[] {
  return getDeck(deckId).filter(isMultipleChoiceCard);
}

export function getQuizzes(sourceId: string): Quiz[] {
  const chapters = getChapters(sourceId);
  const quizChapters = collectQuizChapters(chapters);

  return quizChapters
    .map(({ ch, parents }) => {
      const subtitle = parents.map((p) => p.title).join(" • ");
      return {
        id: ch.id,
        title: ch.title,
        subtitle: subtitle.length > 0 ? subtitle : undefined,
        sourceId,
        deck: buildQuizDeckFromDeckId(ch.deckId!),
      };
    })
    .filter((q) => q.deck.length > 0);
}

export function getQuizById(quizId: string): Quiz | null {
  for (const source of sources) {
    const quiz = getQuizzes(source.id).find((q) => q.id === quizId);
    if (quiz) return quiz;
  }
  return null;
}

export type { Chapter, FlashCard, Source };

