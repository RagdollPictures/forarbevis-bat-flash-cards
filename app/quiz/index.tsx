import { router } from "expo-router";
import { useEffect } from "react";

import { useCourseLevelConfig } from "../game/useCourseLevelConfig";

export default function QuizIndexScreen() {
  const { levelIds, isReady } =
    useCourseLevelConfig();

  useEffect(() => {
    if (!isReady) return;

    router.replace(`/quiz/${levelIds[0]}`);
  }, [isReady, levelIds]);

  return null;
}