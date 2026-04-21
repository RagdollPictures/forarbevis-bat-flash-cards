import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { colorSchemeGui } from "../../constants/colors";
import { levelIds, type LevelId } from "./levelConfig";

type HeaderMiniMapProps = {
  currentLevelId: LevelId;
  unlockedLevelIds: Set<string>;
  width?: number;
  height?: number;
};

const points: Record<LevelId, { x: number; y: number }> = {
  level_001: { x: 10, y: 30 },
  level_002: { x: 28, y: 24 },
  level_003: { x: 46, y: 18 },
  level_004: { x: 64, y: 15 },
  level_005: { x: 82, y: 18 },
  level_006: { x: 100, y: 26 },
  level_007: { x: 118, y: 35 },
  level_008: { x: 136, y: 42 },
  level_009: { x: 154, y: 44 },
  level_010: { x: 172, y: 38 },
  level_011: { x: 190, y: 28 },
  level_012: { x: 208, y: 18 },
  level_013: { x: 226, y: 14 },
  level_014: { x: 244, y: 18 },
  level_015: { x: 262, y: 28 },
};

export default function HeaderMiniMap({
  currentLevelId,
  unlockedLevelIds,
  width = 272,
  height = 56,
}: HeaderMiniMapProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 272 56">
      <Path
        d="M10 30 C 30 20, 50 10, 70 16
           S 110 40, 136 42
           S 190 10, 226 14
           S 250 22, 262 28"
        fill="none"
        stroke="#8f96a3"
        strokeWidth={4}
        strokeLinecap="round"
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
  );
}