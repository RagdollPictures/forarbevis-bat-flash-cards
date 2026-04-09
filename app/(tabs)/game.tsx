import { Redirect } from "expo-router";

export default function GameTabScreen() {
  return (
    <Redirect
      href={{
        pathname: "/game/[levelId]",
        params: { levelId: "level_001" },
      }}
    />
  );
}