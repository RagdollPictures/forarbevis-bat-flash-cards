import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  getAllQuizProgress,
  saveQuizProgress,
  type SavedQuizProgress,
} from "../../constants/flashcards/quizProgress";
import {
  loadClearedSet,
  saveClearedSet,
  UNLOCK_PERCENT,
} from "../quiz/storage/cleared";
import { calcPercent } from "../quiz/utils/progress";
import type { MenuLevel, QuizItem } from "./levelScreenTypes";

export function useLevelProgress({
  quizzes,
  levelIds,
  levelMap,
}: {
  quizzes: QuizItem[];
  levelIds: readonly string[];
  levelMap: Record<string, MenuLevel>;
}) {
  const [progressByQuizId, setProgressByQuizId] = useState<
    Record<string, SavedQuizProgress>
  >({});
  const [clearedIds, setClearedIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const [map, cleared] = await Promise.all([
          getAllQuizProgress(),
          loadClearedSet(),
        ]);

        if (!alive) return;

        setProgressByQuizId(map);
        setClearedIds(cleared);
      })();

      return () => {
        alive = false;
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const currentCleared = await loadClearedSet();
        let changed = false;

        for (const q of quizzes) {
          const saved = progressByQuizId[q.id] ?? null;
          const unlockPercent = calcPercent(saved);

          if (unlockPercent >= UNLOCK_PERCENT && !currentCleared.has(q.id)) {
            currentCleared.add(q.id);
            changed = true;
          }
        }

        if (!alive) return;

        if (changed) {
          await saveClearedSet(currentCleared);
        }

        setClearedIds(currentCleared);
      })();

      return () => {
        alive = false;
      };
    }, [progressByQuizId, quizzes])
  );

  const resetAllProgress = useCallback(async () => {
    await AsyncStorage.clear();
    setClearedIds(new Set());
    setProgressByQuizId({});
  }, []);

  const devCheatNextLockedTo100 = useCallback(
    async (unlockedIds: Set<string>) => {
      if (quizzes.length === 0) return;

      let currentId = quizzes[0].id;

      for (let i = 0; i < quizzes.length - 1; i++) {
        const id = quizzes[i].id;

        if (!unlockedIds.has(id)) break;

        currentId = id;

        if (!clearedIds.has(id)) break;
      }

      const fake: SavedQuizProgress = {
        quizId: currentId,
        progress: ["correct"],
        score: 1,
        total: 1,
        updatedAt: Date.now(),
        firstTryCorrect: 1,
        firstTryTotal: 1,
      };

      await saveQuizProgress(fake);
      setProgressByQuizId((prev) => ({ ...prev, [currentId]: fake }));

      const nextCleared = new Set(clearedIds);
      nextCleared.add(currentId);

      await saveClearedSet(nextCleared);
      setClearedIds(nextCleared);
    },
    [quizzes, clearedIds]
  );

  const devUnlockAllLevels = useCallback(async () => {
    const allQuizEntries = levelIds.flatMap((id) => {
      const level = levelMap[id];
      if (!level) return [];

      return quizzes.constructor === Array
        ? ((require("../../constants/flashcards").getQuizzesForChapter(
            "forarintyg",
            level.chapterId
          ) as QuizItem[]) ?? [])
        : [];
    });

    const bonusEntries =
      (require("../../constants/flashcards").getQuizzesForChapter(
        "forarintyg",
        "bonus"
      ) as QuizItem[]) ?? [];

    const uniqueQuizIds = Array.from(
      new Set([...allQuizEntries, ...bonusEntries].map((q) => q.id))
    );

    const now = Date.now();

    const nextProgressByQuizId: Record<string, SavedQuizProgress> = {};
    const nextCleared = new Set(clearedIds);

    for (const quizId of uniqueQuizIds) {
      const fake: SavedQuizProgress = {
        quizId,
        progress: ["correct"],
        score: 1,
        total: 1,
        updatedAt: now,
        firstTryCorrect: 1,
        firstTryTotal: 1,
      };

      nextProgressByQuizId[quizId] = fake;
      nextCleared.add(quizId);

      await saveQuizProgress(fake);
    }

    await saveClearedSet(nextCleared);

    setProgressByQuizId((prev) => ({
      ...prev,
      ...nextProgressByQuizId,
    }));
    setClearedIds(nextCleared);
  }, [clearedIds, levelIds, levelMap, quizzes.constructor]);

  return {
    progressByQuizId,
    clearedIds,
    resetAllProgress,
    devCheatNextLockedTo100,
    devUnlockAllLevels,
  };
}