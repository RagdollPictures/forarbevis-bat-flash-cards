import {
    useEffect,
    useMemo,
    useState,
} from "react";

import type { FlashCard } from "../../../constants/flashcards/types";

export function useExamSession(
  deck: FlashCard[],
  timeLimitMinutes: number | null
) {
  const [index, setIndex] =
    useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<
    Array<number | null>
  >([]);

  const [
    isFinished,
    setIsFinished,
  ] = useState(false);

  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState<number | null>(
    null
  );

  useEffect(() => {
    setIndex(0);

    setAnswers(
      Array(deck.length).fill(null)
    );

    setIsFinished(false);

    setRemainingSeconds(
      timeLimitMinutes !== null
        ? timeLimitMinutes * 60
        : null
    );
  }, [
    deck,
    timeLimitMinutes,
  ]);

  useEffect(() => {
    if (
      isFinished ||
      remainingSeconds === null ||
      remainingSeconds <= 0
    ) {
      return;
    }

    const timer =
      setInterval(() => {
        setRemainingSeconds(
          (current) =>
            current === null
              ? null
              : Math.max(
                  0,
                  current - 1
                )
        );
      }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    isFinished,
    remainingSeconds,
  ]);

  useEffect(() => {
    if (
      remainingSeconds === 0
    ) {
      setIsFinished(true);
    }
  }, [remainingSeconds]);

  const card =
    deck[index];

  const selectedIndex =
    answers[index] ?? null;

  const answeredCount =
    useMemo(
      () =>
        answers.filter(
          (answer) =>
            answer !== null
        ).length,
      [answers]
    );

  const score = useMemo(
    () =>
      deck.reduce(
        (
          total,
          card,
          cardIndex
        ) => {
          const answer =
            answers[cardIndex];

          if (
            answer ===
            card.correctOptionIndex
          ) {
            return total + 1;
          }

          return total;
        },
        0
      ),
    [
      deck,
      answers,
    ]
  );

  const wrongQuestions =
    useMemo(
      () =>
        deck
          .map(
            (
              card,
              cardIndex
            ) => ({
              card,
              index: cardIndex,
              selectedIndex:
                answers[
                  cardIndex
                ] ?? null,
            })
          )
          .filter(
            (item) =>
              item.selectedIndex !==
              item.card
                .correctOptionIndex
          ),
      [
        deck,
        answers,
      ]
    );

  const selectAnswer = (
    optionIndex: number
  ) => {
    setAnswers((current) => {
      const next = [...current];

      next[index] =
        optionIndex;

      return next;
    });
  };

  const goNext = () => {
    setIndex((current) =>
      Math.min(
        current + 1,
        deck.length - 1
      )
    );
  };

  const goPrevious = () => {
    setIndex((current) =>
      Math.max(
        current - 1,
        0
      )
    );
  };

  const submit = () => {
    setIsFinished(true);
  };

  return {
    card,
    index,
    total: deck.length,
    answers,
    selectedIndex,
    answeredCount,
    score,
    wrongQuestions,
    isFinished,
    remainingSeconds,
    isFirst: index === 0,
    isLast:
      index === deck.length - 1,
    selectAnswer,
    goNext,
    goPrevious,
    submit,
  };
}