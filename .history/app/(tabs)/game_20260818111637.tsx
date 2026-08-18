import { Redirect } from "expo-router";
import { levelIds } from "../game/levelConfig";

export default function GameTabScreen() {
  return (
    <Redirect
      href={{
        pathname: "/game/[levelId]",
        params: { levelId: levelIds[0] },
      }}
    />
  );
}