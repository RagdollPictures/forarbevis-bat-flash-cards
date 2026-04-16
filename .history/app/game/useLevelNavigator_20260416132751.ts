import { useCallback, useRef, useState } from "react";
import { useScreenTransition } from "../transitions/ScreenTransitionProvider";

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function useLevelNavigation() {
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [transitioningId, setTransitioningId] = useState<string | null>(null);

  const pressLockRef = useRef(false);
  const { playWaterTransition, isTransitionRunning } = useScreenTransition();

  const resetNodeStates = useCallback(() => {
    setPressedId(null);
    setTransitioningId(null);
  }, []);

  const runRouteTransition = useCallback(
    async ({
      nodeId,
      delayMs = 0,
      go,
    }: {
      nodeId?: string;
      delayMs?: number;
      go: () => void;
    }) => {
      if (pressLockRef.current || isTransitionRunning) return;

      pressLockRef.current = true;

      if (nodeId) {
        setPressedId(nodeId);
        setTransitioningId(nodeId);
      }

      try {
        if (delayMs > 0) {
          await wait(delayMs);
        }

        await playWaterTransition({
          onCovered: () => {
            go();
          },
        });
      } catch (error) {
        if (nodeId) {
          setPressedId(null);
          setTransitioningId(null);
        }
        throw error;
      } finally {
        pressLockRef.current = false;
      }
    },
    [isTransitionRunning, playWaterTransition]
  );

  return {
    pressedId,
    transitioningId,
    resetNodeStates,
    runRouteTransition,
  };
}