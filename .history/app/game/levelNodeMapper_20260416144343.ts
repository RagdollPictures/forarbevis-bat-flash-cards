import type { PlacedNode, QuizItem } from "./levelScreenTypes";

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

export function getBgAnchor(layout: any) {
  return layout.anchors.find((anchor: any) => anchor.id === "anchor_bg");
}