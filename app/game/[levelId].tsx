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
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MapIcon from "../../assets/menu/map.svg";
import { colorSchemeGui } from "../../constants/colors";

import { course } from "../../content/course";

import { useContent } from "../../lib/content/ContentProvider";
import { getQuizzesForChapterFromStructure } from "../../lib/content/courseStructureSelectors";

import { styles } from "../quiz/styles";

import HeaderMiniMap from "./HeaderMiniMap";
import LevelMapView from "./LevelMapView";
import { getVisibleSvgLayerIds } from "./getVisibleSvgLayerIds";
import { useCourseLevelConfig } from "./useCourseLevelConfig";

import {
  getBgAnchor,
  getGraphicsAnchors,
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

import { SvgXml } from "react-native-svg";
import { useStudyMode } from "../../lib/StudyModeProvider";

import {
  loadFreeModeLastNode,
  saveFreeModeLastNode,
} from "../../lib/freeModeLastNode";

import { FontAwesome } from "@expo/vector-icons";

export default function QuizMenuScreen() {
  const { isReady } = useCourseLevelConfig();

  if (!isReady) {
    return null;
  }

  return <QuizMenuScreenContent />;
}

function QuizMenuScreenContent() {

  const { width: windowWidth } = useWindowDimensions();

  const {
  structure,
  courseId,
} = useContent();
  
const { studyMode } =
  useStudyMode();

  const {
    levelIds,
    levelsById,
  } = useCourseLevelConfig();

 
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

  const [
  lastFreeNodeId,
  setLastFreeNodeId,
] = useState<string | null>(
  null
);

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
            courseId,
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
            courseId,
        }
      ) as QuizItem[],
    [structure]
  );

  const screenWidth = Math.min(windowWidth, 600);

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

    const levelGraphics =
  useMemo(() => {
    return structure.levelGraphics
      .filter(
        (graphic) =>
          graphic.levelId === levelId
      )
      .sort(
        (a, b) =>
          a.graphicsIndex -
          b.graphicsIndex
      );
  }, [
    structure.levelGraphics,
    levelId,
  ]);

    const graphicsAnchors =
  useMemo(() => {
    return getGraphicsAnchors(
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

  useFocusEffect(
  useCallback(() => {
    let alive = true;

    if (studyMode !== "free") {
     

      return;
    }

    (async () => {
      const saved =
        await loadFreeModeLastNode(
          courseId,
          levelId
        );

      if (!alive) {
        return;
      }

      setLastFreeNodeId(
        saved
      );
    })();

    return () => {
      alive = false;
    };
  }, [
    studyMode,
    levelId,
  ])
);

 const {
  progressByQuizId,
  clearedIds,
} = useLevelProgress({
  quizzes,
});
 const unlockedIds =
  useMemo(() => {
    if (studyMode === "free") {
      return new Set(
        quizzes.map(
          (quiz) => quiz.id
        )
      );
    }

    return getUnlockedQuizIds(
      quizzes,
      clearedIds
    );
  }, [
    studyMode,
    quizzes,
    clearedIds,
  ]);

const currentGraphicsIndex =
  useMemo(() => {
    const regularQuizzes =
      quizzes.slice(0, -1);

    const chapterTest =
      quizzes[
        quizzes.length - 1
      ];

    /*
     * TRÄNA FRITT:
     * Räven står vid senast öppnade nod.
     */
    if (
      studyMode === "free" &&
      lastFreeNodeId
    ) {
      const regularIndex =
        regularQuizzes.findIndex(
          (quiz) =>
            quiz.id ===
            lastFreeNodeId
        );

      if (regularIndex >= 0) {
        return regularIndex + 1;
      }

      if (
        chapterTest?.id ===
        lastFreeNodeId
      ) {
        return regularQuizzes.length;
      }
    }

    /*
     * Träna fritt + ingen nod öppnad ännu:
     * visa ingen räv.
     */
    if (
      studyMode === "free"
    ) {
      return null;
    }

    /*
     * FÖLJ BANAN:
     * Räven visar nästa steg.
     */
    const currentRegularIndex =
      regularQuizzes.findIndex(
        (quiz) =>
          unlockedIds.has(
            quiz.id
          ) &&
          !clearedIds.has(
            quiz.id
          )
      );

    if (
      currentRegularIndex >= 0
    ) {
      return (
        currentRegularIndex + 1
      );
    }

    if (
      chapterTest &&
      !clearedIds.has(
        chapterTest.id
      )
    ) {
      return regularQuizzes.length;
    }

    const isLastLevel =
      levelId ===
      levelIds[
        levelIds.length - 1
      ];

    if (
      isLastLevel &&
      chapterTest &&
      clearedIds.has(
        chapterTest.id
      )
    ) {
      return (
        regularQuizzes.length + 1
      );
    }

    return null;
  }, [
    studyMode,
    lastFreeNodeId,
    quizzes,
    unlockedIds,
    clearedIds,
    levelId,
    levelIds,
  ]);

const unlockedBonusIds =
  useMemo(() => {
    if (studyMode === "free") {
      return new Set(
        safeBonusLevels.map(
          (bonus) => bonus.id
        )
      );
    }

    return getUnlockedBonusIds(
      safeBonusLevels,
      clearedIds,
      structure
    );
  }, [
    studyMode,
    clearedIds,
    safeBonusLevels,
    structure,
  ]);

  const unlockedLevelIds =
  useMemo(() => {
    if (studyMode === "free") {
      return new Set(levelIds);
    }

    return getUnlockedLevelIds(
      levelIds,
      clearedIds,
      structure
    );
  }, [
    studyMode,
    levelIds,
    clearedIds,
    structure,
  ]);

 const handlePressReadNode =
  useCallback(
    async (
      node: ReadPlacedNode
    ) => {
      if (
        studyMode === "free"
      ) {
        await saveFreeModeLastNode(
          courseId,
          levelId,
          node.quizId
        );
      }

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
    [
      runRouteTransition,
      studyMode,
      levelId,
    ]
  );

  const handlePressQuizNode =
  useCallback(
    async (
      node:
        | QuizPlacedNode
        | ChapterTestPlacedNode
    ) => {
      if (
        studyMode === "free"
      ) {
        await saveFreeModeLastNode(
          courseId,
          levelId,
          node.quizId
        );

       
      }

      runRouteTransition({
        nodeId: node.id,
        go: () => {
          router.push(
            `/quiz/${node.quizId}`
          );
        },
      });
    },
    [
      runRouteTransition,
      studyMode,
      levelId,
    ]
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


<Pressable
  onPress={() => {}}
  style={{
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}
  hitSlop={8}
>
  <FontAwesome
    name="graduation-cap"
    size={32}
    color={colorSchemeGui.slate_200}
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
         overScrollMode="never"
  bounces={false}
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

             const remoteBonusSvg =
  isUnlocked
    ? bonus?.iconSvg
    : bonus?.iconOffSvg ??
      bonus?.iconSvg;

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
               {remoteBonusSvg ? (
  <SvgXml
    xml={remoteBonusSvg}
    width={58}
    height={62}
  />
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
            graphicsAnchors=
            {
              graphicsAnchors
            }
            levelGraphics={
              levelGraphics
            }
            currentGraphicsIndex={
              currentGraphicsIndex
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
            scrollY={scrollY}
            maxScrollY={maxForegroundScroll}
            onPressReadNode={
              handlePressReadNode
            }
            onPressQuizNode={
              handlePressQuizNode
            }
          />
        </Animated.ScrollView>
      </View>

     
    </SafeAreaView>
  );
}