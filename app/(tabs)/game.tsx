import { Redirect } from "expo-router";

import { useCourseLevelConfig } from "../game/useCourseLevelConfig";

export default function GameTabScreen() {
  const { levelIds, isReady } =
    useCourseLevelConfig();

  if (!isReady) {
    return null;
  }

  return (
    <Redirect
      href={{
        pathname: "/game/[levelId]",
        params: {
          levelId: levelIds[0],
        },
      }}
    />
  );
}