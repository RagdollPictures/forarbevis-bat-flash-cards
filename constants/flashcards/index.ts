import type { Chapter, FlashCard, Source } from "./types";

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
import { elektroniskaSjokort } from "./forarintyg_se/sjokortet/elektroniska_sjokort";
import { fastaSjomarken } from "./forarintyg_se/sjokortet/fasta_sjomarken";
import { flytandeSjomarken } from "./forarintyg_se/sjokortet/flytande_sjomarken";
import { longitudLatitud } from "./forarintyg_se/sjokortet/longitud_latitud";
import { papperssjokort } from "./forarintyg_se/sjokortet/papperssjokort";
import { sjokortstyper } from "./forarintyg_se/sjokortet/sjokortstyper";
import { symboler } from "./forarintyg_se/sjokortet/symboler";
import { tillforlitlighet } from "./forarintyg_se/sjokortet/tillforlitlighet";
import { krysspejling } from "./forarintyg_se/sjokortsarbete/krysspejling";
import { laggaUtKurs } from "./forarintyg_se/sjokortsarbete/lagga_ut_kurs";
import { markeraPosition } from "./forarintyg_se/sjokortsarbete/markera_position";
import { mataKortDistans } from "./forarintyg_se/sjokortsarbete/mata_kort_distans";
import { mataLangreDistans } from "./forarintyg_se/sjokortsarbete/mata_langre_distans";
import { mataUppKurs } from "./forarintyg_se/sjokortsarbete/mata_upp_kurs";
import { taFramPosition } from "./forarintyg_se/sjokortsarbete/ta_fram_position";
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
    {
      id: "vader",
      title: "Väder",
      deckId: "vader",
    },
    {
      id: "saker_bat_i_skargard_och_till_havs",
      title: "Säker båt i skärgård och till havs",
      deckId: "saker_bat_i_skargard_och_till_havs",
    },
    {
      id: "batlivet",
      title: "Båtlivet",
      deckId: "batlivet",
    },
    {
      id: "sjomanskap",
      title: "Sjömanskap",
      deckId: "sjomanskap",
    },
  ],
  forarintyg: [
  {
    id: "sjokortet",
    title: "Sjökortet",
    children: [
      { id: "sjokortstyper", title: "Sjökortstyper", deckId: "sjokortstyper" },
      { id: "papperssjokort", title: "Papperssjökort", deckId: "papperssjokort" },
      { id: "elektroniska_sjokort", title: "Elektroniska sjökort", deckId: "elektroniska_sjokort" },
      { id: "symboler", title: "Symboler", deckId: "symboler" },
      { id: "flytande_sjomarken", title: "Flytande sjömärken", deckId: "flytande_sjomarken" },
      { id: "fasta_sjomarken", title: "Fasta sjömärken", deckId: "fasta_sjomarken" },
      { id: "tillforlitlighet", title: "Tillförlitlighet", deckId: "tillforlitlighet" },
      { id: "longitud_latitud", title: "Longitud och latitud", deckId: "longitud_latitud" },
    ],
  },

  {
    id: "navigationsteori",
    title: "Navigationsteori",
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
    title: "Praktisk navigation",
    children: [
      { id: "planering", title: "Planering", deckId: "planering" },
      { id: "farledsnavigation", title: "Farledsnavigation", deckId: "farledsnavigation" },
      { id: "optisk_navigation", title: "Optisk navigation", deckId: "optisk_navigation" },
      { id: "instrumentnavigation", title: "Instrumentnavigation", deckId: "instrumentnavigation" },
      { id: "navigatornavigation", title: "Navigatornavigation", deckId: "navigatornavigation" },
    ],
  },

  {
    id: "sjokortsarbete",
    title: "Sjökortsarbete",
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
    id: "vajningsregler",
    title: "Väjningsregler",
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
    title: "Lanternor",
    children: [
      { id: "lanternor_inledning", title: "Inledning", deckId: "lanternor_inledning" },
      { id: "lanternor_smabatar", title: "Småbåtar", deckId: "lanternor_smabatar" },
    {
      id: "lanternor_segelbatar",
      title: "Segelbåtar",
      deckId: "lanternor_segelbatar",
    },
    {
  id: "lanternor_motorbatar",
  title: "Motorbåtar",
  deckId: "lanternor_motorbatar",
},
{
  id: "lanternor_fartyg",
  title: "Fartyg",
  deckId: "lanternor_fartyg",
},
{
  id: "lanternor_sarskilda_fartyg",
  title: "Särskilda fartyg",
  deckId: "lanternor_sarskilda_fartyg",
},
    ],
  },

  {
  id: "manovrering",
  title: "Manövrering",
  children: [
    {
      id: "manovrering_inledning",
      title: "Inledning",
      deckId: "manovrering_inledning",
    },
    {
  id: "manovrering_bat_med_roder",
  title: "Båt med roder",
  deckId: "manovrering_bat_med_roder",
},
{
  id: "manovrering_bat_utan_roder",
  title: "Båt utan roder",
  deckId: "manovrering_bat_utan_roder",
},
{
  id: "manovrering_hog_fart",
  title: "Hög fart",
  deckId: "manovrering_hog_fart",
},
{
  id: "manovrering_fortoja",
  title: "Förtöja",
  deckId: "manovrering_fortoja",
},{
  id: "manovrering_kasta_loss",
  title: "Kasta loss",
  deckId: "manovrering_kasta_loss",
},

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
krysspejling: krysspejling,
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
};

export function getChapters(sourceId: string): Chapter[] {
  return chaptersBySourceId[sourceId] ?? [];
}

export function getDeck(deckId: string): FlashCard[] {
  return decksById[deckId] ?? [];
}

export type { Chapter, FlashCard, Source };

