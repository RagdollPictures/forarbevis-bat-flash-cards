import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

export default function NodeTransitionWrap({
  children,
  isPressed,
  isTransitioning,
  style,
}: {
  children: React.ReactNode;
  isPressed: boolean;
  isTransitioning: boolean;
  style?: ViewStyle;
}) {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTransitioning) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 500,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 90,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: isPressed ? 1.12 : 1,
        duration: 90,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 90,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isPressed, isTransitioning, opacity, scale, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}