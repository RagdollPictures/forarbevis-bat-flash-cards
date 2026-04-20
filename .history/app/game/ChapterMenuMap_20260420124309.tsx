import { colorScheme } from "@/constants/colors";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import chaptersMenu from "../../assets/game/chapters_menu.json";
import ChaptersMenuSvg from "../../assets/game/chapters_menu.svg";

import LanternorIcon from "../../assets/menu/lanternor.svg";
import ManovreringIcon from "../../assets/menu/manovrering.svg";
import MiljoIcon from "../../assets/menu/miljo.svg";
import NavigationsinstrumentIcon from "../../assets/menu/navigationsinstrument.svg";
import NavigationsteoriIcon from "../../assets/menu/navigationsteori.svg";
import PraktiskNavigationIcon from "../../assets/menu/praktisk_navigation.svg";
import SakerhetIcon from "../../assets/menu/sakerhet.svg";
import SignaleringIcon from "../../assets/menu/signalering.svg";
import SjokortetIcon from "../../assets/menu/sjokortet.svg";
import SjokortetSjomarkenIcon from "../../assets/menu/sjokortet_sjomarken.svg";
import SjokortsarbeteIcon from "../../assets/menu/sjokortsarbete.svg";
import SjomanskapIcon from "../../assets/menu/sjomanskap.svg";
import SjukvardIcon from "../../assets/menu/sjukvard.svg";
import VaderIcon from "../../assets/menu/vader.svg";
import VajningsreglerIcon from "../../assets/menu/vajningsregler.svg";

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

function getAnchorById(layout: ChaptersMenuLayout, id: string) {
  return layout.anchors.find((anchor) => anchor.id === id) ?? null;
}

export default function ChapterMenuMap({
  currentLevelId,
  unlockedLevelIds,
}: ChapterMenuMapProps) {
  const layout = chaptersMenu as ChaptersMenuLayout;
  const screenWidth = Dimensions.get("window").width;
  const scale = screenWidth / layout.viewBox.width;

  return (
    <View
      style={{
        width: screenWidth,
        height: layout.viewBox.height * scale,
        position: "relative",
      }}
    >
      <ChaptersMenuSvg width={screenWidth} height={layout.viewBox.height * scale} />

      {levelIds.map((id) => {
        const menuLevel = levelsById[id];
        if (!menuLevel) return null;

        const anchor = getAnchorById(layout, menuLevel.menuAnchorId);
        if (!anchor) return null;

        const isUnlocked = unlockedLevelIds.has(id);
        const isCurrent = id === currentLevelId;

        const centerX = anchor.x * scale;
        const centerY = anchor.y * scale;

        const iconSize = 58;
        const iconRadius = iconSize / 2;
        const labelWidth = 250;
        const labelTopOffset = 44;

        const ChapterIcon = iconByChapterId[menuLevel.chapterId];

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
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: isCurrent ? colorScheme.darkBlue : "#111",
                alignItems: "center",
                justifyContent: "center",
                opacity: isUnlocked ? 1 : 0.45,
              }}
            >
              {ChapterIcon ? <ChapterIcon width={30} height={30} /> : null}

              {!isUnlocked ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: -22,
                    fontSize: 11,
                    fontWeight: "800",
                    color: "#fff",
                  }}
                >
                  LÅST
                </Text>
              ) : null}
            </Pressable>

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
                left: centerX - labelWidth / 2,
                top: centerY + labelTopOffset,
               
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderWidth: 3,
                justifyContent: "center",
                opacity: isUnlocked ? 1 : 0.45,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "800",
                  color: "#111",
                }}
              >
                {menuLevel.label}
              </Text>
            </Pressable>
          </React.Fragment>
        );
      })}
    </View>
  );
}