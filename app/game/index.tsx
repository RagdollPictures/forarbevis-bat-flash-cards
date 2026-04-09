import { router } from "expo-router";
import { useEffect } from "react";

export default function GameIndexScreen() {
  useEffect(() => {
    router.push({
  pathname: "/game/[levelId]",
  params: { levelId: "level_002" },
});
  }, []);

  return null;
}