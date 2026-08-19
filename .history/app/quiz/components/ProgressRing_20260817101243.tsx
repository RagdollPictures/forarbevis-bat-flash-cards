// app/(tabs)/quiz-menu/components/ProgressRing.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { getProgressColor } from "../utils/progress";

export default function ProgressRing({
  percent,
  size,
  strokeWidth,
  children,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
  children: React.ReactNode;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const dashArray = `${circumference} ${circumference}`;
  const dashOffset = circumference - (clamped / 100) * circumference;

  const ringColor = getProgressColor(clamped);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(17,17,17,0.18)"
          fill="rgba(17,17,17,0.18)"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {clamped > 0 ? (
          <Circle
            stroke={ringColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        ) : null}
      </Svg>

      <View style={[StyleSheet.absoluteFillObject, styles.center]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
