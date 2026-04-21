import { useCallback, useRef, useState } from "react";
import { useScreenTransition } from "../transitions/ScreenTransitionProvider";

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
      go,
    }: {
      nodeId?: string;
      go: () => void;
    }) => {
      if (pressLockRef.current || isTransitionRunning) return;

      pressLockRef.current = true;

      if (nodeId) {
        setPressedId(nodeId);
        setTransitioningId(nodeId);
      }

      try {
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