import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BonusDagersignalerIcon from "../../assets/menu/bonus_dagersignaler.svg";
import BonusDagersignalerOffIcon from "../../assets/menu/bonus_dagersignaler_off.svg";
import BonusFartDistansTidIcon from "../../assets/menu/bonus_fart_distans_tid.svg";
import BonusFartDistansTidOffIcon from "../../assets/menu/bonus_fart_distans_tid_off.svg";
import BonusFlaggorIcon from "../../assets/menu/bonus_flaggor.svg";
import BonusFlaggorOffIcon from "../../assets/menu/bonus_flaggor_off.svg";
import BonusFortojningslinorIcon from "../../assets/menu/bonus_fortojningslinor.svg";
import BonusFortojningslinorOffIcon from "../../assets/menu/bonus_fortojningslinor_off.svg";
import BonusKardinalmarkenIcon from "../../assets/menu/bonus_kardinalmarken.svg";
import BonusKardinalmarkenOffIcon from "../../assets/menu/bonus_kardinalmarken_off.svg";
import BonusKursberakingIcon from "../../assets/menu/bonus_kursberaking.svg";
import BonusKursberakingOffIcon from "../../assets/menu/bonus_kursberaking_off.svg";
import BonusLanternorIcon from "../../assets/menu/bonus_lanternor.svg";
import BonusLanternorOffIcon from "../../assets/menu/bonus_lanternor_off.svg";
import BonusLjudsignalerIcon from "../../assets/menu/bonus_ljudsignaler.svg";
import BonusLjudsignalerOffIcon from "../../assets/menu/bonus_ljudsignaler_off.svg";
import BonusNavigatorIcon from "../../assets/menu/bonus_navigator.svg";
import BonusNavigatorOffIcon from "../../assets/menu/bonus_navigator_off.svg";
import BonusSjomarkenIcon from "../../assets/menu/bonus_sjomarken.svg";
import BonusSjomarkenOffIcon from "../../assets/menu/bonus_sjomarken_off.svg";
import BonusSymbolerIcon from "../../assets/menu/bonus_symboler.svg";
import BonusSymbolerOffIcon from "../../assets/menu/bonus_symboler_off.svg";
import MapIcon from "../../assets/menu/map.svg";
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

const bonusIconsById: Record<
  string,
  {
    on: React.ComponentType<any>;
    off?: React.ComponentType<any>;
  }
> = {
  bonus_dagersignaler: {
    on: BonusDagersignalerIcon,
    off: BonusDagersignalerOffIcon,
  },
  bonus_fart_distans_tid: {
    on: BonusFartDistansTidIcon,
    off: BonusFartDistansTidOffIcon,
  },
  bonus_flaggor: {
    on: BonusFlaggorIcon,
    off: BonusFlaggorOffIcon,
  },
  bonus_fortojningslinor: {
    on: BonusFortojningslinorIcon,
    off: BonusFortojningslinorOffIcon,
  },
  bonus_kursberakning: {
    on: BonusKursberakingIcon,
    off: BonusKursberakingOffIcon,
  },
  bonus_lanternor: {
    on: BonusLanternorIcon,
    off: BonusLanternorOffIcon,
  },
  bonus_ljudsignaler: {
    on: BonusLjudsignalerIcon,
    off: BonusLjudsignalerOffIcon,
  },
  bonus_navigator: {
    on: BonusNavigatorIcon,
    off: BonusNavigatorOffIcon,
  },
  bonus_sjomarken: {
    on: BonusSjomarkenIcon,
    off: BonusSjomarkenOffIcon,
  },
  bonus_symboler: {
    on: BonusSymbolerIcon,
    off: BonusSymbolerOffIcon,
  },
  bonus_kardinal: {
    on: BonusKardinalmarkenIcon,
    off: BonusKardinalmarkenOffIcon,
  },
};

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
      


      

            <Pressable
            onPress={() =>
        router.push({
          pathname: "/game/chapters",
          params: { currentLevelId: levelId },
        })
      }
      >
       <MapIcon width={64} height={64} />
      </Pressable>

<ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bonusBar}
         style={{minHeight: 64 }}
      >
        {bonusQuizzes.map((quiz) => {
  const bonus =
    safeBonusLevels.find((entry) => entry.id === quiz.id) ?? null;
  const isUnlocked = bonus ? unlockedBonusIds.has(bonus.id) : false;

  const iconSet = bonusIconsById[quiz.id];
  const BonusIcon = isUnlocked ? iconSet?.on : iconSet?.off ?? iconSet?.on;

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
      style={styles.bonusBtn}
    >
       <BonusIcon width={58} height={62} />
     
    </Pressable>
  );
})}
      </ScrollView>
      

      <ScrollView contentContainerStyle={styles.container}>
       

        <LevelMapView
          levelId={levelId}
           levelLabel={currentLevel.label}
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

      <DevMenu
        showDevMenu={showDevMenu}
        onToggle={() => setShowDevMenu((prev) => !prev)}
        onReset={resetAllProgress}
        onUnlockNext={() => devCheatNextLockedTo100(unlockedIds)}
        onUnlockAll={devUnlockAllLevels}
      />
    </SafeAreaView>
  );
}