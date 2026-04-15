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
  Animated.spring(translateY, {
    toValue: 0,
    stiffness: 200,
    damping: 14,
    mass: 0.7,
    useNativeDriver: true,
  }),

  isPressed
    ? Animated.timing(scale, {
        toValue: 0.92, // tryck ner
        duration: 80,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    : Animated.spring(scale, {
        toValue: 1,
        stiffness: 180,
        damping: 12,
        mass: 0.75,
        useNativeDriver: true,
      }),
]).start();

      return;
    }

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: isPressed ? -8 : 0,
        stiffness: 220,
        damping: 14,
        mass: 0.7,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: isPressed ? 1.08 : 1,
        stiffness: 220,
        damping: 14,
        mass: 0.7,
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