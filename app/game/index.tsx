import { router } from "expo-router";
import { useEffect } from "react";

export default function GameIndexScreen() {
  useEffect(() => {
    router.replace({
      pathname: "/game/[levelId]",
      params: { levelId: "level_001" },
    });
  }, []);

  return null;
}