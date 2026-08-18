import { colorSchemeQuiz } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export function BoatProgressBar({
  value,
  barHeight = 10,
}: {
  value: number;
  barHeight?: number;
}) {
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <View style={styles.outer}>
      <View style={[styles.bar, { height: barHeight }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clamped * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    width: "100%",
  },

  bar: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: colorSchemeQuiz.border,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colorSchemeQuiz.purple,
  },
});