import { router } from "expo-router";
import { useEffect } from "react";

export default function QuizIndexScreen() {
  useEffect(() => {
    router.replace("/quiz/level_001");
  }, []);

  return null;
}