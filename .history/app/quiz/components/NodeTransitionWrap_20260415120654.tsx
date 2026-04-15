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

  useEffect(() => {
    translateY.stopAnimation();
    scale.stopAnimation();

    if (isTransitioning) {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(translateY, {
            toValue: -22,
            stiffness: 260,
            damping: 12,
            mass: 0.75,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 500,
            duration: 240,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.14,
            stiffness: 240,
            damping: 12,
            mass: 0.75,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.9,
            duration: 240,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      return;
    }

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: isPressed ? -10 : 0,
        stiffness: 180,
        damping: 12,
        mass: 0.8,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: isPressed ? 1.12 : 1,
        stiffness: 170,
        damping: 11,
        mass: 0.75,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isPressed, isTransitioning, scale, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}