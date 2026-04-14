import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

function RippleCircle({
  progress,
  size,
  strokeWidth,
  maxScale,
  maxOpacity,
}: {
  progress: Animated.Value;
  size: number;
  strokeWidth: number;
  maxScale: number;
  maxOpacity: number;
}) {
  const scale = progress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0.2, 0.75, maxScale],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.25, 0.6, 1],
    outputRange: [0, maxOpacity * 0.45, maxOpacity, 0],
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
  const ripple2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim1 = Animated.loop(
      Animated.timing(ripple1, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const anim2 = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(ripple2, {
          toValue: 1,
          duration: 2950,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    ripple1.setValue(0);
    ripple2.setValue(0);

    anim1.start();
    anim2.start();

    return () => {
      anim1.stop();
      anim2.stop();
    };
  }, [ripple1, ripple2]);

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: 130,
        height: 130,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RippleCircle
        progress={ripple1}
        size={96}
        strokeWidth={1.8}
        maxScale={2.45}
        maxOpacity={0.22}
      />

      <RippleCircle
        progress={ripple2}
        size={94}
        strokeWidth={1.4}
        maxScale={2.6}
        maxOpacity={0.16}
      />
    </View>
  );
}