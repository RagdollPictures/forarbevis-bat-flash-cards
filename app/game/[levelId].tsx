import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MapIcon from "../../assets/menu/map.svg";
import { colorSchemeGui } from "../../constants/colors";
import { bonusIconsById } from "../../content/assets/bonusIcons";
import { course } from "../../content/course";

import { useContent } from "../../lib/content/ContentProvider";
import { getQuizzesForChapterFromStructure } from "../../lib/content/courseStructureSelectors";

import { styles } from "../quiz/styles";

import DevMenu from "./DevMenu";
import HeaderMiniMap from "./HeaderMiniMap";
import LevelMapView from "./LevelMapView";
import { getVisibleSvgLayerIds } from "./getVisibleSvgLayerIds";
import { useCourseLevelConfig } from "./useCourseLevelConfig";

import {
  getBgAnchor,
  getObjectAnchors,
  getPlacedNodes,
  getTitleNodes,
} from "./levelNodeMapper";

import type {
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
  const { isReady } = useCourseLevelConfig();

  if (!isReady) {
    return null;
  }

  return <QuizMenuScreenContent />;
}

function QuizMenuScreenContent() {
  const { structure } = useContent();

  const {
    levelIds,
    levelsById,
  } = useCourseLevelConfig();

  const [showDevMenu, setShowDevMenu] =
    useState(false);

  const [
    bonusContainerWidth,
    setBonusContainerWidth,
  ] = useState(1);

  const [
    bonusContentWidth,
    setBonusContentWidth,
  ] = useState(1);

  const [
    levelAreaHeight,
    setLevelAreaHeight,
  ] = useState(0);

  const scrollX = useRef(
    new Animated.Value(0)
  ).current;

  const scrollY = useRef(
    new Animated.Value(0)
  ).current;

  const params =
    useLocalSearchParams<{
      levelId?: string;
    }>();

  const levelMap =
    levelsById as Record<
      string,
      MenuLevel
    >;

  const levelId =
    params.levelId &&
    levelMap[params.levelId]
      ? params.levelId
      : levelIds[0];

  const currentLevel =
    levelMap[levelId];

  const layout =
    currentLevel.layout;

  const LevelSvg =
    currentLevel.Svg;

  const theme =
    currentLevel.theme;

  const visibleSvgLayerIds =
    useMemo(() => {
      return getVisibleSvgLayerIds(
        theme
      );
    }, [theme]);

const safeBonusLevels =
  structure.bonusLevels;

  const quizzes = useMemo(
    () =>
      getQuizzesForChapterFromStructure(
        {
          structure,
          chapterId:
            currentLevel.chapterId,
          sourceId:
            course.sourceId,
          courseId:
            course.id,
        }
      ),
    [
      structure,
      currentLevel.chapterId,
    ]
  );

  const bonusQuizzes = useMemo(
    () =>
      getQuizzesForChapterFromStructure(
        {
          structure,
          chapterId: "bonus",
          sourceId:
            course.sourceId,
          courseId:
            course.id,
        }
      ) as QuizItem[],
    [structure]
  );

  const screenWidth =
    Dimensions.get(
      "window"
    ).width;

  const scale =
    screenWidth /
    layout.viewBox.width;

  const placedNodes =
    useMemo(() => {
      return getPlacedNodes(
        layout,
        quizzes
      );
    }, [layout, quizzes]);

  const lastNodeY =
    placedNodes.length > 0
      ? Math.max(
          ...placedNodes.map(
            (node) => node.y
          )
        )
      : layout.viewBox.height;

  const contentHeight =
    (lastNodeY + 250) *
    scale;

  const titleNodes =
    useMemo(() => {
      return getTitleNodes(
        layout,
        quizzes
      );
    }, [layout, quizzes]);

  const bgAnchor =
    useMemo(() => {
      return getBgAnchor(
        layout
      );
    }, [layout]);

  const objectAnchors =
    useMemo(() => {
      return getObjectAnchors(
        layout
      );
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
});
  const unlockedIds =
    useMemo(() => {
      return getUnlockedQuizIds(
        quizzes,
        clearedIds
      );
    }, [
      quizzes,
      clearedIds,
    ]);

  const unlockedBonusIds =
    useMemo(() => {
      return getUnlockedBonusIds(
        safeBonusLevels,
        clearedIds
      );
    }, [
      clearedIds,
      safeBonusLevels,
    ]);

  const unlockedLevelIds =
    useMemo(() => {
      return getUnlockedLevelIds(
        levelIds,
        clearedIds,
        structure
      );
    }, [
      levelIds,
      clearedIds,
      structure,
    ]);

  const handlePressReadNode =
    useCallback(
      (node: ReadPlacedNode) => {
        runRouteTransition({
          nodeId: node.id,
          go: () => {
            router.push({
              pathname:
                "/read/[deckId]",
              params: {
                deckId:
                  node.deckId,
                title:
                  node.title,
              },
            });
          },
        });
      },
      [runRouteTransition]
    );

  const handlePressQuizNode =
    useCallback(
      (
        node:
          | QuizPlacedNode
          | ChapterTestPlacedNode
      ) => {
        runRouteTransition({
          nodeId: node.id,
          go: () => {
            router.push(
              `/quiz/${node.quizId}`
            );
          },
        });
      },
      [runRouteTransition]
    );

  const bonusThumbWidth =
    useMemo(() => {
      if (
        bonusContainerWidth <= 0 ||
        bonusContentWidth <= 0
      ) {
        return 0;
      }

      const rawWidth =
        (bonusContainerWidth /
          bonusContentWidth) *
        bonusContainerWidth;

      return Math.max(
        28,
        Math.min(
          bonusContainerWidth,
          rawWidth
        )
      );
    }, [
      bonusContainerWidth,
      bonusContentWidth,
    ]);

  const bonusMaxScroll =
    Math.max(
      1,
      bonusContentWidth -
        bonusContainerWidth
    );

  const bonusMaxThumbTravel =
    Math.max(
      0,
      bonusContainerWidth -
        bonusThumbWidth
    );

  const bonusThumbTranslateX =
    scrollX.interpolate({
      inputRange: [
        0,
        bonusMaxScroll,
      ],
      outputRange: [
        0,
        bonusMaxThumbTravel,
      ],
      extrapolate:
        "clamp",
    });

  const backgroundParallaxFactor =
    theme.backgroundParallaxFactor ??
    0.5;

  const foregroundHeight =
    contentHeight;

  const backgroundHeight =
    foregroundHeight *
    backgroundParallaxFactor;

  const maxForegroundScroll =
    Math.max(
      1,
      foregroundHeight -
        levelAreaHeight
    );

  const maxBackgroundTravel =
    Math.max(
      0,
      backgroundHeight -
        levelAreaHeight
    );

  const bgTranslateY =
    scrollY.interpolate({
      inputRange: [
        0,
        maxForegroundScroll,
      ],
      outputRange: [
        0,
        -maxBackgroundTravel,
      ],
      extrapolate:
        "clamp",
    });

  const showBonusScrollbar =
    bonusContentWidth >
    bonusContainerWidth + 1;

  const BackgroundSvg =
    theme.backgroundSvg;

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <View
        style={{
          flexDirection:
            "row",
          alignItems:
            "center",
          backgroundColor:
            colorSchemeGui.slate_900,
          paddingHorizontal:
            12,
          paddingTop: 4,
          gap: 10,
        }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname:
                "/game/chapters",
              params: {
                currentLevelId:
                  levelId,
              },
            })
          }
          style={{
            width: 64,
            height: 64,
            alignItems:
              "center",
            justifyContent:
              "center",
            flexShrink: 0,
          }}
        >
          <MapIcon
            width={64}
            height={64}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            router.push({
              pathname:
                "/game/chapters",
              params: {
                currentLevelId:
                  levelId,
              },
            })
          }
          style={{
            flex: 1,
            justifyContent:
              "center",
          }}
        >
          <HeaderMiniMap
            currentLevelId={
              levelId
            }
            unlockedLevelIds={
              unlockedLevelIds
            }
          />
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor:
            colorSchemeGui.slate_700,
        }}
        onLayout={(
          event
        ) => {
          setBonusContainerWidth(
            event.nativeEvent
              .layout.width
          );
        }}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={{
            minHeight: 64,
          }}
          contentContainerStyle={
            styles.bonusBar
          }
          onContentSizeChange={(
            width
          ) => {
            setBonusContentWidth(
              width
            );
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver:
                false,
            }
          )}
          scrollEventThrottle={
            16
          }
        >
          {bonusQuizzes.map(
            (quiz) => {
              const bonus =
                safeBonusLevels.find(
                  (entry) =>
                    entry.id ===
                    quiz.id
                ) ?? null;

              const isUnlocked =
                bonus
                  ? unlockedBonusIds.has(
                      bonus.id
                    )
                  : false;

              const iconSet =
                bonusIconsById[
                  quiz.id
                ];

              const BonusIcon =
                isUnlocked
                  ? iconSet?.on
                  : iconSet?.off ??
                    iconSet?.on;

              return (
                <Pressable
                  key={
                    quiz.id
                  }
                  disabled={
                    !isUnlocked
                  }
                  onPress={() => {
                    if (
                      !isUnlocked
                    ) {
                      return;
                    }

                    runRouteTransition(
                      {
                        go: () => {
                          router.push(
                            `/quiz/${quiz.id}`
                          );
                        },
                      }
                    );
                  }}
                  style={
                    styles.bonusBtn
                  }
                >
                 {BonusIcon ? (
                    <BonusIcon width={58} height={62} />
                  ) : null}
                </Pressable>
              );
            }
          )}
        </Animated.ScrollView>

        {showBonusScrollbar ? (
          <View
            style={{
              height: 4,
              marginHorizontal:
                12,
              marginTop: 2,
              marginBottom: 6,
              borderRadius:
                999,
              backgroundColor:
                colorSchemeGui.slate_900,
              overflow:
                "hidden",
            }}
          >
            <Animated.View
              style={{
                height: 4,
                width:
                  bonusThumbWidth,
                borderRadius:
                  999,
                backgroundColor:
                  colorSchemeGui.yellow,
                transform: [
                  {
                    translateX:
                      bonusThumbTranslateX,
                  },
                ],
              }}
            />
          </View>
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          position:
            "relative",
          overflow:
            "hidden",
          backgroundColor:
            colorSchemeGui.slate_900,
        }}
        onLayout={(
          event
        ) => {
          setLevelAreaHeight(
            event.nativeEvent
              .layout.height
          );
        }}
      >
        {BackgroundSvg ? (
          <Animated.View
            pointerEvents="none"
            style={{
              position:
                "absolute",
              left: 0,
              top: 0,
              width:
                screenWidth,
              height:
                backgroundHeight,
              transform: [
                {
                  translateY:
                    bgTranslateY,
                },
              ],
            }}
          >
            <BackgroundSvg
              width={
                screenWidth
              }
              height={
                backgroundHeight
              }
              preserveAspectRatio="xMidYMin slice"
            />
          </Animated.View>
        ) : null}

        <Animated.ScrollView
          contentContainerStyle={
            styles.container
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver:
                true,
            }
          )}
          scrollEventThrottle={
            16
          }
        >
          <LevelMapView
            levelId={
              levelId
            }
            levelLabel={
              currentLevel.label
            }
            chapterId={
              currentLevel.chapterId
            }
            layout={layout}
            scale={scale}
            screenWidth={
              screenWidth
            }
            LevelSvg={
              LevelSvg
            }
            visibleSvgLayerIds={
              visibleSvgLayerIds
            }
            bgAnchor={
              bgAnchor
            }
            placedNodes={
              placedNodes
            }
            titleNodes={
              titleNodes
            }
            objectAnchors={
              objectAnchors
            }
            objectMap={
              theme.objects
            }
            objectAssets={
              theme.objectAssets
            }
            unlockedIds={
              unlockedIds
            }
            progressByQuizId={
              progressByQuizId
            }
            pressedId={
              pressedId
            }
            transitioningId={
              transitioningId
            }
            theme={theme}
            contentHeight={
              contentHeight
            }
            onPressReadNode={
              handlePressReadNode
            }
            onPressQuizNode={
              handlePressQuizNode
            }
          />
        </Animated.ScrollView>
      </View>

      <DevMenu
        showDevMenu={
          showDevMenu
        }
        onToggle={() =>
          setShowDevMenu(
            (prev) => !prev
          )
        }
        onReset={
          resetAllProgress
        }
        onUnlockNext={() =>
          devCheatNextLockedTo100(
            unlockedIds
          )
        }
        onUnlockAll={
          devUnlockAllLevels
        }
      />
    </SafeAreaView>
  );
}