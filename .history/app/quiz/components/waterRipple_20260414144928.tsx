import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

function RippleCircle({
  progress,
  size,
  strokeWidth,
}: {
  progress: Animated.Value;
  size: number;
  strokeWidth: number;
}) {
  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 1.35],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.35, 0.7, 1],
    outputRange: [0, 0.55, 1, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: "#ffffff",
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

export default function WaterRipple() {
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const duration = 2600;

    const loop1 = Animated.loop(
      Animated.timing(ripple1, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const loop2 = Animated.loop(
      Animated.timing(ripple2, {
        toValue: 1.5,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    ripple1.setValue(0);
    ripple2.setValue(0.5);

    loop1.start();
    loop2.start();

    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [ripple1, ripple2]);

  const normalized1 = ripple1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const normalized2 = ripple2.interpolate({
    inputRange: [0.5, 1.5],
    outputRange: [0, 1],
  });

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RippleCircle progress={normalized1} size={95} strokeWidth={2} />
      <RippleCircle progress={normalized2} size={95} strokeWidth={2} />
    </View>
  );
}