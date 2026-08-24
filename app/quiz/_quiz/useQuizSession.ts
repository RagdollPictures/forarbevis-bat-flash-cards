import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { saveQuizProgress } from "../../../constants/flashcards/quizProgress";
import type { FlashCard } from "../../../constants/flashcards/types";
import { shuffle } from "./shuffle";

const QUIZ_LENGTH = 10;

function shuffleArray<T>(
  array: T[]
): T[] {
  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function buildSessionDeck<T>(
  deck: T[]
): T[] {
  return shuffleArray(deck).slice(
    0,
    Math.min(
      QUIZ_LENGTH,
      deck.length
    )
  );
}

function clampInt(
  n: number,
  min: number,
  max: number
) {
  return Math.max(
    min,
    Math.min(max, n)
  );
}

type FrozenQuiz = {
  options: string[];
  optionImageUrls: (string | undefined)[];
  correctOptionIndex: number;
};

function emptyQuiz(): FrozenQuiz {
  return {
    options: [],
    optionImageUrls: [],
    correctOptionIndex: -1,
  };
}

function buildFrozenQuiz(
  card: FlashCard | undefined
): FrozenQuiz {
  if (
    !card?.options ||
    !Number.isInteger(
      card.correctOptionIndex
    )
  ) {
    return emptyQuiz();
  }

  const zipped =
    card.options.map(
      (
        text,
        originalIndex
      ) => ({
        text,


        imageUrl:
          card.optionImageUrls?.[
            originalIndex
          ],

        originalIndex,
      })
    );

  const shuffledOpts =
    shuffle(zipped);

  const correctOptionIndex =
    shuffledOpts.findIndex(
      (option) =>
        option.originalIndex ===
        card.correctOptionIndex
    );

  return {
    options:
      shuffledOpts.map(
        (option) =>
          option.text
      ),


    optionImageUrls:
      shuffledOpts.map(
        (option) =>
          option.imageUrl
      ),

    correctOptionIndex,
  };
}

export function useQuizSession({
  quizId,
  deck,
}: {
  quizId: string;
  deck: FlashCard[];
}) {
  const [
    queue,
    setQueue,
  ] = useState<FlashCard[]>([]);

  const [
    index,
    setIndex,
  ] = useState(0);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<
    number | null
  >(null);

  const [
    isChecked,
    setIsChecked,
  ] = useState(false);

  const [
    masteredIds,
    setMasteredIds,
  ] = useState<
    Set<string>
  >(new Set());

  const [
    isFinished,
    setIsFinished,
  ] = useState(false);

  const [
    progress,
    setProgress,
  ] = useState<
    (
      | "correct"
      | "wrong"
      | null
    )[]
  >([]);

  const [
    score,
    setScore,
  ] = useState(0);

  const [
    pendingMoveToEnd,
    setPendingMoveToEnd,
  ] = useState(false);

  const [
    meterPoints,
    setMeterPoints,
  ] = useState(0);

  const [
    seenIds,
    setSeenIds,
  ] = useState<
    Set<string>
  >(new Set());

  const [
    firstTryCorrectCount,
    setFirstTryCorrectCount,
  ] = useState(0);

  const [
    quiz,
    setQuiz,
  ] = useState<FrozenQuiz>(
    emptyQuiz()
  );

  // Starta / starta om sessionen
  // när quiz eller deck ändras.
  useEffect(() => {
    if (
      deck.length === 0
    ) {
      return;
    }

    const nextDeck =
      buildSessionDeck(deck);

    setQueue(nextDeck);

    setProgress(
      Array(
        nextDeck.length
      ).fill(null)
    );

    setIndex(0);

    setSelectedIndex(
      null
    );

    setIsChecked(false);

    setMasteredIds(
      new Set()
    );

    setIsFinished(false);

    setScore(0);

    setPendingMoveToEnd(
      false
    );

    setMeterPoints(0);

    setSeenIds(
      new Set()
    );

    setFirstTryCorrectCount(
      0
    );

    /*
     * VIKTIGT:
     *
     * Bygg quiz-alternativen direkt
     * från första kortet.
     *
     * Tidigare sattes quiz till tomt
     * här och vi förlitade oss på
     * nästa effect för att fylla det.
     * Det kunde lämna quizet med:
     *
     * options: []
     * correctOptionIndex: -1
     */
    setQuiz(
      buildFrozenQuiz(
        nextDeck[0]
      )
    );
  }, [quizId, deck]);

  const safeIndex =
    Math.min(
      index,
      Math.max(
        0,
        queue.length - 1
      )
    );

  const card =
    queue[safeIndex];

  const total =
    queue.length;

  /*
   * När aktuellt kort ändras
   * bygger vi ett nytt fryst quiz.
   *
   * Vi använder hela card-objektet
   * som dependency, inte bara id.
   * Det är viktigt när samma fråga
   * ersätts med ny data från cache/
   * Supabase.
   */
  useEffect(() => {
    if (!card) {
      return;
    }

    setQuiz(
      buildFrozenQuiz(card)
    );

    setSelectedIndex(
      null
    );

    setIsChecked(false);

    setPendingMoveToEnd(
      false
    );
  }, [card]);

  const masteredCount =
    masteredIds.size;

  const masteredPercent =
    useMemo(() => {
      if (total <= 0) {
        return 0;
      }

      return Math.round(
        (
          masteredCount /
          total
        ) * 100
      );
    }, [
      masteredCount,
      total,
    ]);

  const visualProgress =
    useMemo(() => {
      if (total <= 0) {
        return 0;
      }

      return (
        clampInt(
          meterPoints,
          0,
          total
        ) / total
      );
    }, [
      meterPoints,
      total,
    ]);

  useEffect(() => {
    if (!quizId) {
      return;
    }

    if (!isFinished) {
      return;
    }

    if (total === 0) {
      return;
    }

    const allCorrect =
      Array(total).fill(
        "correct"
      ) as (
        | "correct"
        | "wrong"
        | null
      )[];

    saveQuizProgress({
      quizId:
        String(quizId),

      progress:
        allCorrect,

      score: total,

      total,

      updatedAt:
        Date.now(),

      firstTryCorrect:
        firstTryCorrectCount,

      firstTryTotal:
        total,
    });
  }, [
    quizId,
    isFinished,
    total,
    firstTryCorrectCount,
  ]);

  const finishIfComplete = (
    nextMasteredSize: number
  ) => {
    if (total === 0) {
      return;
    }

    if (
      nextMasteredSize >=
      total
    ) {
      setIsFinished(true);

      setMeterPoints(
        total
      );
    }
  };

  const onSelect = (
    i: number
  ) => {
    if (
      isChecked ||
      isFinished
    ) {
      return;
    }

    if (
      quiz.correctOptionIndex <
      0
    ) {
      return;
    }

    if (!card?.id) {
      return;
    }

    const wasCorrect =
      i ===
      quiz.correctOptionIndex;

    if (
      !seenIds.has(card.id)
    ) {
      const nextSeen =
        new Set(seenIds);

      nextSeen.add(
        card.id
      );

      setSeenIds(
        nextSeen
      );

      if (wasCorrect) {
        setFirstTryCorrectCount(
          (count) =>
            count + 1
        );
      }
    }

    setSelectedIndex(i);

    setIsChecked(true);

    if (wasCorrect) {
      setPendingMoveToEnd(
        false
      );

      setProgress(
        (previous) => {
          const next = [
            ...previous,
          ];

          next[
            safeIndex
          ] = "correct";

          return next;
        }
      );

      setMeterPoints(
        (points) =>
          clampInt(
            points + 1,
            0,
            total
          )
      );

      setMasteredIds(
        (previous) => {
          if (
            previous.has(
              card.id
            )
          ) {
            return previous;
          }

          const next =
            new Set(
              previous
            );

          next.add(
            card.id
          );

          setScore(
            (currentScore) =>
              currentScore + 1
          );

          finishIfComplete(
            next.size
          );

          return next;
        }
      );

      return;
    }

    setPendingMoveToEnd(
      true
    );

    setProgress(
      (previous) => {
        const next = [
          ...previous,
        ];

        next[
          safeIndex
        ] = "wrong";

        return next;
      }
    );

    setMeterPoints(
      (points) =>
        clampInt(
          points - 1,
          0,
          total
        )
    );
  };

  const onNext = () => {
    if (isFinished) {
      return;
    }

    if (!isChecked) {
      return;
    }

    if (
      pendingMoveToEnd
    ) {
      setQueue(
        (previous) => {
          if (
            previous.length <=
            1
          ) {
            return previous;
          }

          const copy = [
            ...previous,
          ];

          const [
            current,
          ] = copy.splice(
            safeIndex,
            1
          );

          copy.push(
            current
          );

          return copy;
        }
      );

      setPendingMoveToEnd(
        false
      );

      setSelectedIndex(
        null
      );

      setIsChecked(false);

      return;
    }

    setSelectedIndex(
      null
    );

    setIsChecked(false);

    const next =
      safeIndex + 1;

    if (
      next >=
      queue.length
    ) {
      setIndex(0);
      return;
    }

    setIndex(next);
  };

  const restart = () => {
    if (
      deck.length === 0
    ) {
      return;
    }

    const nextDeck =
      buildSessionDeck(deck);

    setQueue(nextDeck);

    setProgress(
      Array(
        nextDeck.length
      ).fill(null)
    );

    setIndex(0);

    setSelectedIndex(
      null
    );

    setIsChecked(false);

    setMasteredIds(
      new Set()
    );

    setIsFinished(false);

    setScore(0);

    setPendingMoveToEnd(
      false
    );

    setMeterPoints(0);

    setSeenIds(
      new Set()
    );

    setFirstTryCorrectCount(
      0
    );

    setQuiz(
      buildFrozenQuiz(
        nextDeck[0]
      )
    );
  };

  return {
    shuffledDeck:
      queue,

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
