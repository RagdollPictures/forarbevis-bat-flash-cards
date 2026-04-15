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
import TransitionWaterBack from "./TransitionWaterBack";
import TransitionWaterFront from "./TransitionWaterFront";

type PlayTransitionOptions = {
  onCovered?: () => void;
};

type ScreenTransitionContextValue = {
  playWaterTransition: (options?: PlayTransitionOptions) => Promise<void>;
  isTransitionRunning: boolean;
};

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
  const overlayStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const backWaveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value * 0.92 }],
    };
  });

  const svgHeight = SCREEN_HEIGHT * 1.4;

  if (!active) return null;

  return (
    <View pointerEvents="auto" style={StyleSheet.absoluteFill}>
      <AnimatedView style={[styles.overlayLayer, backWaveStyle]}>
        <TransitionWaterBack
          width={SCREEN_WIDTH}
          height={svgHeight}
          color="#00ff00"
        />
      </AnimatedView>

      <AnimatedView style={[styles.overlayLayer, overlayStyle]}>
        <TransitionWaterFront
          width={SCREEN_WIDTH}
          height={svgHeight}
          color="#0A2E4D"
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

  const translateY = useSharedValue(SCREEN_HEIGHT + 0);
  const lockRef = useRef(false);

  const playWaterTransition = useCallback(
    async (options?: PlayTransitionOptions) => {
      if (lockRef.current) return;

      lockRef.current = true;
      setIsTransitionRunning(true);
      setActive(true);

      translateY.value = SCREEN_HEIGHT + 0;

      const riseDuration = 620;
      const revealDuration =620;
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

      await wait(revealDuration + 30);

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
    top: -220,
    bottom: 0,
    justifyContent: "flex-start",
  },
});