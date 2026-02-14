import { useEffect, useMemo, useState } from "react";
import { saveQuizProgress } from "../../../../constants/flashcards/quizProgress";
import type { FlashCard } from "../../../../constants/flashcards/types";
import { shuffle } from "./shuffle";

export function useQuizSession({
  quizId,
  deck,
}: {
  quizId: string;
  deck: FlashCard[];
}) {
  const [shuffledDeck, setShuffledDeck] = useState<FlashCard[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState<("correct" | "wrong" | null)[]>([]);

  useEffect(() => {
    if (deck.length === 0) return;
    const nextDeck = shuffle(deck);
    setShuffledDeck(nextDeck);
    setProgress(Array(nextDeck.length).fill(null));
    setIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
  }, [deck.length]);

  const safeIndex = Math.min(index, Math.max(0, shuffledDeck.length - 1));
  const card = shuffledDeck[safeIndex];

  const quiz = useMemo(() => {
    if (!card?.options || !Number.isInteger(card.correctOptionIndex)) {
      return { options: [], correctOptionIndex: -1 };
    }

    const zipped = card.options.map((text, originalIndex) => ({
      text,
      originalIndex,
    }));

    const shuffledOpts = shuffle(zipped);

    const correctOptionIndex = shuffledOpts.findIndex(
      (o) => o.originalIndex === card.correctOptionIndex
    );

    return {
      options: shuffledOpts.map((o) => o.text),
      correctOptionIndex,
    };
  }, [card?.id, card?.correctOptionIndex]);

  useEffect(() => {
    if (!quizId) return;
    if (!isFinished) return;
    if (shuffledDeck.length === 0) return;

    saveQuizProgress({
      quizId: String(quizId),
      progress,
      score,
      total: shuffledDeck.length,
      updatedAt: Date.now(),
    });
  }, [quizId, isFinished, progress, score, shuffledDeck.length]);

  const onSelect = (i: number) => {
    if (isChecked || isFinished) return;
    if (quiz.correctOptionIndex < 0) return;

    const wasCorrect = i === quiz.correctOptionIndex;

    setSelectedIndex(i);
    setIsChecked(true);

    setProgress((prev) => {
      const next = [...prev];
      next[safeIndex] = wasCorrect ? "correct" : "wrong";
      return next;
    });

    if (wasCorrect) setScore((s) => s + 1);
  };

  const onNext = () => {
    const next = safeIndex + 1;

    if (next >= shuffledDeck.length) {
      setIsFinished(true);
      return;
    }

    setIndex(next);
    setSelectedIndex(null);
    setIsChecked(false);
  };

  const restart = () => {
    if (deck.length === 0) return;

    const nextDeck = shuffle(deck);
    setShuffledDeck(nextDeck);
    setProgress(Array(nextDeck.length).fill(null));
    setIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  return {
    shuffledDeck,
    safeIndex,
    card,
    quiz,
    selectedIndex,
    isChecked,
    score,
    isFinished,
    progress,
    onSelect,
    onNext,
    restart,
  };
}
