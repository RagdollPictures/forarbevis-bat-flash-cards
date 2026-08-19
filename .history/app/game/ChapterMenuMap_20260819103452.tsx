import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";


import chaptersMenu from "../../content/assets/game/chapters_menu.json";
import ChaptersMenuSvg from "../../content/assets/game/chapters_menu.svg";

import ChapterBg from "../../content/assets/chapter-icons/chapter_bg.svg";
import ChapterBgOff from "../../content/assets/chapter-icons/chapter_bg_off.svg";

import {
  chapterIcons,
  chapterIconsOff,
} from "../../content/assets/chapterIcons";

import { getQuizzesForChapter, sources } from "../../constants/flashcards";
import {
  getAllQuizProgress,
  type SavedQuizProgress,
} from "../../constants/flashcards/quizProgress";
import { levelIds, levelsById, type LevelId } from "./levelConfig";

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
  currentLevelId: LevelId;
  unlockedLevelIds: Set<string>;
};




function getAnchorById(layout: ChaptersMenuLayout, id: string) {
  return layout.anchors.find((anchor) => anchor.id === id) ?? null;
}

function buildChapterProgressMap(
  progressMap: Record<string, SavedQuizProgress>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const id of levelIds) {
    const level = levelsById[id];
    if (!level) continue;

    let totalScore = 0;
    let totalQuestions = 0;

    for (const source of sources) {
      const quizzes = getQuizzesForChapter(source.id, level.chapterId);

      for (const quiz of quizzes) {
        const saved = progressMap[quiz.id];
        totalScore += saved?.score ?? 0;
        totalQuestions += saved?.total ?? quiz.deck.length;
      }
    }

    result[level.chapterId] =
      totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
  }

  return result;
}

export default function ChapterMenuMap({
  currentLevelId,
  unlockedLevelIds,
}: ChapterMenuMapProps) {
  const layout = chaptersMenu as ChaptersMenuLayout;
  const screenWidth = Dimensions.get("window").width;
  const scale = screenWidth / layout.viewBox.width;

  const [chapterProgressMap, setChapterProgressMap] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      const allProgress = await getAllQuizProgress();
      if (!mounted) return;
      setChapterProgressMap(buildChapterProgressMap(allProgress));
    }

    loadProgress();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View
      style={{
        width: screenWidth,
        height: layout.viewBox.height * scale,
        position: "relative",
      }}
    >
      <ChaptersMenuSvg
        width={screenWidth}
        height={layout.viewBox.height * scale}
      />

      {levelIds.map((id) => {
        const menuLevel = levelsById[id];
        if (!menuLevel) return null;

        const anchor = getAnchorById(layout, menuLevel.menuAnchorId);
        if (!anchor) return null;

        const isUnlocked = unlockedLevelIds.has(id);
        const isCurrent = id === currentLevelId;

        const centerX = anchor.x * scale;
        const centerY = anchor.y * scale;

        const iconSize = 80;
        const iconRadius = iconSize / 2;

        const ChapterIcon = isUnlocked
  ? chapterIcons[menuLevel.chapterId]
  : chapterIconsOff[menuLevel.chapterId];

  const ChapterBackground = isUnlocked
  ? ChapterBg
  : ChapterBgOff;

        const percent = chapterProgressMap[menuLevel.chapterId] ?? 0;

        return (
          <Pressable
            key={id}
            disabled={!isUnlocked}
            onPress={() => {
              if (!isUnlocked) return;

              router.push({
                pathname: "/game/[levelId]",
                params: {
                  levelId: id,
                },
              });
            }}
            style={{
              position: "absolute",
              left: centerX,
              top: centerY - iconRadius,
              transform: [{ translateX: -iconRadius }],
              width: iconSize,
              alignItems: "center",
            }}
          >
            <View
  style={{
    width: iconSize,
    height: iconSize,
    borderRadius: iconRadius,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: isCurrent ? 3 : 0,
    borderColor: "#111",
  }}
>
  <ChapterBackground
    width={iconSize}
    height={iconSize}
    style={{
      position: "absolute",
    }}
  />

  {ChapterIcon ? (
    <ChapterIcon
      width={70}
      height={70}
    />
  ) : null}
</View>

            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 16,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "800",
                  color: "#111",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {menuLevel.label}
              </Text>
            </View>

            <Text
              style={{
                marginTop: 4,
                fontSize: 10,
                fontWeight: "700",
                color: "#111",
              }}
            >
              {Math.round(percent)}%
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}