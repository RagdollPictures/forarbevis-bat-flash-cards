import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export default function WaterRipple() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.12,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.08,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    loop.start();

    return () => loop.stop();
  }, [scale, opacity]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 8,
        width: 54,
        height: 14,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: "#ffffff",
        opacity,
        transform: [{ scaleX: scale }, { scaleY: scale }],
      }}
    />
  );
}