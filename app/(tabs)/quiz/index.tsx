import { FontAwesome6 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

function getIconNameByQuizId(
  quizId: string
): React.ComponentProps<typeof FontAwesome6>["name"] {
  switch (quizId) {
    case "sjokortet":
      return "map-location-dot";
    case "sjokortSymboler":
      return "shapes";
    case "sjokortet_sjomarken":
      return "compass-drafting";
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
                <View style={styles.row}>
                  <View style={styles.iconCircle}>
                    <FontAwesome6 name={iconName} size={26} color="#111" />
                  </View>

                  <View style={styles.content}>
                    <Text style={styles.itemTitle}>{q.title}</Text>
                    <MiniProgressRow progress={progressArray} />
                  </View>
                </View>
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
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  miniRow: {
    flexDirection: "row",
    gap: 3,
    marginTop: 10,
  },
  miniSeg: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(17,17,17,0.10)",
  },
  miniCorrect: {
    backgroundColor: "#16a34a",
  },
  miniWrong: {
    backgroundColor: "#dc2626",
  },
});
