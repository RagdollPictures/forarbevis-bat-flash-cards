import type { PlacedNode, QuizItem } from "./levelScreenTypes";

export function getPlacedNodes(layout: any, quizzes: QuizItem[]): PlacedNode[] {
  const result: PlacedNode[] = [];

  for (const anchor of layout.anchors) {
    if (!("type" in anchor) || !("index" in anchor)) continue;

    const quizIndex = anchor.index - 1;
    const quiz = quizzes[quizIndex];

    if (!quiz) continue;

    if (anchor.type === "read") {
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
      result.push({
        id: anchor.id,
        type: "quiz",
        quizId: quiz.id,
        title: quiz.title,
        subtitle: quiz.subtitle,
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