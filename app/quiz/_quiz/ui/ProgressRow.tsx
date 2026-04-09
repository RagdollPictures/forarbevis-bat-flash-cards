import React from "react";
import { View } from "react-native";
import { styles } from "../styles";

export default function ProgressRow({
  progress,
  activeIndex,
}: {
  progress: ("correct" | "wrong" | null)[];
  activeIndex: number;
}) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressRow}>
        {progress.map((p, i) => (
          <View
            key={`p-${i}`}
            style={[
              styles.progressSeg,
              i === activeIndex && !p && styles.progressActive,
              p === "correct" && styles.progressCorrect,
              p === "wrong" && styles.progressWrong,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
