import { router } from "expo-router";
import { useEffect } from "react";

export default function GameIndexScreen() {
  useEffect(() => {
    router.replace("/game/level_001");
  }, []);

  return null;
}