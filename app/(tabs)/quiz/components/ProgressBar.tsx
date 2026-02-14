// app/(tabs)/quiz-menu/components/ProgressBar.tsx
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import { getProgressColor } from "../utils/progress";

export default function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const barColor = getProgressColor(clamped);

  return (
    <View style={styles.progressBarWrap}>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${clamped}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      <Text style={styles.progressLabel}>{clamped}%</Text>
    </View>
  );
}
