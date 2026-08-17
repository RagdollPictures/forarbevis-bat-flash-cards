import { forarintygDecks } from "../../content/questions/decks";

import { forarintygChapters } from "../../content/questions/courseStructure";

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
  forarintyg: forarintygChapters,
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

  ...forarintygDecks,
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

