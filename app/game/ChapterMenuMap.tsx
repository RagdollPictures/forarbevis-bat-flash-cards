import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";

import chaptersMenu from "../../content/assets/game/chapters_menu.json";
import ChaptersMenuSvg from "../../content/assets/game/chapters_menu.svg";

import ChapterBgBlue from "../../assets/menu/btn_active_blue.svg";
import ChapterBgGreen from "../../assets/menu/btn_active_green.svg";
import ChapterBgPink from "../../assets/menu/btn_active_pink.svg";
import ChapterBgPurple from "../../assets/menu/btn_active_purple.svg";
import ChapterBgYellow from "../../assets/menu/btn_active_yellow.svg";
import ChapterBgOff from "../../assets/menu/btn_locked.svg";

import { SvgXml } from "react-native-svg";

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
      (anchor) => anchor.id === id
    ) ?? null
  );
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

  for (const id of levelIds) {
    const level =
      levelsById[id];

    if (!level) {
      continue;
    }

    let totalScore = 0;
    let totalQuestions = 0;

    const quizzes =
      getQuizzesForChapterFromStructure({
        structure,
        chapterId:
          level.chapterId,
        sourceId:
          course.sourceId,
        courseId: course.id,
      });

    for (const quiz of quizzes) {
      const saved =
        progressMap[quiz.id];

      let defaultTotal = 0;

      if (quiz.deckId) {
        defaultTotal =
          decks[quiz.deckId]
            ?.length ?? 0;
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
              (decks[deckId]
                ?.length ?? 0),
            0
          );
      }

      totalScore +=
        saved?.score ?? 0;

      totalQuestions +=
        saved?.total ??
        defaultTotal;
    }

    result[level.chapterId] =
      totalQuestions > 0
        ? (totalScore /
            totalQuestions) *
          100
        : 0;
  }

  return result;
}

export default function ChapterMenuMap({
  currentLevelId,
  unlockedLevelIds,
}: ChapterMenuMapProps) {
  const { decks, structure } =
    useContent();

  const {
    levelIds,
    levelsById,
  } = useCourseLevelConfig();

  const layout =
    chaptersMenu as ChaptersMenuLayout;

  const screenWidth =
    Dimensions.get(
      "window"
    ).width;

  const scale =
    screenWidth /
    layout.viewBox.width;

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
        width: screenWidth,
        height:
          layout.viewBox.height *
          scale,
        position: "relative",
      }}
    >
      <ChaptersMenuSvg
        width={screenWidth}
        height={
          layout.viewBox.height *
          scale
        }
      />

      {levelIds.map((id) => {
        const menuLevel =
          levelsById[id];

        if (!menuLevel) {
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
          anchor.x * scale;

        const centerY =
          anchor.y * scale;

        const iconSize = 80;
        const iconRadius =
          iconSize / 2;

        const structureLevel =
  structure.levels.find(
    (level) => level.id === id
  );

const remoteIconSvg =
  isUnlocked
    ? structureLevel?.iconSvg
    : structureLevel?.iconOffSvg;



        const match =
          id.match(/(\d+)$/);

        const levelNumber =
          match
            ? Number(match[1])
            : 1;

        const colorIndex =
          (levelNumber - 1) %
          activeChapterBackgrounds.length;

        const ChapterBackground =
          isUnlocked
            ? activeChapterBackgrounds[
                colorIndex
              ]
            : ChapterBgOff;

        const percent =
          chapterProgressMap[
            menuLevel.chapterId
          ] ?? 0;

        return (
          <Pressable
            key={id}
            disabled={
              !isUnlocked
            }
            onPress={() => {
              if (!isUnlocked) {
                return;
              }

              router.push({
                pathname:
                  "/game/[levelId]",
                params: {
                  levelId: id,
                },
              });
            }}
            style={{
              position:
                "absolute",
              left: centerX,
              top:
                centerY -
                iconRadius,
              transform: [
                {
                  translateX:
                    -iconRadius,
                },
              ],
              width: iconSize,
              alignItems:
                "center",
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
      transform: [
        {
          translateY: -4,
        },
      ],
    }}
  >
    <SvgXml
      xml={remoteIconSvg}
      width={70}
      height={70}
    />
  </View>
) : null}
            </View>

            <View
              style={{
                paddingHorizontal:
                  8,
                paddingVertical:
                  5,
                borderRadius:
                  16,
                backgroundColor:
                  "#fff",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight:
                    "800",
                  color:
                    "#111",
                  textAlign:
                    "center",
                }}
                numberOfLines={
                  1
                }
              >
                {
                  menuLevel.label
                }
              </Text>
            </View>

            <Text
              style={{
                marginTop: 4,
                fontSize: 10,
                fontWeight:
                  "700",
                color: "#111",
              }}
            >
              {Math.round(
                percent
              )}
              %
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}