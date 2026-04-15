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
import Svg, { Path } from "react-native-svg";

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

  const waterHeight = SCREEN_HEIGHT * 1.35;
  const waveHeight = 160;
  const svgHeight = waterHeight + waveHeight;
  const waveTop = waveHeight;

  const frontPath = `
    M 0 ${waveTop}
    C ${SCREEN_WIDTH * 0.15} ${waveTop - 60},
      ${SCREEN_WIDTH * 0.32} ${waveTop + 25},
      ${SCREEN_WIDTH * 0.5} ${waveTop - 30}
    C ${SCREEN_WIDTH * 0.68} ${waveTop - 80},
      ${SCREEN_WIDTH * 0.85} ${waveTop + 18},
      ${SCREEN_WIDTH} ${waveTop - 40}
    L ${SCREEN_WIDTH} ${svgHeight}
    L 0 ${svgHeight}
    Z
  `;

  const backPath = `
    M 0 ${waveTop + 18}
    C ${SCREEN_WIDTH * 0.18} ${waveTop - 15},
      ${SCREEN_WIDTH * 0.38} ${waveTop + 48},
      ${SCREEN_WIDTH * 0.54} ${waveTop + 5}
    C ${SCREEN_WIDTH * 0.74} ${waveTop - 28},
      ${SCREEN_WIDTH * 0.88} ${waveTop + 38},
      ${SCREEN_WIDTH} ${waveTop + 8}
    L ${SCREEN_WIDTH} ${svgHeight}
    L 0 ${svgHeight}
    Z
  `;

  if (!active) return null;

  return (
    <View pointerEvents="auto" style={StyleSheet.absoluteFill}>
      <AnimatedView style={[styles.overlayLayer, backWaveStyle]}>
        <Svg width={SCREEN_WIDTH} height={svgHeight}>
          <Path d={backPath} fill="#ff0000" />
        </Svg>
      </AnimatedView>

      <AnimatedView style={[styles.overlayLayer, overlayStyle]}>
        <Svg width={SCREEN_WIDTH} height={svgHeight}>
          <Path d={frontPath} fill="#0A2E4D" />
        </Svg>
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

  const translateY = useSharedValue(SCREEN_HEIGHT + 260);
  const lockRef = useRef(false);

  const playWaterTransition = useCallback(
    async (options?: PlayTransitionOptions) => {
      if (lockRef.current) return;

      lockRef.current = true;
      setIsTransitionRunning(true);
      setActive(true);

      translateY.value = SCREEN_HEIGHT + 260;

      const riseDuration = 320;
      const revealDuration = 120;
      const coveredPause = 70;

      translateY.value = withTiming(0, {
        duration: riseDuration,
        easing: Easing.out(Easing.cubic),
      });

      await wait(riseDuration - 40);

      options?.onCovered?.();

      await wait(coveredPause);

      translateY.value = withTiming(-(SCREEN_HEIGHT + 220), {
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