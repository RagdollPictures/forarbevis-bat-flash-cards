import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";

const splashAnim = require("../../../assets/lottie/node_water_splash.json");

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
  const [splashKey, setSplashKey] = useState(0);

  useEffect(() => {
    translateY.stopAnimation();
    scale.stopAnimation();

    if (isTransitioning) {
      setSplashKey((prev) => prev + 1);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -50,
            duration: 60,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 500,
            duration: 170,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.12,
            duration: 60,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0,
            duration: 180,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
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
        toValue: isPressed ? 0.92 : 1,
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
        styles.wrap,
        {
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {children}

      {isTransitioning ? (
        <View pointerEvents="none" style={styles.splashLayer}>
          <LottieView
            key={splashKey}
            source={splashAnim}
            autoPlay
            loop={false}
            style={styles.splash}
          />
        </View>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  splashLayer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  splash: {
    width: 180,
    height: 180,
  },
});