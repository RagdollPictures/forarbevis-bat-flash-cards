import { colorScheme } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { getQuizzes } from "../../../constants/flashcards";
import {
  getAllQuizProgress,
  type SavedQuizProgress,
} from "../../../constants/flashcards/quizProgress";

function getProgressColor(percent: number) {
  if (percent <= 30) return colorScheme.orange;
  if (percent >= 100) return colorScheme.green;
  return colorScheme.blue;
}

function ProgressRing({
  percent,
  size,
  strokeWidth,
  children,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
  children: React.ReactNode;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const dashArray = `${circumference} ${circumference}`;
  const dashOffset = circumference - (clamped / 100) * circumference;

  const ringColor = getProgressColor(clamped);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(17,17,17,0.18)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {clamped > 0 ? (
          <Circle
            stroke={ringColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        ) : null}
      </Svg>

      <View style={[StyleSheet.absoluteFillObject, styles.ringCenter]}>
        {children}
      </View>
    </View>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const barColor = getProgressColor(clamped);

  return (
    <View style={styles.progressBarWrap}>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${clamped}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      <Text style={styles.progressLabel}>{clamped}%</Text>
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
          {quizzes.map((q, index) => {
            const saved = progressByQuizId[q.id] ?? null;

            const percent = saved
              ? Math.round(
                  (saved.progress.filter((p) => p === "correct").length /
                    Math.max(1, saved.progress.length)) *
                    100
                )
              : 0;

            const iconName = getIconNameByQuizId(q.id);

            const bgY = -100 - (index % 6) * 35;

            return (
              <Pressable
                key={q.id}
                onPress={() => router.push(`/quiz/${q.id}`)}
                style={styles.item}
              >
                <View style={styles.overlay}>
                  <View style={styles.row}>
                    <ProgressRing percent={percent} size={60} strokeWidth={6}>
                      <View style={styles.iconInner}>
                        <FontAwesome6
                          name={iconName}
                          size={28}
                          color={colorScheme.blue}
                        />
                      </View>
                    </ProgressRing>

                    <View style={styles.content}>
                      <Text style={styles.itemTitle}>{q.title}</Text>
                      <ProgressBar percent={percent} />
                    </View>
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
    backgroundColor: colorScheme.darkBlue,
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
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },

  bgWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  bgImage: {
    width: "150%",
    height: 320,
  },

  overlay: {
    padding: 16,
    backgroundColor: "#ffffff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  content: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  progressBarWrap: {
    marginTop: 10,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(17,17,17,0.12)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 999,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
    color: "rgba(17,17,17,0.55)",
  },

  ringCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconInner: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
