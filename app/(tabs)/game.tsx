import { Redirect } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCourseLevelConfig } from "../game/useCourseLevelConfig";

export default function GameTabScreen() {
  const {
    levelIds,
    isContentReady,
    hasLevels,
  } = useCourseLevelConfig();

  if (!isContentReady) {
    return null;
  }

  if (!hasLevels) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Inget innehåll ännu
        </Text>

        <Text style={styles.text}>
          Den här kursen har inget innehåll ännu.
        </Text>
      </View>
    );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.65,
  },
});