import {
  avdriftStrom,
  berakningar,
  bonusDagersignaler,
  bonusFartDistansTid,
  bonusFlaggor,
  bonusFortojningslinor,
  bonusKardinal,
  bonusKursberakning,
  bonusLanternor,
  bonusLjudsignaler,
  bonusNavigator,
  bonusSjomarken,
  bonusSymboler,
  deviationMissvisning,
  distans,
  elektroniskaSjokort,
  farledsnavigation,
  fastaSjomarken,
  flytandeSjomarken,
  instrumentnavigation,
  knoparOchLinor,
  krysspejling,
  kursBaringRiktning,
  laggaUtKurs,
  lanternorFartyg,
  lanternorInledning,
  lanternorMotorbatar,
  lanternorSarskildaFartyg,
  lanternorSegelbatar,
  lanternorSmabatar,
  longitudLatitud,
  manovreringBatMedRoder,
  manovreringBatUtanRoder,
  manovreringFortoja,
  manovreringHogFart,
  manovreringInledning,
  manovreringKastaLoss,
  manovreringSegelbat,
  markeraPosition,
  mataKortDistans,
  mataLangreDistans,
  mataUppKurs,
  miljoAllemansratten,
  miljoBottenfarg,
  miljoEcoDriving,
  miljoMiljovett,
  miljoSkyddsomraden,
  miljoToaletter,
  navigationsbestick,
  navigationsinstrumentEkolod,
  navigationsinstrumentInstrumentkontroll,
  navigationsinstrumentKompass,
  navigationsinstrumentLogg,
  navigationsinstrumentNavigator,
  navigationsinstrumentSatellit,
  navigatornavigation,
  optiskNavigation,
  papperssjokort,
  planering,
  position,
  rattaSattaKurs,
  sakerhetAnsvarSkyldigheter,
  sakerhetBransle,
  sakerhetElsakerhet,
  sakerhetFlytvast,
  sakerhetNodsituationer,
  sakerhetNodutrustning,
  sakerhetSakerhetsutrustning,
  sakerhetSjoraddning,

  signaleringDagersignaler,
  signaleringLjudsignaler,
  signaleringNodsignaler,
  signaleringSignalflaggor,
  sjokortstyper,
  sjomanskapAnkring,
  sjomanskapFlaggor,
  sjomanskapHansynHjalpsamhet,
  sjomanskapKladsel,
  sjomanskapKontrollerUnderhall,
  sjomanskapSjofylleri,
  sjomanskapSjovardighet,
  sjomanskapStabilitet,

  sjukvardBrannskador,
  sjukvardGrundlaggande,
  sjukvardNedkylning,
  sjukvardSjosjuka,
  symboler,
  taFramPosition,
  tillforlitlighet,
  vaderMeteorologi,
  vaderRisker,
  vaderstreck,
  vaderVaderprognoser,
  vaderVindOchVagor,

  vajningsreglerFartyg,
  vajningsreglerInledning,
  vajningsreglerMotorbatar,
  vajningsreglerSegelbatar,
  vajningsreglerSmabatar,
} from "../../content/questions";

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

  bonus_flaggor: bonusFlaggor,
  bonus_dagersignaler: bonusDagersignaler,
  bonus_sjomarken: bonusSjomarken,
   bonus_symboler: bonusSymboler,
    bonus_lanternor: bonusLanternor,
    bonus_fart_distans_tid: bonusFartDistansTid,
    bonus_ljudsignaler: bonusLjudsignaler,
    bonus_fortojningslinor: bonusFortojningslinor,
    bonus_kursberakning: bonusKursberakning,
    bonus_navigator: bonusNavigator,
    bonus_kardinal: bonusKardinal,
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
  chapterId?: string;
};

export type ReadSection = {
  id: string;
  title: string;
  body: string;
  imageKey?: string;
};

export function buildReadSections(deckId: string): ReadSection[] {
  const cards = getDeck(deckId);

  return cards
    .map((card, index) => {
      if (!card.textTitle && !card.textInfo) return null;

      return {
        id: `${deckId}-${index}`,
        title: card.textTitle ?? `Avsnitt ${index + 1}`,
        body: card.textInfo ?? "",
        ...(card.imageKey ? { imageKey: card.imageKey } : {}),
      };
    })
    .filter((s): s is ReadSection => s !== null);
}

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

function findChapterById(chapters: Chapter[], chapterId: string): Chapter | null {
  for (const ch of chapters) {
    if (ch.id === chapterId) return ch;

    if (ch.children?.length) {
      const found = findChapterById(ch.children, chapterId);
      if (found) return found;
    }
  }

  return null;
}

export function getQuizzesForChapter(sourceId: string, chapterId: string): Quiz[] {
  const chapters = getChapters(sourceId);
  const chapter = findChapterById(chapters, chapterId);

  if (!chapter) return [];

  const result: Quiz[] = [];

  for (const child of chapter.children ?? []) {
    if (child.type === "quiz" && child.quizId) {
      const deck = buildQuizDeckFromChapter(chapter);

      if (deck.length > 0) {
        result.push({
  id: child.quizId,
  title: child.title,
  subtitle: chapter.title,
  sourceId,
  deck,
  chapterId: chapter.id,
});
      }

      continue;
    }

    if (child.deckId) {
      const deck = buildQuizDeckFromDeckId(child.deckId);

      if (deck.length > 0) {
        result.push({
          id: child.id,
          title: child.title,
          subtitle: chapter.title,
          sourceId,
          deck,
        });
      }
    }
  }

  return result;
}

function getAllDeckIdsFromChapter(chapter: Chapter): string[] {
  if (!chapter.children?.length) {
    return chapter.deckId ? [chapter.deckId] : [];
  }

  const ids: string[] = [];

  for (const child of chapter.children) {
    if (child.type === "quiz") continue;
    ids.push(...getAllDeckIdsFromChapter(child));
  }

  return ids;
}

function buildQuizDeckFromChapter(chapter: Chapter): MultipleChoiceCard[] {
  const deckIds = getAllDeckIdsFromChapter(chapter);

  return deckIds.flatMap((deckId) =>
    getDeck(deckId).filter(isMultipleChoiceCard)
  );
}

function findChapterByQuizId(chapters: Chapter[], quizId: string): Chapter | null {
  for (const ch of chapters) {
    const hasQuizChild = (ch.children ?? []).some(
      (child) => child.quizId === quizId
    );

    if (hasQuizChild) return ch;

    if (ch.children?.length) {
      const found = findChapterByQuizId(ch.children, quizId);
      if (found) return found;
    }
  }

  return null;
}

export function getQuizById(quizId: string): Quiz | null {
  for (const source of sources) {
    const chapters = getChapters(source.id);

    const chapter = findChapterByQuizId(chapters, quizId);
    if (chapter) {
      const quizNode = (chapter.children ?? []).find(
        (child) => child.quizId === quizId
      );

      const deck = buildQuizDeckFromChapter(chapter);

      if (deck.length === 0) return null;

      return {
  id: quizId,
  title: quizNode?.title ?? "Kapitelquiz",
  subtitle: chapter.title,
  sourceId: source.id,
  deck,
  chapterId: chapter.id,
};
    }

    const directQuiz = getQuizzes(source.id).find((q) => q.id === quizId);
    if (directQuiz) return directQuiz;
  }

  return null;
}

export type { Chapter, FlashCard, Source };

