import type { Chapter, FlashCard, Source } from "./types";

import { kompassen } from "./kompassen";
import { longitudLatitud } from "./longitud_latitud";
import { positionFartTidDistans } from "./position_fart_tid_distans";
import { sjokortet } from "./sjokortet";

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

  ],
  forarintyg: [
    {
      id: "longitud_latitud",
      title: "Longitud och latitud",
      deckId: "longitud_latitud",
    },
  ],
};

export const decksById: Record<string, FlashCard[]> = {
  sjokortet,
  position_fart_tid_distans: positionFartTidDistans,
  longitud_latitud: longitudLatitud,
  kompassen
};

export function getChapters(sourceId: string): Chapter[] {
  return chaptersBySourceId[sourceId] ?? [];
}

export function getDeck(deckId: string): FlashCard[] {
  return decksById[deckId] ?? [];
}

export type { Chapter, FlashCard, Source };

