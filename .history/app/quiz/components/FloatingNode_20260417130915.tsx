import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

export default function FloatingNode({
  children,
  delay = 0,
  amplitude = 4,
  rotateDeg = 2,
  style,
  paused = false,
}: {
  children: React.ReactNode;
  delay?: number;
  amplitude?: number;
  rotateDeg?: number;
  style?: ViewStyle;
  paused?: boolean;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (paused) {
      loopRef.current?.stop();
      return;
    }

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

    loopRef.current = loop;
    loop.start();

    return () => {
      loop.stop();
    };
  }, [delay, paused, progress]);

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