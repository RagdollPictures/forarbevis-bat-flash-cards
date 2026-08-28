import { router } from "expo-router";
import React, {
  useEffect,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  Path,
  Svg,
  SvgXml,
} from "react-native-svg";

import chaptersMenu from "../../content/assets/game/chapters_menu.json";

import ChapterBgBlue from "../../assets/menu/btn_active_blue.svg";
import ChapterBgGreen from "../../assets/menu/btn_active_green.svg";
import ChapterBgPink from "../../assets/menu/btn_active_pink.svg";
import ChapterBgPurple from "../../assets/menu/btn_active_purple.svg";
import ChapterBgYellow from "../../assets/menu/btn_active_yellow.svg";
import ChapterBgOff from "../../assets/menu/btn_locked.svg";

import { course } from "../../content/course";

import {
  getAllQuizProgress,
  type SavedQuizProgress,
} from "../../constants/flashcards/quizProgress";

import { useContent } from "../../lib/content/ContentProvider";

import {
  getDeckIdsForChapterFromStructure,
  getQuizzesForChapterFromStructure,
} from "../../lib/content/courseStructureSelectors";

import type { CourseDecks } from "../../lib/content/loadCourseFromSupabase";
import type { CourseStructure } from "../../lib/content/loadCourseStructureFromSupabase";

import { colorSchemeGui } from "@/constants/colors";
import type { MenuLevel } from "./levelScreenTypes";
import { useCourseLevelConfig } from "./useCourseLevelConfig";

const activeChapterBackgrounds = [
  ChapterBgPink,
  ChapterBgYellow,
  ChapterBgGreen,
  ChapterBgBlue,
  ChapterBgPurple,
];

type Anchor = {
  id: string;
  index?: number;
  x: number;
  y: number;
};

type ChaptersMenuLayout = {
  viewBox: {
    width: number;
    height: number;
  };
  anchors: Anchor[];
};

type ChapterMenuMapProps = {
  currentLevelId: string;
  unlockedLevelIds: Set<string>;
};

function getAnchorById(
  layout: ChaptersMenuLayout,
  id: string
) {
  return (
    layout.anchors.find(
      (anchor) =>
        anchor.id === id
    ) ?? null
  );
}

/*
 * Skapar en mjuk slingrande
 * linje mellan kapitelpunkterna.
 *
 * Kurvan börjar och slutar
 * vertikalt vid varje punkt,
 * vilket ger en mjuk S-form
 * mellan vänster/höger.
 */
function buildSmoothPath(
  anchors: Anchor[]
) {
  if (anchors.length === 0) {
    return "";
  }

  const cornerRadius = 45;

  let path =
    `M ${anchors[0].x} ${anchors[0].y}`;

  for (
    let i = 1;
    i < anchors.length;
    i++
  ) {
    const from = anchors[i - 1];
    const to = anchors[i];

    const middleY =
      (from.y + to.y) / 2;

    const xDirection =
      to.x > from.x ? 1 : -1;

    const yDirection =
      to.y > from.y ? 1 : -1;

    const radius = Math.min(
      cornerRadius,
      Math.abs(to.x - from.x) / 2,
      Math.abs(to.y - from.y) / 2
    );

    /*
     * Rakt från förra punkten.
     */
    path +=
      ` L ${from.x} ${
        middleY -
        radius * yDirection
      }`;

    /*
     * Första rundade hörnet:
     * vertikalt -> horisontellt.
     */
    path +=
      ` Q ${from.x} ${middleY}` +
      ` ${
        from.x +
        radius * xDirection
      } ${middleY}`;

    /*
     * Rak sträcka i mitten.
     */
    path +=
      ` L ${
        to.x -
        radius * xDirection
      } ${middleY}`;

    /*
     * Andra rundade hörnet:
     * horisontellt -> vertikalt.
     */
    path +=
      ` Q ${to.x} ${middleY}` +
      ` ${to.x} ${
        middleY +
        radius * yDirection
      }`;

    /*
     * Rakt fram till nästa punkt.
     */
    path +=
      ` L ${to.x} ${to.y}`;
  }

  return path;
}

function buildChapterProgressMap(
  progressMap: Record<
    string,
    SavedQuizProgress
  >,
  decks: CourseDecks,
  structure: CourseStructure,
  levelIds: readonly string[],
  levelsById: Record<
    string,
    MenuLevel
  >
): Record<string, number> {
  const result: Record<
    string,
    number
  > = {};

  for (
    const id of levelIds
  ) {
    const level =
      levelsById[id];

    if (!level) {
      continue;
    }

    let totalScore = 0;
    let totalQuestions = 0;

    const quizzes =
      getQuizzesForChapterFromStructure(
        {
          structure,
          chapterId:
            level.chapterId,
          sourceId:
            course.sourceId,
          courseId:
            course.id,
        }
      );

    for (
      const quiz of quizzes
    ) {
      const saved =
        progressMap[
          quiz.id
        ];

      let defaultTotal = 0;

      if (quiz.deckId) {
        defaultTotal =
          decks[
            quiz.deckId
          ]?.length ?? 0;
      } else if (
        quiz.chapterId
      ) {
        const deckIds =
          getDeckIdsForChapterFromStructure(
            {
              structure,
              chapterId:
                quiz.chapterId,
            }
          );

        defaultTotal =
          deckIds.reduce(
            (
              sum,
              deckId
            ) =>
              sum +
              (
                decks[
                  deckId
                ]?.length ??
                0
              ),
            0
          );
      }

      totalScore +=
        saved?.score ?? 0;

      totalQuestions +=
        saved?.total ??
        defaultTotal;
    }

    result[
      level.chapterId
    ] =
      totalQuestions > 0
        ? (
            totalScore /
            totalQuestions
          ) * 100
        : 0;
  }

  return result;
}

export default function ChapterMenuMap({
  currentLevelId,
  unlockedLevelIds,
}: ChapterMenuMapProps) {
  const {
    decks,
    structure,
  } = useContent();

  const {
    levelIds,
    levelsById,
  } =
    useCourseLevelConfig();

  const layout =
    chaptersMenu as ChaptersMenuLayout;

  const screenWidth =
    Dimensions.get(
      "window"
    ).width;

  const scale =
    screenWidth /
    layout.viewBox.width;

  /*
   * Plocka bara fram anchors
   * för de levels som faktiskt
   * finns i kursen.
   *
   * Har kursen 15 levels används
   * anchor_001–015.
   *
   * Har kursen 20 levels används
   * alla 20.
   */
  const activeAnchors =
    levelIds
      .map((id) => {
        const menuLevel =
          levelsById[id];

        if (!menuLevel) {
          return null;
        }

        return getAnchorById(
          layout,
          menuLevel.menuAnchorId
        );
      })
      .filter(
        (
          anchor
        ): anchor is Anchor =>
          anchor !== null
      );

  const chapterPath =
    buildSmoothPath(
      activeAnchors
    );

  /*
   * Kapa kartan strax efter
   * sista aktiva kapitlet.
   *
   * Då syns inte den tomma delen
   * med anchor 016–020 i en kurs
   * som bara har 15 kapitel.
   */
  const lastAnchor =
    activeAnchors[
      activeAnchors.length -
        1
    ];

  const visibleHeight =
    lastAnchor
      ? Math.min(
          layout.viewBox
            .height,
          lastAnchor.y + 120
        )
      : layout.viewBox
          .height;

  const [
    chapterProgressMap,
    setChapterProgressMap,
  ] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      const allProgress =
        await getAllQuizProgress();

      if (!mounted) {
        return;
      }

      setChapterProgressMap(
        buildChapterProgressMap(
          allProgress,
          decks,
          structure,
          levelIds,
          levelsById
        )
      );
    }

    loadProgress();

    return () => {
      mounted = false;
    };
  }, [
    decks,
    structure,
    levelIds,
    levelsById,
  ]);

  return (
    <View
      style={{
        width:
          screenWidth,
        height:
          visibleHeight *
          scale,
        position:
          "relative",
        overflow:
          "hidden",
      }}
    >
      {/* Dynamisk prickad väg */}
      <Svg
        width={
          screenWidth
        }
        height={
          visibleHeight *
          scale
        }
        viewBox={`0 0 ${layout.viewBox.width} ${visibleHeight}`}
        preserveAspectRatio="xMinYMin meet"
        style={{
          position:
            "absolute",
          left: 0,
          top: 0,
        }}
      >
        {chapterPath ? (
          <Path
            d={
              chapterPath
            }
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={3}
            strokeDasharray="1 10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </Svg>

      {/* Kapitelknappar */}
      {levelIds.map((id, index) => {
          const menuLevel =
            levelsById[id];

          if (
            !menuLevel
          ) {
            return null;
          }

          const anchor =
            getAnchorById(
              layout,
              menuLevel.menuAnchorId
            );

          if (!anchor) {
            return null;
          }

          const isUnlocked =
            unlockedLevelIds.has(
              id
            );

          const isCurrent =
            id ===
            currentLevelId;

          const centerX =
            anchor.x *
            scale;

          const centerY =
            anchor.y *
            scale;

          const iconSize =
            80;

          const iconRadius =
            iconSize / 2;

            const labelWidth = 150;
const labelGap = 18;

const labelOnRight =
  index % 2 === 0;

            const itemWidth = 150;

          const structureLevel =
            structure.levels.find(
              (
                level
              ) =>
                level.id ===
                id
            );

          const remoteIconSvg =
            isUnlocked
              ? structureLevel
                  ?.iconSvg
              : structureLevel
                  ?.iconOffSvg;

          const match =
            id.match(
              /(\d+)$/
            );

          const levelNumber =
            match
              ? Number(
                  match[1]
                )
              : 1;

          const colorIndex =
            (
              levelNumber -
              1
            ) %
            activeChapterBackgrounds.length;

          const ChapterBackground =
            isUnlocked
              ? activeChapterBackgrounds[
                  colorIndex
                ]
              : ChapterBgOff;

          const percent =
            chapterProgressMap[
              menuLevel
                .chapterId
            ] ?? 0;

          return (
            <Pressable
              key={id}
              disabled={
                !isUnlocked
              }
              onPress={() => {
                if (
                  !isUnlocked
                ) {
                  return;
                }

                router.push(
                  {
                    pathname:
                      "/game/[levelId]",
                    params: {
                      levelId:
                        id,
                    },
                  }
                );
              }}
              style={{
  position: "absolute",
  left: centerX - itemWidth / 2,
  top: centerY - iconRadius,
  width: itemWidth,
  alignItems: "center",
}}
            >
              <View
                style={{
                  width:
                    iconSize,
                  height:
                    iconSize,
                  borderRadius:
                    iconRadius,
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  borderWidth:
                    isCurrent
                      ? 3
                      : 0,
                  borderColor:
                    "#111",
                }}
              >
                <ChapterBackground
                  width={
                    iconSize
                  }
                  height={
                    iconSize
                  }
                  style={{
                    position:
                      "absolute",
                  }}
                />

                {remoteIconSvg ? (
                  <View
                    style={{
                      transform:
                        [
                          {
                            translateY:
                              -4,
                          },
                        ],
                    }}
                  >
                    <SvgXml
                      xml={
                        remoteIconSvg
                      }
                      width={
                        70
                      }
                      height={
                        70
                      }
                    />
                  </View>
                ) : null}
              </View>

              <View
  style={{
    position: "absolute",
    top: 18,
    width: labelWidth,

    ...(labelOnRight
      ? {
          left:
            itemWidth / 2 +
            iconRadius +
            labelGap,
        }
      : {
          right:
            itemWidth / 2 +
            iconRadius +
            labelGap,
        }),

    alignItems: "center",
  }}
>

    <View
    style={{
      position: "absolute",
      top: 14,
      width: 0,
      height: 0,
      zIndex: 1,

      borderTopWidth: 8,
      borderBottomWidth: 8,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",

      ...(labelOnRight
        ? {
            left: -10,
            borderRightWidth: 10,
            borderRightColor:
              colorSchemeGui.slate_700,
          }
        : {
            right: -10,
            borderLeftWidth: 10,
            borderLeftColor:
              colorSchemeGui.slate_700,
          }),
    }}
  />
  <View
    style={{
      width: labelWidth,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: colorSchemeGui.slate_700,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text
      style={{
        fontSize: 12,
        fontWeight: "bold",
         color: isUnlocked
      ? colorSchemeGui.slate_200
      : colorSchemeGui.slate_700,
        textAlign: "center",
      }}
      numberOfLines={1}
    >
      {menuLevel.label}
    </Text>
 

  <Text
    style={{
      marginTop: 4,
      fontSize: 10,
      fontWeight: "700",
       color: isUnlocked
      ? colorSchemeGui.slate_200
      : colorSchemeGui.slate_700,
    }}
  >
    {Math.round(percent)}%
  </Text>
   </View>
</View>
            </Pressable>
          );
        }
      )}
    </View>
  );
}