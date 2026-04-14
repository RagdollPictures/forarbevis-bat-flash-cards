import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

export default function FloatingNode({
  children,
  delay = 0,
  amplitude = 4,
  rotateDeg = 2,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  amplitude?: number;
  rotateDeg?: number;
  style?: ViewStyle;
}) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1800,
          delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [delay, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [amplitude, -amplitude],
  });

  const rotate = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [`-${rotateDeg}deg`, `${rotateDeg}deg`, `-${rotateDeg}deg`],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY }, { rotate }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}