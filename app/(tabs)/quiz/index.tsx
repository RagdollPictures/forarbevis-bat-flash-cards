import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import level1 from "../../../assets/game/level_001.json";
import LevelSvg from "../../../assets/game/level_001.svg";
import { getQuizzes } from "../../../constants/flashcards";
import {
  getAllQuizProgress,
  type SavedQuizProgress,
  saveQuizProgress,
} from "../../../constants/flashcards/quizProgress";
import type { LevelLayout } from "./levelTypes";

import { colorScheme } from "@/constants/colors";
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

type QuizItem = {
  id: string;
  title: string;
  subtitle?: string;
};

type PlacedNode =
  | {
      id: string;
      type: "read";
      deckId: string;
      title: string;
      quizId: string;
      x: number;
      y: number;
    }
  | {
      id: string;
      type: "quiz";
      quizId: string;
      title: string;
      subtitle?: string;
      x: number;
      y: number;
    };

function getFirstTryPercent(saved: SavedQuizProgress | null) {
  const total = saved?.firstTryTotal ?? 0;
  if (total <= 0) return 0;

  const correct = saved?.firstTryCorrect ?? 0;
  return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
}

export default function QuizMenuScreen() {
  const quizzes = useMemo(() => getQuizzes("forarintyg") as QuizItem[], []);
  const layout = level1 as LevelLayout;

  const screenWidth = Dimensions.get("window").width;
  const scale = screenWidth / layout.viewBox.width;

 const placedNodes = useMemo<PlacedNode[]>(() => {
  const result: PlacedNode[] = [];

  for (const anchor of layout.anchors) {
    if (typeof anchor.index !== "number") continue;

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
}, [layout, quizzes]);

  const firstNodes = useMemo(() => placedNodes.slice(0, 3), [placedNodes]);

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

            <Pressable
              onPress={devCheatNextLockedTo100}
              style={styles.devResetBtn}
            >
              <Text style={styles.devResetText}>
                DEV: SET NEXT LOCKED TO 100%
              </Text>
            </Pressable>
          </View>
        ) : null}

        <View
  style={{
    position: "relative",
    width: "100%",
    height: layout.viewBox.height * scale,
  }}
>
  {/* SVG BACKGROUND */}
  <LevelSvg
    width={screenWidth}
    height={layout.viewBox.height * scale}
    style={{
      position: "absolute",
      left: 0,
      top: 0,
    }}
  />
          {firstNodes.map((node) => {
            const left = node.x * scale - 45;
            const top = node.y * scale - 45;
            const isUnlocked = unlockedIds.has(node.quizId);

            if (node.type === "read") {
              return (
                <Pressable
                  key={node.id}
                  onPress={() =>
                    router.push({
                      pathname: "/read/[deckId]",
                      params: {
                        deckId: node.deckId,
                        title: node.title,
                      },
                    })
                  }
                  disabled={!isUnlocked}
                  style={[
                    styles.absoluteNode,
                    { left, top },
                    !isUnlocked && styles.tileLocked,
                  ]}
                >
                  <View style={styles.ringWrap}>
                    <View style={styles.readCircle}>
                      <View style={styles.iconInner}>
                        <SvgIcon
                          name="book"
                          size={30}
                          color={isUnlocked ? colorScheme.darkBlue : "#bbb"}
                        />
                      </View>
                    </View>

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
                    {node.title}
                  </Text>
                </Pressable>
              );
            }

            const saved = progressByQuizId[node.quizId] ?? null;
            const ringPercent = getFirstTryPercent(saved);
            const iconName = getIconNameByQuizId(node.quizId);

            return (
              <Pressable
                key={node.id}
                onPress={() => {
                  if (!isUnlocked) return;
                  router.push(`/quiz/${node.quizId}`);
                }}
                disabled={!isUnlocked}
                style={[
                  styles.absoluteNode,
                  { left, top },
                  !isUnlocked && styles.tileLocked,
                ]}
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
                  style={[styles.title, !isUnlocked && styles.tileLocked]}
                >
                  {node.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}