import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { colorSchemeGui } from "../../constants/colors";
import { headerMiniMap } from "../../content/assets/headerMiniMap";
import { useCourseLevelConfig } from "./useCourseLevelConfig";

type HeaderMiniMapProps = {
  currentLevelId: string;
  unlockedLevelIds: Set<string>;
  style?: StyleProp<ViewStyle>;
};

export default function HeaderMiniMap({
  currentLevelId,
  unlockedLevelIds,
  style,
}: HeaderMiniMapProps) {
   const { levelIds } = useCourseLevelConfig();

  return (
    <View
      style={[
        {
          width: "100%",
          aspectRatio:
            headerMiniMap.viewBoxWidth / headerMiniMap.viewBoxHeight,
        },
        style,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${headerMiniMap.viewBoxWidth} ${headerMiniMap.viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <Path
          d={headerMiniMap.path}
          fill="none"
          stroke="#8f96a3"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.2 5"
        />

        {levelIds.map((id) => {
          const point = headerMiniMap.points[id];

          if (!point) return null;

          const isUnlocked = unlockedLevelIds.has(id);
          const isCurrent = id === currentLevelId;

          return (
            <Circle
              key={id}
              cx={point.x}
              cy={point.y}
              r={isCurrent ? 10 : 5}
              fill={
                isUnlocked
                  ? colorSchemeGui.yellow
                  : colorSchemeGui.darkGray
              }
            />
          );
        })}
      </Svg>
    </View>
  );
}