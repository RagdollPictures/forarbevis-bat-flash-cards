import LottieView from "lottie-react-native";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

type LottieSource = object | number | { uri: string };

export default function LottieLoop({
  source,
  style,
  autoPlay = true,
  loop = true,
}: {
  source: LottieSource;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  return (
    <LottieView
      source={source as any}
      autoPlay={autoPlay}
      loop={loop}
      style={style}
    />
  );
}