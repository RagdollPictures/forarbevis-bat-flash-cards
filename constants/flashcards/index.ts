import type { Chapter, FlashCard, Source } from "./types";

import { longitudLatitud } from "./forarintyg_se/longitud_latitud";
import { papperssjokort } from "./forarintyg_se/papperssjokort";
import { sjokortstyper } from "./forarintyg_se/sjokortstyper";

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
      id: "longitud_latitud",
      title: "Longitud och latitud",
      deckId: "longitud_latitud",
    },
    {
      id: "sjokortstyper",
      title: "Sjökortstyper",
      deckId: "sjokortstyper",
    },
    {
      id: "papperssjokort",
      title: "Papperssjökort",
      deckId: "papperssjokort",
    },
  ],
};

export const decksById: Record<string, FlashCard[]> = {
  sjokortet,
  position_fart_tid_distans: positionFartTidDistans,
  longitud_latitud: longitudLatitud,
  sjokortstyper,
  papperssjokort,
  kompassen,
  utmarkning_av_grund_prickar_och_bojar: utmarkningAvGrundPrickarOchBojar,
  praktisk_skargardsnavigering: praktiskSkargardsnavigering,
  vader,
  saker_bat_i_skargard_och_till_havs: sakerBatISkargardOchTillHavs,
  batlivet,
  sjomanskap,
};

export function getChapters(sourceId: string): Chapter[] {
  return chaptersBySourceId[sourceId] ?? [];
}

export function getDeck(deckId: string): FlashCard[] {
  return decksById[deckId] ?? [];
}

export type { Chapter, FlashCard, Source };

