import { colorScheme } from "@/constants/colors";
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

import ProgressRing from "./components/ProgressRing";
import { getIconNameByQuizId } from "./icons/quizIconMap";
import SvgIcon from "./icons/svgIcon";
import {
  loadClearedSet,
  saveClearedSet,
  UNLOCK_PERCENT,
} from "./storage/cleared";
import { styles } from "./styles";
import { calcPercent } from "./utils/progress";

function getNextLockedQuizId(quizzes: { id: string }[], unlockedIds: Set<string>) {
  for (const q of quizzes) {
    if (!unlockedIds.has(q.id)) return q.id;
  }
  return null;
}

export default function QuizMenuScreen() {
  const quizzes = useMemo(() => getQuizzes("forarintyg"), []);
  
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
          const percent = calcPercent(saved);

          if (percent >= UNLOCK_PERCENT && !currentCleared.has(q.id)) {
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
    const targetId = getNextLockedQuizId(quizzes, unlockedIds);
    if (!targetId) return;

    const fake: SavedQuizProgress = {
      quizId: targetId,
      progress: ["correct"],
      score: 1,
      total: 1,
      updatedAt: Date.now(),
    };

    await saveQuizProgress(fake);
    setProgressByQuizId((prev) => ({ ...prev, [targetId]: fake }));

    const nextCleared = new Set(clearedIds);
    nextCleared.add(targetId);

    await saveClearedSet(nextCleared);
    setClearedIds(nextCleared);
  }, [quizzes, unlockedIds, clearedIds]);

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

        <View style={styles.grid}>
          {quizzes.map((q) => {
            const saved = progressByQuizId[q.id] ?? null;
            const percent = calcPercent(saved);

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
                  <View style={styles.ringWrap}>
  <ProgressRing percent={percent} size={76} strokeWidth={7}>
    <View style={styles.iconInner}>
      <SvgIcon
        name={iconName}
        size={30}
        color={isUnlocked ? colorScheme.blue : "rgba(255,255,255,0.55)"}
      />
    </View>
  </ProgressRing>

  {!isUnlocked ? (
    <View style={styles.lockBadge}>
      <SvgIcon name="lock" size={14} color="#ffffff" />
    </View>
  ) : null}
</View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
