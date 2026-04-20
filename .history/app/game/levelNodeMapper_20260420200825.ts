import type {
  ObjectAnchor,
  PlacedNode,
  QuizItem,
  TitleAnchor,
  TitlePlacedNode,
} from "./levelScreenTypes";

export function getPlacedNodes(layout: any, quizzes: QuizItem[]): PlacedNode[] {
  const result: PlacedNode[] = [];

  if (!layout?.anchors?.length || quizzes.length === 0) {
    return result;
  }

  const regularQuizzes = quizzes.slice(0, -1);
  const chapterTestQuiz = quizzes[quizzes.length - 1] ?? null;
  const regularQuizCount = regularQuizzes.length;

  for (const anchor of layout.anchors) {
    if (!("type" in anchor)) continue;

    if (anchor.type === "read") {
      if (!("index" in anchor)) continue;

      const quizIndex = anchor.index - 1;
      const quiz = regularQuizzes[quizIndex];
      if (!quiz) continue;

      result.push({
        id: anchor.id,
        type: "read",
        deckId: quiz.id,
        title: quiz.title,
        quizId: quiz.id,
        x: anchor.x,
        y: anchor.y,
      });

      continue;
    }

    if (anchor.type === "quiz") {
      if (!("index" in anchor)) continue;

      const quizIndex = anchor.index - 1;
      const quiz = regularQuizzes[quizIndex];
      if (!quiz) continue;

      result.push({
        id: anchor.id,
        type: "quiz",
        quizId: quiz.id,
        title: quiz.title,
        subtitle: quiz.subtitle,
        x: anchor.x,
        y: anchor.y,
      });

      continue;
    }

    if (anchor.type === "chapter_test") {
      if (!("index" in anchor)) continue;
      if (!chapterTestQuiz) continue;
      if (anchor.index !== regularQuizCount) continue;

      result.push({
        id: anchor.id,
        type: "chapter_test",
        quizId: chapterTestQuiz.id,
        title: chapterTestQuiz.title,
        subtitle: chapterTestQuiz.subtitle,
        x: anchor.x,
        y: anchor.y,
      });
    }
  }

  return result;
}

export function getTitleNodes(
  layout: any,
  quizzes: QuizItem[]
): TitlePlacedNode[] {
  if (!layout?.anchors?.length || quizzes.length === 0) {
    return [];
  }

  const regularQuizzes = quizzes.slice(0, -1);

  return layout.anchors
    .filter(
      (anchor: any) =>
        anchor.type === "title_box" &&
        typeof anchor.id === "string" &&
        typeof anchor.index === "number" &&
        typeof anchor.x === "number" &&
        typeof anchor.y === "number" &&
        typeof anchor.width === "number" &&
        typeof anchor.height === "number"
    )
    .map((anchor: any) => {
      const quiz = regularQuizzes[anchor.index - 1];
      if (!quiz) return null;

      return {
        id: anchor.id,
        type: "title_box",
        index: anchor.index,
        title: quiz.title,
        x: anchor.x,
        y: anchor.y,
        width: anchor.width,
        height: anchor.height,
      };
    })
    .filter(Boolean) as TitlePlacedNode[];
}

export function getBgAnchor(layout: any) {
  return layout.anchors.find((anchor: any) => anchor.id === "anchor_bg");
}

export function getObjectAnchors(layout: any): ObjectAnchor[] {
  if (!layout?.anchors?.length) return [];

  return layout.anchors.filter(
    (anchor: any) =>
      anchor.type === "object" &&
      typeof anchor.id === "string" &&
      typeof anchor.index === "number" &&
      typeof anchor.x === "number" &&
      typeof anchor.y === "number"
  );
}

export function getTitleAnchors(layout: any): TitleAnchor[] {
  if (!layout?.anchors?.length) return [];

  return layout.anchors.filter(
    (anchor: any) =>
      anchor.type === "title" &&
      typeof anchor.id === "string" &&
      typeof anchor.index === "number" &&
      typeof anchor.x === "number" &&
      typeof anchor.y === "number"
  );
}