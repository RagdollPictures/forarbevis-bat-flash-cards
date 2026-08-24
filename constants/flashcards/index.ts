import { course } from "../../content/course";
import { courseChapters } from "../../content/questions/courseStructure";


import type { Chapter, FlashCard, Source } from "./types";

export const sources: Source[] = [
  {
    id: course.sourceId,
    title: course.sourceTitle,
  },
];

export const chaptersBySourceId: Record<string, Chapter[]> = {
  [course.sourceId]: courseChapters,
};



export function getChapters(sourceId: string): Chapter[] {
  return chaptersBySourceId[sourceId] ?? [];
}




export type Quiz = {
  id: string;
  title: string;
  subtitle?: string;
  sourceId: string;
  courseId: string;
  deckId?: string;
  chapterId?: string;
};






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

export function getQuizzesForChapter(
  sourceId: string,
  chapterId: string
): Quiz[] {
  const chapters = getChapters(sourceId);
  const chapter = findChapterById(
    chapters,
    chapterId
  );

  if (!chapter) {
    return [];
  }

  const result: Quiz[] = [];

  for (const child of chapter.children ?? []) {
    // Kapitelquiz
    if (
      child.type === "quiz" &&
      child.quizId
    ) {
      result.push({
        id: child.quizId,
        title: child.title,
        subtitle: chapter.title,
        sourceId,
        courseId: course.id,

        chapterId: chapter.id,
      });

      continue;
    }

    // Vanligt quiz kopplat till en deck
    if (child.deckId) {
      result.push({
        id: child.id,
        title: child.title,
        subtitle: chapter.title,
        sourceId,
        courseId: course.id,

        deckId: child.deckId,
      });
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

export function getDeckIdsForChapter(
  chapterId: string
): string[] {
  for (const source of sources) {
    const chapter = findChapterById(
      getChapters(source.id),
      chapterId
    );

    if (chapter) {
      return getAllDeckIdsFromChapter(chapter);
    }
  }

  return [];
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

export function getQuizById(
  quizId: string
): Quiz | null {
  for (const source of sources) {
    const chapters = getChapters(source.id);

    // Kapitelquiz
    const chapter = findChapterByQuizId(
      chapters,
      quizId
    );

    if (chapter) {
      const quizNode = (
        chapter.children ?? []
      ).find(
        (child) =>
          child.quizId === quizId
      );

      return {
        id: quizId,
        title:
          quizNode?.title ??
          "Kapitelquiz",
        subtitle: chapter.title,
        sourceId: source.id,
        courseId: course.id,

        chapterId: chapter.id,
      };
    }

    // Vanligt quiz / vanlig deck
    const directQuiz =
      collectQuizChapters(
        chapters
      ).find(
        ({ ch }) =>
          ch.id === quizId
      );

    if (
      directQuiz &&
      directQuiz.ch.deckId
    ) {
      const subtitle =
        directQuiz.parents
          .map((parent) => parent.title)
          .join(" • ");

      return {
        id: directQuiz.ch.id,
        title: directQuiz.ch.title,
        subtitle:
          subtitle.length > 0
            ? subtitle
            : undefined,
        sourceId: source.id,
        courseId: course.id,

        deckId:
          directQuiz.ch.deckId,
      };
    }
  }

  return null;
}

export type { Chapter, FlashCard, Source };

