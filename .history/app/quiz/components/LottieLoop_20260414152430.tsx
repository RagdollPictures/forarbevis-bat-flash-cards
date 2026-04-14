import LottieView from "lottie-react-native";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export default function LottieLoop({
  source,
  style,
  autoPlay = true,
  loop = true,
}: {
  source: object;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={style}
    />
  );
}