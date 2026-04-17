import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import type { LevelObjectConfig } from "./levelScreenTypes";

type LevelObjectProps = {
  config: LevelObjectConfig;
  assetMap?: Record<string, any>;
  x: number;
  y: number;
  scale: number;
};

export default function LevelObject({
  config,
  assetMap,
  x,
  y,
  scale,
}: LevelObjectProps) {
  const source = assetMap?.[config.assetKey];
  if (!source) return null;

  const scaledWidth = config.width * scale;
  const scaledHeight = config.height * scale;

  const left = x - scaledWidth / 2;
  const top =
    config.anchor === "center"
      ? y - scaledHeight / 2
      : y - scaledHeight;

  return (
    <View
      style={{
        position: "absolute",
        left,
        top,
        width: scaledWidth,
        height: scaledHeight,
        pointerEvents: "none",
      }}
    >
      <Image
        source={source}
        contentFit="contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}