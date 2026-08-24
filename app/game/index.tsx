import { router } from "expo-router";
import { useEffect } from "react";

import { useCourseLevelConfig } from "./useCourseLevelConfig";

export default function GameIndexScreen() {
  const { levelIds, isReady } =
    useCourseLevelConfig();

  useEffect(() => {
    if (!isReady) return;

    router.replace({
      pathname: "/game/[levelId]",
      params: {
        levelId: levelIds[0],
      },
    });
  }, [isReady, levelIds]);

  return null;
}