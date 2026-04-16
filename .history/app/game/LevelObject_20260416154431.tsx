import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

type LevelObjectProps = {
  objectKey: string;
  x: number;
  y: number;
  scale: number;
};

const treeImage = require("../../assets/game/object_tree_01.png");

export default function LevelObject({
  objectKey,
  x,
  y,
  scale,
}: LevelObjectProps) {
  let source: any = null;
  let width = 120;
  let height = 140;

  if (objectKey === "tree") {
    source = treeImage;
  }

  if (!source) return null;

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  return (
    <View
      style={{
        position: "absolute",
        left: x - scaledWidth / 2,
        top: y - scaledHeight,
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