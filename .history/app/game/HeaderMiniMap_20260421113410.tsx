import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colorSchemeGui } from "../../constants/colors";
import { levelIds, type LevelId } from "./levelConfig";

type HeaderMiniMapProps = {
  currentLevelId: LevelId;
  unlockedLevelIds: Set<string>;
  style?: StyleProp<ViewStyle>;
};

const VIEWBOX_WIDTH = 370;
const VIEWBOX_HEIGHT = 70;

const points: Record<LevelId, { x: number; y: number }> = {
  level_001: { x: 27.85, y: 18.57 },
  level_002: { x: 62.68, y: 18.57 },
  level_003: { x: 97.51, y: 18.57 },
  level_004: { x: 132.34, y: 18.57 },
  level_005: { x: 167.17, y: 18.57 },
  level_006: { x: 202.0, y: 18.57 },
  level_007: { x: 236.83, y: 18.57 },
  level_008: { x: 271.66, y: 18.57 },
  level_009: { x: 306.49, y: 18.57 },
  level_010: { x: 341.32, y: 18.57 },
  level_011: { x: 341.32, y: 50.31 },
  level_012: { x: 307.24, y: 50.31 },
  level_013: { x: 271.6, y: 50.31 },
  level_014: { x: 237.0, y: 50.31 },
  level_015: { x: 200.84, y: 50.31 },
};

export default function HeaderMiniMap({
  currentLevelId,
  unlockedLevelIds,
  style,
}: HeaderMiniMapProps) {
  return (
    <View
      style={[
        {
          width: "100%",
          aspectRatio: VIEWBOX_WIDTH / VIEWBOX_HEIGHT,
        },
        style,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <Path
          d="M27.85 18.57
             L62.68 18.57
             L97.51 18.57
             L132.34 18.57
             L167.17 18.57
             L202 18.57
             L236.83 18.57
             L271.66 18.57
             L306.49 18.57
             L341.32 18.57
             L341.32 50.31
             L307.24 50.31
             L271.6 50.31
             L237 50.31
             L200.84 50.31"
          fill="none"
          stroke="#8f96a3"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 8"
        />

        {levelIds.map((id) => {
          const point = points[id];
          const isUnlocked = unlockedLevelIds.has(id);
          const isCurrent = id === currentLevelId;

          return (
            <Circle
              key={id}
              cx={point.x}
              cy={point.y}
              r={isCurrent ? 6 : 5}
              fill={isUnlocked ? colorSchemeGui.yellow : "#b8bec8"}
              stroke={isCurrent ? "#1f2a44" : "#ffffff"}
              strokeWidth={isCurrent ? 2.5 : 2}
            />
          );
        })}
      </Svg>
    </View>
  );
}