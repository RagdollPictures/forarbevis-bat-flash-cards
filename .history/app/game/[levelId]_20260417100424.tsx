import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQuizzesForChapter } from "../../constants/flashcards";
import { bonusLevels } from "../../constants/flashcards/bonusLevels";
import { styles } from "../quiz/styles";
import ChapterMenuMap from "./ChapterMenuMap";
import DevMenu from "./DevMenu";
import LevelMapView from "./LevelMapView";
import { getLevelId, levelIds, levelsById } from "./levelConfig";
import {
  getBgAnchor,
  getObjectAnchors,
  getPlacedNodes,
} from "./levelNodeMapper";
import type {
  BonusLevelItem,
  ChapterTestPlacedNode,
  MenuLevel,
  QuizItem,
  QuizPlacedNode,
  ReadPlacedNode,
} from "./levelScreenTypes";
import {
  getUnlockedBonusIds,
  getUnlockedLevelIds,
  getUnlockedQuizIds,
} from "./levelUnlocks";
import { useLevelNavigation } from "./useLevelNavigation";
import { useLevelProgress } from "./useLevelProgress";

export default function QuizMenuScreen() {
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [activeSectionTitle, setActiveSectionTitle] = useState("");

  const params = useLocalSearchParams<{ levelId?: string }>();
  const levelId = getLevelId(params.levelId);

  const levelMap = levelsById as Record<string, MenuLevel>;
  const currentLevel = levelMap[levelId];
  const layout = currentLevel.layout;
  const LevelSvg = currentLevel.Svg;
  const theme = currentLevel.theme;

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

  const placedNodes = useMemo(() => {
    return getPlacedNodes(layout, quizzes);
  }, [layout, quizzes]);

  const readNodes = useMemo(() => {
    return placedNodes
      .filter((node): node is ReadPlacedNode => node.type === "read")
      .sort((a, b) => a.y - b.y);
  }, [placedNodes]);

  useEffect(() => {
    setActiveSectionTitle(readNodes[0]?.title ?? currentLevel.label);
  }, [readNodes, currentLevel.label]);

  const handleScroll = useCallback(
    (event: any) => {
      const scrollY = event.nativeEvent.contentOffset.y;

      const probeY = scrollY / scale + 80;

      let currentTitle = readNodes[0]?.title ?? currentLevel.label;

      for (const node of readNodes) {
        if (node.y <= probeY) {
          currentTitle = node.title;
        } else {
          break;
        }
      }

      setActiveSectionTitle(currentTitle);
    },
    [readNodes, scale, currentLevel.label]
  );

  const bgAnchor = useMemo(() => {
    return getBgAnchor(layout);
  }, [layout]);

  const objectAnchors = useMemo(() => {
    return getObjectAnchors(layout);
  }, [layout]);

  const {
    pressedId,
    transitioningId,
    resetNodeStates,
    runRouteTransition,
  } = useLevelNavigation();

  useFocusEffect(
    useCallback(() => {
      resetNodeStates();
    }, [resetNodeStates])
  );

  const {
    progressByQuizId,
    clearedIds,
    resetAllProgress,
    devCheatNextLockedTo100,
    devUnlockAllLevels,
  } = useLevelProgress({
    quizzes,
    levelIds,
    levelMap,
  });

  const unlockedIds = useMemo(() => {
    return getUnlockedQuizIds(quizzes, clearedIds);
  }, [quizzes, clearedIds]);

  const unlockedLevelIds = useMemo(() => {
    return getUnlockedLevelIds(levelIds, levelMap, clearedIds);
  }, [levelIds, clearedIds, levelMap]);

  const unlockedBonusIds = useMemo(() => {
    return getUnlockedBonusIds(safeBonusLevels, clearedIds);
  }, [clearedIds, safeBonusLevels]);

  const handlePressReadNode = useCallback(
    (node: ReadPlacedNode) => {
      runRouteTransition({
        nodeId: node.id,
        delayMs: 240,
        go: () => {
          router.push({
            pathname: "/read/[deckId]",
            params: {
              deckId: node.deckId,
              title: node.title,
            },
          });
        },
      });
    },
    [runRouteTransition]
  );

  const handlePressQuizNode = useCallback(
    (node: QuizPlacedNode | ChapterTestPlacedNode) => {
      runRouteTransition({
        nodeId: node.id,
        delayMs: 240,
        go: () => {
          router.push(`/quiz/${node.quizId}`);
        },
      });
    },
    [runRouteTransition]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <DevMenu
        showDevMenu={showDevMenu}
        onToggle={() => setShowDevMenu((prev) => !prev)}
        onReset={resetAllProgress}
        onUnlockNext={() => devCheatNextLockedTo100(unlockedIds)}
        onUnlockAll={devUnlockAllLevels}
      />

      <Pressable
        onPress={() => setShowLevelMenu((prev) => !prev)}
        style={styles.levelMenuToggle}
      >
        <Text style={styles.levelMenuToggleText}>
          {showLevelMenu ? "DÖLJ KAPITEL" : "VISA KAPITEL"}
        </Text>
      </Pressable>


      <ScrollView
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {showLevelMenu ? (
          <ChapterMenuMap
            currentLevelId={levelId}
            unlockedLevelIds={unlockedLevelIds}
          />
        ) : null}

        <Text style={styles.sectionTitle}>Bonus</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bonusBar}
        >
          {bonusQuizzes.map((quiz) => {
            const bonus =
              safeBonusLevels.find((entry) => entry.id === quiz.id) ?? null;
            const isUnlocked = bonus ? unlockedBonusIds.has(bonus.id) : false;

            return (
              <Pressable
                key={quiz.id}
                disabled={!isUnlocked}
                onPress={() => {
                  if (!isUnlocked) return;

                  runRouteTransition({
                    delayMs: 240,
                    go: () => {
                      router.push(`/quiz/${quiz.id}`);
                    },
                  });
                }}
                style={[styles.bonusBtn, !isUnlocked && styles.bonusBtnLocked]}
              >
                <Text style={styles.bonusBtnText}>
                  {isUnlocked ? quiz.title : `🔒 ${quiz.title}`}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.headerTitle}>{currentLevel.label}</Text>

        <LevelMapView
          layout={layout}
          scale={scale}
          screenWidth={screenWidth}
          LevelSvg={LevelSvg}
          bgAnchor={bgAnchor}
          bgImageSource={theme.bgImageSource}
          platformImageSource={theme.platformImageSource}
          placedNodes={placedNodes}
          objectAnchors={objectAnchors}
          objectMap={theme.objects}
          objectAssets={theme.objectAssets}
          unlockedIds={unlockedIds}
          progressByQuizId={progressByQuizId}
          pressedId={pressedId}
          transitioningId={transitioningId}
          onPressReadNode={handlePressReadNode}
          onPressQuizNode={handlePressQuizNode}
        />
      </ScrollView>
    </SafeAreaView>
  );
}