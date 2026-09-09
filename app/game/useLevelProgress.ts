import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import {
  clearAllQuizProgress,
  getAllQuizProgress,
  saveQuizProgress,
  type SavedQuizProgress,
} from "../../constants/flashcards/quizProgress";
import { useContent } from "../../lib/content/ContentProvider";
import { useStudyMode } from "../../lib/StudyModeProvider";
import {
  clearClearedSet,
  loadClearedSet,
  saveClearedSet,
  UNLOCK_PERCENT,
} from "../quiz/storage/cleared";
import { calcPercent } from "../quiz/utils/progress";
import type { QuizItem } from "./levelScreenTypes";

export function useLevelProgress({
  quizzes,
}: {
  quizzes: QuizItem[];
}) {
  const {
    structure,
    courseId,
  } = useContent();

  const { studyMode } =
    useStudyMode();

  const [
    progressByQuizId,
    setProgressByQuizId,
  ] = useState<
    Record<
      string,
      SavedQuizProgress
    >
  >({});

  const [
    clearedIds,
    setClearedIds,
  ] = useState<Set<string>>(
    new Set()
  );

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const [
          map,
          currentCleared,
        ] = await Promise.all([
          getAllQuizProgress(
            studyMode,
            courseId
          ),
          loadClearedSet(
            courseId
          ),
        ]);

        let changed = false;

        if (
          studyMode ===
          "guided"
        ) {
          for (
            const q of quizzes
          ) {
            const saved =
              map[q.id] ?? null;

            const unlockPercent =
              calcPercent(saved);

            if (
              unlockPercent >=
                UNLOCK_PERCENT &&
              !currentCleared.has(
                q.id
              )
            ) {
              currentCleared.add(
                q.id
              );

              changed = true;
            }
          }
        }

        if (!alive) {
          return;
        }

        if (changed) {
          await saveClearedSet(
            currentCleared,
            courseId
          );
        }

        if (!alive) {
          return;
        }

        setProgressByQuizId(
          map
        );

        setClearedIds(
          currentCleared
        );
      })();

      return () => {
        alive = false;
      };
    }, [
      quizzes,
      studyMode,
      courseId,
    ])
  );

  const resetAllProgress =
    useCallback(async () => {
      await Promise.all([
        clearAllQuizProgress(
          "guided",
          courseId
        ),
        clearAllQuizProgress(
          "free",
          courseId
        ),
        clearClearedSet(
          courseId
        ),
      ]);

      setClearedIds(
        new Set()
      );

      setProgressByQuizId(
        {}
      );
    }, [courseId]);

  const devCheatNextLockedTo100 =
    useCallback(
      async (
        unlockedIds: Set<string>
      ) => {
        if (
          quizzes.length === 0
        ) {
          return;
        }

        const nextQuiz =
          quizzes.find(
            (quiz) =>
              unlockedIds.has(
                quiz.id
              ) &&
              !clearedIds.has(
                quiz.id
              )
          );

        if (!nextQuiz) {
          return;
        }

        const currentId =
          nextQuiz.id;

        const fake: SavedQuizProgress =
          {
            quizId:
              currentId,
            progress: [
              "correct",
            ],
            score: 1,
            total: 1,
            updatedAt:
              Date.now(),
            firstTryCorrect: 1,
            firstTryTotal: 1,
          };

        await saveQuizProgress(
          fake,
          studyMode,
          courseId
        );

        setProgressByQuizId(
          (prev) => ({
            ...prev,
            [currentId]:
              fake,
          })
        );

        const nextCleared =
          new Set(
            clearedIds
          );

        nextCleared.add(
          currentId
        );

        await saveClearedSet(
          nextCleared,
          courseId
        );

        setClearedIds(
          nextCleared
        );
      },
      [
        quizzes,
        clearedIds,
        studyMode,
        courseId,
      ]
    );

  const devUnlockAllLevels =
    useCallback(async () => {
      const regularQuizIds =
        structure.units.map(
          (unit) => unit.id
        );

      const chapterQuizIds =
        structure.levels
          .map(
            (level) =>
              level.chapterQuizId
          )
          .filter(
            (
              id
            ): id is string =>
              Boolean(id)
          );

      const bonusQuizIds =
        structure.bonusLevels.map(
          (bonus) =>
            bonus.id
        );

      const uniqueQuizIds =
        Array.from(
          new Set([
            ...regularQuizIds,
            ...chapterQuizIds,
            ...bonusQuizIds,
          ])
        );

      const now =
        Date.now();

      const nextProgressByQuizId: Record<
        string,
        SavedQuizProgress
      > = {};

      const nextCleared =
        new Set(
          clearedIds
        );

      for (
        const quizId of
        uniqueQuizIds
      ) {
        const fake: SavedQuizProgress =
          {
            quizId,
            progress: [
              "correct",
            ],
            score: 1,
            total: 1,
            updatedAt: now,
            firstTryCorrect: 1,
            firstTryTotal: 1,
          };

        nextProgressByQuizId[
          quizId
        ] = fake;

        nextCleared.add(
          quizId
        );

        await saveQuizProgress(
          fake,
          "guided",
          courseId
        );
      }

      await saveClearedSet(
        nextCleared,
        courseId
      );

      setProgressByQuizId(
        (prev) => ({
          ...prev,
          ...nextProgressByQuizId,
        })
      );

      setClearedIds(
        nextCleared
      );
    }, [
      clearedIds,
      structure,
      courseId,
    ]);

  return {
    progressByQuizId,
    clearedIds,
    resetAllProgress,
    devCheatNextLockedTo100,
    devUnlockAllLevels,
  };
}