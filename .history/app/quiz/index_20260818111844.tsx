import { router } from "expo-router";
import { useEffect } from "react";
import { levelIds } from "../game/levelConfig";

export default function QuizIndexScreen() {
  useEffect(() => {
    router.replace(`/quiz/${levelIds[0]}`);
  }, []);

  return null;
}