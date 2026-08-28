import React from "react";
import {
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, {
  Circle,
  Path,
} from "react-native-svg";

import { colorSchemeGui } from "../../constants/colors";
import headerMiniMapData from "../../content/assets/game/header_mini_map.json";
import { useCourseLevelConfig } from "./useCourseLevelConfig";

type HeaderMiniMapProps = {
  currentLevelId: string;
  unlockedLevelIds: Set<string>;
  style?: StyleProp<ViewStyle>;
};

type MiniMapAnchor = {
  id: string;
  type?: string;
  index?: number;
  x?: number;
  y?: number;
};

const miniMapAnchors = (
  headerMiniMapData.anchors as MiniMapAnchor[]
)
  .filter(
    (
      anchor
    ): anchor is MiniMapAnchor & {
      index: number;
      x: number;
      y: number;
    } =>
      anchor.type === "minimap" &&
      typeof anchor.index === "number" &&
      typeof anchor.x === "number" &&
      typeof anchor.y === "number"
  )
  .sort(
    (a, b) =>
      a.index - b.index
  );

export default function HeaderMiniMap({
  currentLevelId,
  unlockedLevelIds,
  style,
}: HeaderMiniMapProps) {
  const { levelIds } =
    useCourseLevelConfig();

  /*
   * Supabase bestämmer vilka levels
   * kursen har och i vilken ordning.
   *
   * Minimap-anchor 1 används för
   * första leveln, anchor 2 för
   * andra osv.
   */
  const points = levelIds
    .map((id, index) => {
      const anchor =
        miniMapAnchors[index];

      if (!anchor) {
        return null;
      }

      return {
        id,
        x: anchor.x,
        y: anchor.y,
      };
    })
    .filter(
      (
        point
      ): point is {
        id: string;
        x: number;
        y: number;
      } => point !== null
    );

  /*
   * Bygg linjen bara genom de
   * levels som faktiskt finns.
   *
   * 5 levels  -> punkt 1–5
   * 15 levels -> punkt 1–15
   * 20 levels -> punkt 1–20
   */
  const path =
    points.length > 0
      ? points
          .map(
            (point, index) =>
              `${
                index === 0
                  ? "M"
                  : "L"
              }${point.x} ${point.y}`
          )
          .join(" ")
      : "";

  const {
    width: viewBoxWidth,
    height: viewBoxHeight,
  } = headerMiniMapData.viewBox;

  return (
    <View
      style={[
        {
          width: "100%",
          aspectRatio:
            viewBoxWidth /
            viewBoxHeight,
        },
        style,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {path ? (
          <Path
            d={path}
            fill="none"
            stroke="#8f96a3"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.2 5"
          />
        ) : null}

        {points.map(
          (point) => {
            const isUnlocked =
              unlockedLevelIds.has(
                point.id
              );

            const isCurrent =
              point.id ===
              currentLevelId;

            return (
              <Circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={
                  isCurrent
                    ? 10
                    : 5
                }
                fill={
                  isUnlocked
                    ? colorSchemeGui.yellow
                    : colorSchemeGui.darkGray
                }
              />
            );
          }
        )}
      </Svg>
    </View>
  );
}