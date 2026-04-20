import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQuizzesForChapter } from "../../constants/flashcards";
import { bonusLevels } from "../../constants/flashcards/bonusLevels";
import { styles } from "../quiz/styles";
import DevMenu from "./DevMenu";
import LevelMapView from "./LevelMapView";
import { getVisibleSvgLayerIds } from "./getVisibleSvgLayerIds";
import { getLevelId, levelIds, levelsById } from "./levelConfig";
import {
  getBgAnchor,
  getObjectAnchors,
  getPlacedNodes,
  getTitleNodes,
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

  const params = useLocalSearchParams<{ levelId?: string }>();
  const levelId = getLevelId(params.levelId);

  const levelMap = levelsById as Record<string, MenuLevel>;
  const currentLevel = levelMap[levelId];
  const layout = currentLevel.layout;
  const LevelSvg = currentLevel.Svg;
  const theme = currentLevel.theme;

  const visibleSvgLayerIds = useMemo(() => {
    return getVisibleSvgLayerIds(theme);
  }, [theme]);

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

  const titleNodes = useMemo(() => {
    return getTitleNodes(layout, quizzes);
  }, [layout, quizzes]);

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

      <Pressable
       onPress={() =>
  router.push({
    pathname: "/game/chapters",
    params: { currentLevelId: levelId },
  })
}
      >
       <Text style={styles.levelMenuToggleText}>VISA KAPITEL</Text>
      </Pressable>

      <Text style={styles.headerTitle}>{currentLevel.label}</Text>

      <ScrollView contentContainerStyle={styles.container}>
       

        <LevelMapView
          levelId={levelId}
          layout={layout}
          scale={scale}
          screenWidth={screenWidth}
          LevelSvg={LevelSvg}
          visibleSvgLayerIds={visibleSvgLayerIds}
          bgAnchor={bgAnchor}
          placedNodes={placedNodes}
          titleNodes={titleNodes}
          objectAnchors={objectAnchors}
          objectMap={theme.objects}
          objectAssets={theme.objectAssets}
          unlockedIds={unlockedIds}
          progressByQuizId={progressByQuizId}
          pressedId={pressedId}
          transitioningId={transitioningId}
          theme={theme}
          onPressReadNode={handlePressReadNode}
          onPressQuizNode={handlePressQuizNode}
        />
      </ScrollView>
    </SafeAreaView>
  );
}