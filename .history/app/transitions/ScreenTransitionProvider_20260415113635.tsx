import LottieView from "lottie-react-native";
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    type SharedValue,
} from "react-native-reanimated";

type PlayTransitionOptions = {
  onCovered?: () => void;
};

type ScreenTransitionContextValue = {
  playWaterTransition: (options?: PlayTransitionOptions) => Promise<void>;
  isTransitionRunning: boolean;
};

const bubblesAnim = require("../../assets/lottie/bubbles.json");

const ScreenTransitionContext =
  createContext<ScreenTransitionContextValue | null>(null);

const AnimatedView = Animated.createAnimatedComponent(View);

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get("window");

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

type WaterOverlayProps = {
  active: boolean;
  translateY: SharedValue<number>;
};

function WaterOverlay({ active, translateY }: WaterOverlayProps) {
  const bubbleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value * 0.97 }],
    };
  });

  const overlayHeight = SCREEN_HEIGHT * 1.4;

  const LOTTIE_WIDTH = 375;
  const LOTTIE_HEIGHT = 1500;
  const overscan = 1.18;

  const scale = Math.max(
    SCREEN_WIDTH / LOTTIE_WIDTH,
    overlayHeight / LOTTIE_HEIGHT
  ) * overscan;

  const lottieWidth = LOTTIE_WIDTH * scale;
  const lottieHeight = LOTTIE_HEIGHT * scale;

  const lottieLeft = (SCREEN_WIDTH - lottieWidth) / 2;
  const lottieTop = (overlayHeight - lottieHeight) / 2;

  if (!active) return null;

  return (
    <View pointerEvents="auto" style={StyleSheet.absoluteFill}>
      <AnimatedView style={[styles.overlayLayer, bubbleStyle]}>
        <LottieView
          source={bubblesAnim}
          autoPlay
          loop={false}
          style={{
            position: "absolute",
            width: lottieWidth,
            height: lottieHeight,
            left: lottieLeft,
            top: lottieTop,
          }}
        />
      </AnimatedView>
    </View>
  );
}

type ScreenTransitionProviderProps = {
  children: ReactNode;
};

export function ScreenTransitionProvider({
  children,
}: ScreenTransitionProviderProps) {
  const [active, setActive] = useState(false);
  const [isTransitionRunning, setIsTransitionRunning] = useState(false);

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const lockRef = useRef(false);

  const playWaterTransition = useCallback(
    async (options?: PlayTransitionOptions) => {
      if (lockRef.current) return;

      lockRef.current = true;
      setIsTransitionRunning(true);
      setActive(true);

      translateY.value = SCREEN_HEIGHT;

      const riseDuration = 100;
      const revealDuration = 800;
      const coveredPause = 0;

      translateY.value = withTiming(0, {
        duration: riseDuration,
        easing: Easing.out(Easing.cubic),
      });

      await wait(riseDuration - 0);

      options?.onCovered?.();

      await wait(coveredPause);

      translateY.value = withTiming(-(SCREEN_HEIGHT + 0), {
        duration: revealDuration,
        easing: Easing.inOut(Easing.cubic),
      });

      await wait(revealDuration);

      setActive(false);
      setIsTransitionRunning(false);
      lockRef.current = false;
    },
    [translateY]
  );

  const value = useMemo<ScreenTransitionContextValue>(
    () => ({
      playWaterTransition,
      isTransitionRunning,
    }),
    [playWaterTransition, isTransitionRunning]
  );

  return (
    <ScreenTransitionContext.Provider value={value}>
      {children}
      <WaterOverlay active={active} translateY={translateY} />
    </ScreenTransitionContext.Provider>
  );
}

export function useScreenTransition() {
  const context = useContext(ScreenTransitionContext);

  if (!context) {
    throw new Error(
      "useScreenTransition must be used inside ScreenTransitionProvider"
    );
  }

  return context;
}

const styles = StyleSheet.create({
  overlayLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "flex-start",
  },
});