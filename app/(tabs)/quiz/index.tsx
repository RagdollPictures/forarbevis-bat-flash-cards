import { colorScheme } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const UNLOCK_PERCENT = 75;

// Detta är “klarad någon gång” (mastery), inte “unlocked”.
const CLEARED_KEY = "forarintyg_cleared_quiz_ids_v1";

function getProgressColor(percent: number) {
  if (percent <= 30) return colorScheme.orange;
  if (percent >= 100) return colorScheme.green;
  return colorScheme.blue;
}

function calcPercent(saved: SavedQuizProgress | null) {
  if (!saved) return 0;
  const total = Math.max(1, saved.progress.length);
  const correct = saved.progress.filter((p) => p === "correct").length;
  return Math.round((correct / total) * 100);
}

async function loadClearedSet(): Promise<Set<string>> {
  const raw = await AsyncStorage.getItem(CLEARED_KEY);
  if (!raw) return new Set();
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

async function saveClearedSet(set: Set<string>) {
  await AsyncStorage.setItem(CLEARED_KEY, JSON.stringify(Array.from(set)));
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
  const [clearedIds, setClearedIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const [map, cleared] = await Promise.all([
          getAllQuizProgress(),
          loadClearedSet(),
        ]);

        if (!alive) return;

        setProgressByQuizId(map);
        setClearedIds(cleared);
      })();

      return () => {
        alive = false;
      };
    }, [])
  );

  // 1) Uppdatera CLEARED (mastery) när något når >= 75% (permanent)
  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const currentCleared = await loadClearedSet();
        let changed = false;

        for (const q of quizzes) {
          const saved = progressByQuizId[q.id] ?? null;
          const percent = calcPercent(saved);

          if (percent >= UNLOCK_PERCENT && !currentCleared.has(q.id)) {
            currentCleared.add(q.id);
            changed = true;
          }
        }

        if (!alive) return;

        if (changed) await saveClearedSet(currentCleared);
        setClearedIds(currentCleared);
      })();

      return () => {
        alive = false;
      };
    }, [progressByQuizId, quizzes])
  );

  // 2) Räkna ut vilka som är UNLOCKED sekventiellt från clearedIds (ingen “unlock” sparas)
  const unlockedIds = useMemo(() => {
    const s = new Set<string>();
    if (quizzes.length === 0) return s;

    // Första alltid spelbart
    s.add(quizzes[0].id);

    // Lås upp nästa bara om föregående är CLEARED
    for (let i = 0; i < quizzes.length - 1; i++) {
      const currentId = quizzes[i].id;
      const nextId = quizzes[i + 1].id;

      if (!clearedIds.has(currentId)) break;
      s.add(nextId);
    }

    return s;
  }, [quizzes, clearedIds]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {__DEV__ ? (
          <View style={styles.devPanel}>
            <Pressable
              onPress={async () => {
                await AsyncStorage.clear();
                setClearedIds(new Set());
                setProgressByQuizId({});
                console.log("RESET ALL ASYNCSTORAGE");
              }}
              style={styles.devResetBtn}
            >
              <Text style={styles.devResetText}>RESET ALL DATA (DEV)</Text>
            </Pressable>

            <View style={styles.devDebug}>
              <Text style={styles.devDebugTitle}>DEBUG</Text>
              <Text style={styles.devDebugText}>
                Cleared: {Array.from(clearedIds).join(", ") || "-"}
              </Text>
              <Text style={styles.devDebugText}>
                Unlocked: {Array.from(unlockedIds).join(", ") || "-"}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.list}>
          {quizzes.map((q, index) => {
            const saved = progressByQuizId[q.id] ?? null;
            const percent = calcPercent(saved);

            const isUnlocked = unlockedIds.has(q.id);
            const iconName = getIconNameByQuizId(q.id);

            return (
              <Pressable
                key={q.id}
                onPress={() => {
                  if (!isUnlocked) return;
                  router.push(`/quiz/${q.id}`);
                }}
                style={styles.item}
                disabled={!isUnlocked}
              >
                <View
                  style={[
                    styles.overlay,
                    isUnlocked ? styles.overlayUnlocked : styles.overlayLocked,
                  ]}
                >
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
                      <View style={styles.titleRow}>
                        <Text style={styles.itemTitle}>{q.title}</Text>

                        {!isUnlocked ? (
                          <View style={styles.lockWrap}>
                            <FontAwesome6
                              name="lock"
                              size={14}
                              color="rgba(17,17,17,0.55)"
                            />
                          
                          </View>
                        ) : null}
                      </View>

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

  devPanel: {
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  devResetBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  devResetText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111",
    textAlign: "center",
  },
  devDebug: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
  },
  devDebugTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111",
    marginBottom: 6,
  },
  devDebugText: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(17,17,17,0.7)",
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

  overlay: {
    padding: 16,
  },
  overlayUnlocked: {
    backgroundColor: "#ffffff",
  },
  overlayLocked: {
    backgroundColor: "#cccccc",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  content: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    flex: 1,
  },

  lockWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lockText: {
    fontSize: 12,
    fontWeight: "800",
    color: "rgba(17,17,17,0.55)",
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
