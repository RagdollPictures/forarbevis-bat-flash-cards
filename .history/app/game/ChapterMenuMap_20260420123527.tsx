import { colorScheme } from "@/constants/colors";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import chaptersMenu from "../../assets/game/chapters_menu.json";
import ChaptersMenuSvg from "../../assets/game/chapters_menu.svg";
import SvgIcon from "../quiz/icons/svgIcon";
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
        position: "relative",
        width: "100%",
        height: layout.viewBox.height * scale,
      }}
    >
      <ChaptersMenuSvg
        width={screenWidth}
        height={layout.viewBox.height * scale}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
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

        const iconSize = 58;
        const iconRadius = iconSize / 2;

        const labelWidth = 250;
        const labelTopOffset = 44;

        return (
          <React.Fragment key={id}>
            <Pressable
              disabled={!isUnlocked}
              onPress={() => {
                if (!isUnlocked) return;

                router.push({
                  pathname: "/game/[levelId]",
                  params: { levelId: id },
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
              <SvgIcon
                name={menuLevel.iconName}
                size={24}
                color={isUnlocked ? colorScheme.darkBlue : "#bbb"}
              />

              {!isUnlocked ? (
                <View
                  style={{
                    position: "absolute",
                    right: -6,
                    bottom: -4,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: "#111",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SvgIcon name="lock" size={14} color="#fff" />
                </View>
              ) : null}
            </Pressable>

            <Pressable
              disabled={!isUnlocked}
              onPress={() => {
                if (!isUnlocked) return;

                router.push({
                  pathname: "/game/[levelId]",
                  params: { levelId: id },
                });
              }}
              style={{
                position: "absolute",
                left: centerX - labelWidth / 2,
                top: centerY + labelTopOffset,
                width: labelWidth,
                minHeight: 48,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: isCurrent ? colorScheme.darkBlue : "#111",
                justifyContent: "center",
                opacity: isUnlocked ? 1 : 0.45,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: isUnlocked ? "#111" : "#666",
                  textAlign: "center",
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