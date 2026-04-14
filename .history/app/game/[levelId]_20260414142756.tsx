import { colorScheme } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import level_001_bg from "../../assets/game/bg.jpg";
import { getQuizzesForChapter } from "../../constants/flashcards";
import {
  bonusLevels,
  isBonusUnlocked,
} from "../../constants/flashcards/bonusLevels";
import {
  getAllQuizProgress,
  saveQuizProgress,
  type SavedQuizProgress,
} from "../../constants/flashcards/quizProgress";
import FloatingNode from "../quiz/components/FloatingNode";
import ProgressRing from "../quiz/components/ProgressRing";
import { getIconNameByQuizId } from "../quiz/icons/quizIconMap";
import SvgIcon from "../quiz/icons/svgIcon";
import {
  loadClearedSet,
  saveClearedSet,
  UNLOCK_PERCENT,
} from "../quiz/storage/cleared";
import { styles } from "../quiz/styles";
import { calcPercent } from "../quiz/utils/progress";
import ChapterMenuMap from "./ChapterMenuMap";
import { getLevelId, levelIds, levelsById } from "./levelConfig";

type QuizItem = {
  id: string;
  title: string;
  subtitle?: string;
};

type MenuLevel = {
  chapterId: string;
  label: string;
  iconName: string;
  layout: any;
  Svg: any;
};

type BonusLevelItem = {
  id: string;
  title: string;
  unlockWhenClearedQuizId: string;
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
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);

  const params = useLocalSearchParams<{ levelId?: string }>();
  const levelId = getLevelId(params.levelId);

  const levelMap = levelsById as Record<string, MenuLevel>;
  const currentLevel = levelMap[levelId];
  const layout = currentLevel.layout;
  const LevelSvg = currentLevel.Svg;

  const safeBonusLevels = bonusLevels as BonusLevelItem[];

  const quizzes = useMemo(
    () =>
      getQuizzesForChapter("forarintyg", currentLevel.chapterId) as QuizItem[],
    [currentLevel.chapterId]
  );

  const bonusQuizzes = useMemo(
    () => getQuizzesForChapter("forarintyg", "bonus") as QuizItem[],
    []
  );

  const screenWidth = Dimensions.get("window").width;
  const scale = screenWidth / layout.viewBox.width;

  const placedNodes = useMemo<PlacedNode[]>(() => {
    const result: PlacedNode[] = [];

    for (const anchor of layout.anchors) {
      if (!("type" in anchor) || !("index" in anchor)) continue;

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

  const bgAnchor = useMemo(() => {
    return layout.anchors.find((anchor: any) => anchor.id === "anchor_bg");
  }, [layout]);

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

  const unlockedLevelIds = useMemo(() => {
    const s = new Set<string>();

    if (levelIds.length === 0) return s;

    s.add(levelIds[0]);

    for (let i = 1; i < levelIds.length; i++) {
      const prevLevelId = levelIds[i - 1];
      const prevLevel = levelMap[prevLevelId];

      if (!prevLevel) break;

      const prevQuizzes = getQuizzesForChapter(
        "forarintyg",
        prevLevel.chapterId
      ) as QuizItem[];

      const finalQuiz = prevQuizzes[prevQuizzes.length - 1];

      if (!finalQuiz) break;
      if (!clearedIds.has(finalQuiz.id)) break;

      s.add(levelIds[i]);
    }

    return s;
  }, [clearedIds, levelMap]);

  const unlockedBonusIds = useMemo(() => {
    const s = new Set<string>();

    for (const bonus of safeBonusLevels) {
      if (isBonusUnlocked(bonus.unlockWhenClearedQuizId, clearedIds)) {
        s.add(bonus.id);
      }
    }

    return s;
  }, [clearedIds, safeBonusLevels]);

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


  const devUnlockAllLevels = useCallback(async () => {
  const allQuizEntries = [
    ...levelIds.flatMap((id) => {
      const level = levelMap[id];
      if (!level) return [];

      return getQuizzesForChapter("forarintyg", level.chapterId) as QuizItem[];
    }),
    ...(getQuizzesForChapter("forarintyg", "bonus") as QuizItem[]),
  ];

  const uniqueQuizIds = Array.from(new Set(allQuizEntries.map((q) => q.id)));

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
}, [clearedIds, levelMap]);

  return (
    <SafeAreaView style={styles.safe}>
       {__DEV__ ? (
          <View style={styles.devPanel}>
            <Pressable
              onPress={() => setShowDevMenu((prev) => !prev)}
              style={styles.devResetBtn}
            >
              <Text style={styles.devResetText}>
                {showDevMenu ? "HIDE DEV MENU" : "SHOW DEV MENU"}
              </Text>
            </Pressable>

            {showDevMenu ? (
              <>
                

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

                <Pressable
  onPress={devUnlockAllLevels}
  style={styles.devResetBtn}
>
  <Text style={styles.devResetText}>DEV: UNLOCK ALL LEVELS</Text>
</Pressable>
              </>
            ) : null}
          </View>
        ) : null}

              <Pressable
  onPress={() => setShowLevelMenu((prev) => !prev)}
  style={styles.levelMenuToggle}
>
  <Text style={styles.levelMenuToggleText}>
    {showLevelMenu ? "DÖLJ KAPITEL" : "VISA KAPITEL"}
  </Text>
</Pressable>
      <ScrollView contentContainerStyle={styles.container}>
       

  

{showLevelMenu ? (
  <ChapterMenuMap
    currentLevelId={levelId}
    unlockedLevelIds={unlockedLevelIds}
  />
) : null}

        

        <View style={styles.bonusBar}>
          {bonusQuizzes.map((quiz) => {
            const bonus =
              safeBonusLevels.filter((entry) => entry.id === quiz.id)[0] ??
              null;
            const isUnlocked = bonus ? unlockedBonusIds.has(bonus.id) : false;

            return (
              <Pressable
                key={quiz.id}
                disabled={!isUnlocked}
                onPress={() => {
                  if (!isUnlocked) return;
                  router.push(`/quiz/${quiz.id}`);
                }}
                style={[styles.bonusBtn, !isUnlocked && styles.bonusBtnLocked]}
              >
                <Text style={styles.bonusBtnText}>
                  {isUnlocked ? quiz.title : `🔒 ${quiz.title}`}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={{
            position: "relative",
            width: "100%",
            height: layout.viewBox.height * scale,
          }}
        >
          {bgAnchor ? (
            <Image
              source={level_001_bg}
              contentFit="contain"
              style={{
                position: "absolute",
                left: (bgAnchor.x - layout.viewBox.width / 2) * scale,
                top: (bgAnchor.y - layout.viewBox.height / 2) * scale,
                width: layout.viewBox.width * scale,
                height: layout.viewBox.height * scale,
              }}
            />
          ) : null}

          <LevelSvg
            width={screenWidth}
            height={layout.viewBox.height * scale}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />

          {placedNodes.map((node) => {
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
                  <FloatingNode
  delay={(node.x + node.y) % 1200}
  amplitude={3}
  rotateDeg={1.5}
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
</FloatingNode>
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
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}