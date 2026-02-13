import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome6 } from "@expo/vector-icons";

import { getQuizzes } from "../../../constants/flashcards";
import {
  getAllQuizProgress,
  type QuizProgressState,
  type SavedQuizProgress,
} from "../../../constants/flashcards/quizProgress";

function MiniProgressRow({ progress }: { progress: QuizProgressState[] }) {
  return (
    <View style={styles.miniRow}>
      {progress.map((p, i) => (
        <View
          key={`m-${i}`}
          style={[
            styles.miniSeg,
            p === "correct" && styles.miniCorrect,
            p === "wrong" && styles.miniWrong,
          ]}
        />
      ))}
    </View>
  );
}

function getIconNameByQuizId(quizId: string): React.ComponentProps<
  typeof FontAwesome6
>["name"] {
  switch (quizId) {
    case "sjokortet":
      return "map-location-dot";
    case "sjokortSymboler":
      return "shapes";
    case "sjokortet_sjomarken":
      return "tower-broadcast";
   case "sjokortsarbete":
  return "ruler-combined";
    case "navigationsteori":
      return "compass";
    case "praktisk_navigation":
      return "route";
    case "vajningsregler":
      return "scale-balanced";
    case "lanternor":
      return "lightbulb";
    case "manovrering":
      return "sailboat";
    case "navigationsinstrument":
      return "gauge";
    case "sjomanskap":
      return "anchor";
    case "signalering":
      return "bullhorn";
    case "sakerhet":
      return "life-ring";
    case "sjukvard":
      return "kit-medical";
    case "vader":
      return "cloud-sun";
    case "miljo":
      return "leaf";
    default:
      return "circle-question";
  }
}

export default function QuizMenuScreen() {
  const quizzes = useMemo(() => getQuizzes("forarintyg"), []);
  const [progressByQuizId, setProgressByQuizId] = useState<
    Record<string, SavedQuizProgress>
  >({});

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const map = await getAllQuizProgress();
        if (alive) setProgressByQuizId(map);
      })();

      return () => {
        alive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.list}>
          {quizzes.map((q) => {
            const saved = progressByQuizId[q.id] ?? null;

            const progressArray = saved
              ? saved.progress
              : Array(q.deck.length).fill(null);

            const iconName = getIconNameByQuizId(q.id);

            return (
              <Pressable
                key={q.id}
                onPress={() => router.push(`/quiz/${q.id}`)}
                style={styles.item}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.iconCircle}>
                    <FontAwesome6 name={iconName} size={18} color="#111" />
                  </View>

                  <Text style={styles.itemTitle}>{q.title}</Text>
                </View>

                <MiniProgressRow progress={progressArray} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#1e2939",
  },
  container: {
    padding: 24,
    paddingBottom: 120,
  },

  list: {
    marginTop: 16,
    gap: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 14,
    padding: 16,
    backgroundColor: "#fff",
  },

  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },

  miniRow: {
    flexDirection: "row",
    gap: 2,
    marginTop: 10,
  },
  miniSeg: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: "rgba(17,17,17,0.10)",
  },
  miniCorrect: {
    backgroundColor: "#1e8e3e",
  },
  miniWrong: {
    backgroundColor: "#c62828",
  },
});
