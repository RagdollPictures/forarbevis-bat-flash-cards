import { useEffect, useMemo, useState } from "react";
import { saveQuizProgress } from "../../../constants/flashcards/quizProgress";
import type { FlashCard } from "../../../constants/flashcards/types";
import { shuffle } from "./shuffle";

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
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

  // Boat meter (visual only)
  const [meterPoints, setMeterPoints] = useState(0);

  // ✅ NEW: first-try tracking (per question id)
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);

  // Freeze options per question so correct answer highlight never reshuffles
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
    setMeterPoints(0);

    setSeenIds(new Set());
    setFirstTryCorrectCount(0);

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

  const visualProgress = useMemo(() => {
    if (total <= 0) return 0;
    return clampInt(meterPoints, 0, total) / total;
  }, [meterPoints, total]);

  // ✅ Save only when finished (same as before for unlock)
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
      progress: allCorrect,       // mastery (for unlock) stays 100% on finish
      score: total,
      total,
      updatedAt: Date.now(),

      // ✅ NEW fields (for menu ring)
      firstTryCorrect: firstTryCorrectCount,
      firstTryTotal: total,
    });
  }, [quizId, isFinished, total, firstTryCorrectCount]);

  const finishIfComplete = (nextMasteredSize: number) => {
    if (total === 0) return;
    if (nextMasteredSize >= total) {
      setIsFinished(true);
      setMeterPoints(total);
    }
  };

  const onSelect = (i: number) => {
    if (isChecked || isFinished) return;
    if (quiz.correctOptionIndex < 0) return;
    if (!card?.id) return;

    const wasCorrect = i === quiz.correctOptionIndex;

    // ✅ NEW: record first try only the first time we ever answer this card id
   if (!seenIds.has(card.id)) {
  const nextSeen = new Set(seenIds);
  nextSeen.add(card.id);
  setSeenIds(nextSeen);

  if (wasCorrect) {
    setFirstTryCorrectCount((c) => c + 1);
  }
}


    setSelectedIndex(i);
    setIsChecked(true);

    if (wasCorrect) {
      setPendingMoveToEnd(false);

      setProgress((prev) => {
        const next = [...prev];
        next[safeIndex] = "correct";
        return next;
      });

      setMeterPoints((p) => clampInt(p + 1, 0, total));

      setMasteredIds((prev) => {
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

    setMeterPoints((p) => clampInt(p - 1, 0, total));
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
    setMeterPoints(0);

    setSeenIds(new Set());
    setFirstTryCorrectCount(0);

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

    firstTryCorrectCount,

    onSelect,
    onNext,
    restart,
  };
}
