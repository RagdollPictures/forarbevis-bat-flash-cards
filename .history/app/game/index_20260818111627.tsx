import { router } from "expo-router";
import { useEffect } from "react";
import { levelIds } from "./levelConfig";

export default function GameIndexScreen() {
  useEffect(() => {
    router.replace({
      pathname: "/game/[levelId]",
      params: { levelId: levelIds[0] },
    });
  }, []);

  return null;
}