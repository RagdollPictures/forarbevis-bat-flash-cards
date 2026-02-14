import { useEffect, useMemo, useState } from "react";
import { saveQuizProgress } from "../../../../constants/flashcards/quizProgress";
import type { FlashCard } from "../../../../constants/flashcards/types";
import { shuffle } from "./shuffle";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

type FrozenQuiz = {
  options: string[];
  correctOptionIndex: number;
};

export function useQuizSession({
  quizId,
  deck,
}: {
  quizId: string;
  deck: FlashCard[];
}) {
  const [queue, setQueue] = useState<FlashCard[]>([]);
  const [index, setIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const [isFinished, setIsFinished] = useState(false);

  const [progress, setProgress] = useState<("correct" | "wrong" | null)[]>([]);
  const [score, setScore] = useState(0);

  const [pendingMoveToEnd, setPendingMoveToEnd] = useState(false);

  const [penalty, setPenalty] = useState(0);

  const [quiz, setQuiz] = useState<FrozenQuiz>({
    options: [],
    correctOptionIndex: -1,
  });

  useEffect(() => {
    if (deck.length === 0) return;

    const nextDeck = shuffle(deck);

    setQueue(nextDeck);
    setProgress(Array(nextDeck.length).fill(null));

    setIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);

    setMasteredIds(new Set());

    setIsFinished(false);
    setScore(0);

    setPendingMoveToEnd(false);
    setPenalty(0);

    setQuiz({ options: [], correctOptionIndex: -1 });
  }, [deck.length]);

  const safeIndex = Math.min(index, Math.max(0, queue.length - 1));
  const card = queue[safeIndex];

  const total = queue.length;

  useEffect(() => {
    if (!card?.options || !Number.isInteger(card.correctOptionIndex)) {
      setQuiz({ options: [], correctOptionIndex: -1 });
      return;
    }

    const zipped = card.options.map((text, originalIndex) => ({
      text,
      originalIndex,
    }));

    const shuffledOpts = shuffle(zipped);

    const correctOptionIndex = shuffledOpts.findIndex(
      (o) => o.originalIndex === card.correctOptionIndex
    );

    setQuiz({
      options: shuffledOpts.map((o) => o.text),
      correctOptionIndex,
    });

    setSelectedIndex(null);
    setIsChecked(false);
    setPendingMoveToEnd(false);
  }, [card?.id]);

  const masteredCount = masteredIds.size;

  const masteredPercent = useMemo(() => {
    if (total <= 0) return 0;
    return Math.round((masteredCount / total) * 100);
  }, [masteredCount, total]);

  const masteryProgress = useMemo(() => {
    if (total <= 0) return 0;
    return clamp01(masteredCount / total);
  }, [masteredCount, total]);

  const visualProgress = useMemo(() => {
    return clamp01(masteryProgress - penalty);
  }, [masteryProgress, penalty]);

  useEffect(() => {
    if (!quizId) return;
    if (!isFinished) return;
    if (total === 0) return;

    const allCorrect = Array(total).fill("correct") as (
      | "correct"
      | "wrong"
      | null
    )[];

    saveQuizProgress({
      quizId: String(quizId),
      progress: allCorrect,
      score: total,
      total,
      updatedAt: Date.now(),
    });
  }, [quizId, isFinished, total]);

  const finishIfComplete = (nextMasteredSize: number) => {
    if (total === 0) return;
    if (nextMasteredSize >= total) setIsFinished(true);
  };

  const onSelect = (i: number) => {
    if (isChecked || isFinished) return;
    if (quiz.correctOptionIndex < 0) return;

    const wasCorrect = i === quiz.correctOptionIndex;

    setSelectedIndex(i);
    setIsChecked(true);

    if (wasCorrect) {
      setPendingMoveToEnd(false);

      setProgress((prev) => {
        const next = [...prev];
        next[safeIndex] = "correct";
        return next;
      });

      setPenalty((p) => clamp01(p - (total > 0 ? 1 / total : 0)));

      setMasteredIds((prev) => {
        if (!card?.id) return prev;
        if (prev.has(card.id)) return prev;

        const next = new Set(prev);
        next.add(card.id);

        setScore((s) => s + 1);
        finishIfComplete(next.size);

        return next;
      });

      return;
    }

    setPendingMoveToEnd(true);

    setProgress((prev) => {
      const next = [...prev];
      next[safeIndex] = "wrong";
      return next;
    });

    setPenalty((p) => clamp01(p + (total > 0 ? 1 / total : 0)));
  };

  const onNext = () => {
    if (isFinished) return;
    if (!isChecked) return;

    if (pendingMoveToEnd) {
      setQueue((prev) => {
        if (prev.length <= 1) return prev;

        const copy = [...prev];
        const [current] = copy.splice(safeIndex, 1);
        copy.push(current);
        return copy;
      });

      setPendingMoveToEnd(false);
      setSelectedIndex(null);
      setIsChecked(false);
      return;
    }

    setSelectedIndex(null);
    setIsChecked(false);

    const next = safeIndex + 1;

    if (next >= queue.length) {
      setIndex(0);
      return;
    }

    setIndex(next);
  };

  const restart = () => {
    if (deck.length === 0) return;

    const nextDeck = shuffle(deck);

    setQueue(nextDeck);
    setProgress(Array(nextDeck.length).fill(null));

    setIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);

    setMasteredIds(new Set());

    setIsFinished(false);
    setScore(0);

    setPendingMoveToEnd(false);
    setPenalty(0);

    setQuiz({ options: [], correctOptionIndex: -1 });
  };

  return {
    shuffledDeck: queue,
    safeIndex,
    card,
    quiz,
    selectedIndex,
    isChecked,

    score,
    isFinished,
    progress,

    visualProgress,
    masteredPercent,
    masteredCount,
    total,

    onSelect,
    onNext,
    restart,
  };
}
