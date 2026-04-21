import React, { createContext, useContext, useMemo, type ReactNode } from "react";

type ScreenTransitionContextValue = {
  playWaterTransition: (options?: { onCovered?: () => void }) => Promise<void>;
  isTransitionRunning: boolean;
};

const ScreenTransitionContext =
  createContext<ScreenTransitionContextValue | null>(null);

export function ScreenTransitionProvider({ children }: { children: ReactNode }) {
  const value = useMemo(
    () => ({
      isTransitionRunning: false,
      playWaterTransition: async (options?: { onCovered?: () => void }) => {
        options?.onCovered?.();
      },
    }),
    []
  );

  return (
    <ScreenTransitionContext.Provider value={value}>
      {children}
    </ScreenTransitionContext.Provider>
  );
}

export function useScreenTransition() {
  const context = useContext(ScreenTransitionContext);

  if (!context) {
    throw new Error("useScreenTransition must be used inside ScreenTransitionProvider");
  }

  return context;
}