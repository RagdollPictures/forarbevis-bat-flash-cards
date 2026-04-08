// app/(tabs)/quiz-menu/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getQuizzes } from "../../../constants/flashcards";
import {
  getAllQuizProgress,
  type SavedQuizProgress,
  saveQuizProgress,
} from "../../../constants/flashcards/quizProgress";

import { colorScheme } from "@/constants/colors";
import ProgressRing from "./components/ProgressRing";
import { getIconNameByQuizId } from "./icons/quizIconMap";
import SvgIcon from "./icons/svgIcon";
import { loadClearedSet, saveClearedSet, UNLOCK_PERCENT } from "./storage/cleared";
import { styles } from "./styles";
import { calcPercent } from "./utils/progress";

type QuizItem = {
  id: string;
  title: string;
  subtitle?: string;
};

function getParentTitleFromSubtitle(subtitle?: string) {
  if (!subtitle) return "Övrigt";
  const parts = subtitle.split("•").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return "Övrigt";
  return parts[parts.length - 1];
}

function getFirstTryPercent(saved: SavedQuizProgress | null) {
  const total = saved?.firstTryTotal ?? 0;
  if (total <= 0) return 0;
  const correct = saved?.firstTryCorrect ?? 0;
  return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
}

export default function QuizMenuScreen() {
  const quizzes = useMemo(() => getQuizzes("forarintyg") as QuizItem[], []);

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

  // Unlock should keep using the ORIGINAL logic (calcPercent / mastery),
  // NOT first-try percent.
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

        if (changed) await saveClearedSet(currentCleared);
        setClearedIds(currentCleared);
      })();

      return () => {
        alive = false;
      };
    }, [progressByQuizId, quizzes])
  );

  const unlockedIds = useMemo(() => {
    const s = new Set<string>();
    if (quizzes.length === 0) return s;

    s.add(quizzes[0].id);

    for (let i = 0; i < quizzes.length - 1; i++) {
      const currentId = quizzes[i].id;
      const nextId = quizzes[i + 1].id;

      if (!clearedIds.has(currentId)) break;
      s.add(nextId);
    }

    return s;
  }, [quizzes, clearedIds]);

  const devCheatNextLockedTo100 = useCallback(async () => {
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

      // Also set first-try to 100% so ring matches the cheat
      firstTryCorrect: 1,
      firstTryTotal: 1,
    };

    await saveQuizProgress(fake);
    setProgressByQuizId((prev) => ({ ...prev, [currentId]: fake }));

    const nextCleared = new Set(clearedIds);
    nextCleared.add(currentId);

    await saveClearedSet(nextCleared);
    setClearedIds(nextCleared);
  }, [quizzes, unlockedIds, clearedIds]);

  const grouped = useMemo(() => {
    const order: string[] = [];
    const buckets: Record<string, QuizItem[]> = {};

    for (const q of quizzes) {
      const parentTitle = getParentTitleFromSubtitle(q.subtitle);

      if (!buckets[parentTitle]) {
        buckets[parentTitle] = [];
        order.push(parentTitle);
      }
      buckets[parentTitle].push(q);
    }

    return order.map((title) => ({
      title,
      items: buckets[title],
    }));
  }, [quizzes]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {__DEV__ ? (
          <View style={styles.devPanel}>
            <Pressable
              onPress={async () => {
                await AsyncStorage.clear();
                setClearedIds(new Set());
                setProgressByQuizId({});
              }}
              style={styles.devResetBtn}
            >
              <Text style={styles.devResetText}>RESET ALL DATA (DEV)</Text>
            </Pressable>

            <Pressable onPress={devCheatNextLockedTo100} style={styles.devResetBtn}>
              <Text style={styles.devResetText}>DEV: SET NEXT LOCKED TO 100%</Text>
            </Pressable>
          </View>
        ) : null}

        {grouped.map((section) => (
          <View key={`chapter-${section.title}`}>
            <Text
              style={{
                marginTop: 18,
                marginBottom: 10,
                fontSize: 14,
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {section.title}
            </Text>

            <View style={styles.grid}>
              {section.items.map((q) => {
                const saved = progressByQuizId[q.id] ?? null;

                // Ring should show first-try percent
                const ringPercent = getFirstTryPercent(saved);

                const isUnlocked = unlockedIds.has(q.id);
                const iconName = getIconNameByQuizId(q.id);

                return (
                  <Pressable
                    key={q.id}
                    onPress={() => {
                      if (!isUnlocked) return;
                      router.push(`/quiz/${q.id}`);
                    }}
                    disabled={!isUnlocked}
                    style={[styles.tile, !isUnlocked && styles.tileLocked]}
                  >
                    <View style={styles.ringWrap}>
                      <ProgressRing percent={ringPercent} size={90} strokeWidth={7}>
                        <View style={styles.iconInner}>
                          <SvgIcon
                            name={iconName}
                            size={30}
                            color={isUnlocked ? colorScheme.darkBlue : "#bbb"}
                          />
                        </View>
                      </ProgressRing>

                      {!isUnlocked ? (
                        <View style={styles.lockBadge}>
                          <SvgIcon name="lock" size={14} color="#ffffff" />
                        </View>
                      ) : null}
                    </View>

                    <Text
                      numberOfLines={2}
                      style={[styles.title, !isUnlocked && styles.titleLocked]}
                    >
                      {q.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
