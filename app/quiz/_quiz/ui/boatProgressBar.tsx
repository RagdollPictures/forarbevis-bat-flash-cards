import { colorScheme } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

export function BoatProgressBar({
  value,
  barHeight = 14,
  thumbSize = 28,
}: {
  value: number; // 0..1
  barHeight?: number;
  thumbSize?: number;
}) {
  const [w, setW] = useState(1);
  const clamped = Math.max(0, Math.min(1, value));

  const fillW = w * clamped;

  const half = thumbSize / 2;
  const thumbLeft = Math.max(0, Math.min(w - thumbSize, fillW - half));

  const thumbTop = -(thumbSize - barHeight) / 2;

  const onLayout = (e: LayoutChangeEvent) => {
    setW(Math.max(1, e.nativeEvent.layout.width));
  };

  return (
    <View style={styles.outer}>
      <View style={[styles.bar, { height: barHeight }]} onLayout={onLayout}>
        <View style={[styles.fill, { width: fillW }]} />
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            left: thumbLeft,
            top: thumbTop,
          },
        ]}
      >
        <FontAwesome6 name="sailboat" size={14} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    width: "100%",
    position: "relative",
  },
  bar: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: colorScheme.gray,
    justifyContent: "center",
    overflow: "visible",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: colorScheme.blue,
  },
  thumb: {
    position: "absolute",
    backgroundColor: colorScheme.orange,
    alignItems: "center",
    justifyContent: "center",
  },
});
