import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import chaptersMenu from "../../assets/game/chapters_menu.json";
import ChaptersMenuSvg from "../../assets/game/chapters_menu.svg";

import LanternorIcon from "../../assets/menu/lanternor.svg";
import LanternorIconOff from "../../assets/menu/lanternor_off.svg";
import ManovreringIcon from "../../assets/menu/manovrering.svg";
import ManovreringIconOff from "../../assets/menu/manovrering_off.svg";
import MiljoIcon from "../../assets/menu/miljo.svg";
import MiljoIconOff from "../../assets/menu/miljo_off.svg";
import NavigationsinstrumentIcon from "../../assets/menu/navigationsinstrument.svg";
import NavigationsinstrumentIconOff from "../../assets/menu/navigationsinstrument_off.svg";
import NavigationsteoriIcon from "../../assets/menu/navigationsteori.svg";
import NavigationsteoriIconOff from "../../assets/menu/navigationsteori_off.svg";
import PraktiskNavigationIcon from "../../assets/menu/praktisk_navigation.svg";
import PraktiskNavigationIconOff from "../../assets/menu/praktisk_navigation_off.svg";
import SakerhetIcon from "../../assets/menu/sakerhet.svg";
import SakerhetIconOff from "../../assets/menu/sakerhet_off.svg";
import SignaleringIcon from "../../assets/menu/signalering.svg";
import SignaleringIconOff from "../../assets/menu/signalering_off.svg";
import SjokortetIcon from "../../assets/menu/sjokortet.svg";
import SjokortetIconOff from "../../assets/menu/sjokortet_off.svg";
import SjokortetSjomarkenIcon from "../../assets/menu/sjokortet_sjomarken.svg";
import SjokortetSjomarkenIconOff from "../../assets/menu/sjokortet_sjomarken_off.svg";
import SjokortsarbeteIcon from "../../assets/menu/sjokortsarbete.svg";
import SjokortsarbeteIconOff from "../../assets/menu/sjokortsarbete_off.svg";
import SjomanskapIcon from "../../assets/menu/sjomanskap.svg";
import SjomanskapIconOff from "../../assets/menu/sjomanskap_off.svg";
import SjukvardIcon from "../../assets/menu/sjukvard.svg";
import SjukvardIconOff from "../../assets/menu/sjukvard_off.svg";
import VaderIcon from "../../assets/menu/vader.svg";
import VaderIconOff from "../../assets/menu/vader_off.svg";
import VajningsreglerIcon from "../../assets/menu/vajningsregler.svg";
import VajningsreglerIconOff from "../../assets/menu/vajningsregler_off.svg";

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

type MenuIconComponent = React.ComponentType<SvgProps>;

const iconByChapterId: Record<string, MenuIconComponent> = {
  sjokortet: SjokortetIcon,
  sjokortet_sjomarken: SjokortetSjomarkenIcon,
  sjokortsarbete: SjokortsarbeteIcon,
  navigationsteori: NavigationsteoriIcon,
  praktisk_navigation: PraktiskNavigationIcon,
  vajningsregler: VajningsreglerIcon,
  lanternor: LanternorIcon,
  manovrering: ManovreringIcon,
  navigationsinstrument: NavigationsinstrumentIcon,
  sjomanskap: SjomanskapIcon,
  signalering: SignaleringIcon,
  sakerhet: SakerhetIcon,
  sjukvard: SjukvardIcon,
  vader: VaderIcon,
  miljo: MiljoIcon,
};

const iconOffByChapterId: Record<string, MenuIconComponent> = {
  sjokortet: SjokortetIconOff,
  sjokortet_sjomarken: SjokortetSjomarkenIconOff,
  sjokortsarbete: SjokortsarbeteIconOff,
  navigationsteori: NavigationsteoriIconOff,
  praktisk_navigation: PraktiskNavigationIconOff,
  vajningsregler: VajningsreglerIconOff,
  lanternor: LanternorIconOff,
  manovrering: ManovreringIconOff,
  navigationsinstrument: NavigationsinstrumentIconOff,
  sjomanskap: SjomanskapIconOff,
  signalering: SignaleringIconOff,
  sakerhet: SakerhetIconOff,
  sjukvard: SjukvardIconOff,
  vader: VaderIconOff,
  miljo: MiljoIconOff,
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

      {levelIds.map((id) => {;
        const menuLevel = levelsById[id];
        if (!menuLevel) return null;

        const anchor = getAnchorById(layout, menuLevel.menuAnchorId);
        if (!anchor) return null;

        const isUnlocked = unlockedLevelIds.has(id);
        const isCurrent = id === currentLevelId;

        const centerX = anchor.x * scale;
        const centerY = anchor.y * scale;

        const iconSize = 100;
        const iconRadius = iconSize / 2;
        const labelWidth = 250;
        const labelTopOffset = 44;

        const ChapterIcon = isUnlocked
          ? iconByChapterId[menuLevel.chapterId]
          : iconOffByChapterId[menuLevel.chapterId];

        const percent = chapterProgressMap[menuLevel.chapterId] ?? 0;

        return (
          <React.Fragment key={id}>
            <Pressable
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
                left: centerX - iconRadius,
                top: centerY - iconRadius,
                width: iconSize,
                height: iconSize,
                borderRadius: iconRadius,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ChapterIcon ? <ChapterIcon width={70} height={90} /> : null}
                </View>
            

              
            </Pressable>

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
    }}
  >
    <View
      style={{
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ChapterIcon ? <ChapterIcon width={70} height={90} /> : null}
    </View>
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
      {menuLevel.titleShort}
    </Text>
  </View>
</Pressable>
          </React.Fragment>
        );
      })}
    </View>
  );
}