import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

type LevelObjectProps = {
  objectKey: string;
  x: number;
  y: number;
  scale: number;
};

const treeImage = require("../../assets/game/level_001_platform_01.svg");

export default function LevelObject({
  objectKey,
  x,
  y,
  scale,
}: LevelObjectProps) {
  if (objectKey === "tree") {
    const size = 120 * scale;

    return (
      <View
        style={{
          position: "absolute",
          left: x - size / 2,
          top: y - size,
          width: size,
          height: size,
          pointerEvents: "none",
        }}
      >
        <Image
          source={treeImage}
          contentFit="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  }

  return null;
}