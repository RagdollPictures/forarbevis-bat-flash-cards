import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getQuizById } from "../../../constants/flashcards";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type QuizCard = {
  id: string;
  questionQuiz?: string;
  question?: string;
  options: string[];
  correctOptionIndex: number;
};

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const resolved = getQuizById(typeof quizId === "string" ? quizId : "");

  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!resolved) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Quiz</Text>
          <Text style={styles.text}>Det här quizet finns inte.</Text>

          <View style={styles.actions}>
            <Pressable
              onPress={() => router.back()}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Tillbaka
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const screenTitle = resolved.subtitle
    ? `${resolved.title} – ${resolved.subtitle}`
    : resolved.title;

  const rawDeck = (resolved.deck ?? []) as unknown as QuizCard[];

  const deck = useMemo(() => {
    return rawDeck.filter((c) => {
      if (!c) return false;
      if (!Array.isArray(c.options)) return false;
      if (c.options.length < 2) return false;
      if (!Number.isInteger(c.correctOptionIndex)) return false;
      if (c.correctOptionIndex < 0) return false;
      if (c.correctOptionIndex >= c.options.length) return false;
      return true;
    });
  }, [rawDeck]);

  if (deck.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.text}>
            Det här quizet är inte klart än (inga frågor med options +
            correctOptionIndex).
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={() => router.back()}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Tillbaka
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));
  const [progress, setProgress] = useState<("correct" | "wrong" | null)[]>(
    () => Array(shuffledDeck.length).fill(null)
  );

  const safeIndex = Math.min(index, shuffledDeck.length - 1);
  const card = shuffledDeck[safeIndex];

  const quiz = useMemo(() => {
    const zipped = card.options.map((text, originalIndex) => ({
      text,
      originalIndex,
    }));

    const shuffled = shuffle(zipped);

    const correctOptionIndex = shuffled.findIndex(
      (o) => o.originalIndex === card.correctOptionIndex
    );

    return {
      options: shuffled.map((o) => o.text),
      correctOptionIndex,
    };
  }, [card.id, card.correctOptionIndex]);

  const onSelect = (i: number) => {
    if (isChecked || isFinished) return;

    const wasCorrect = i === quiz.correctOptionIndex;

    setSelectedIndex(i);
    setIsChecked(true);

    setProgress((prev) => {
      const next = [...prev];
      next[safeIndex] = wasCorrect ? "correct" : "wrong";
      return next;
    });

    if (wasCorrect) {
      setScore((s) => s + 1);
    }
  };

  const onNext = () => {
    const next = safeIndex + 1;

    if (next >= shuffledDeck.length) {
      setIsFinished(true);
      return;
    }

    setIndex(next);
    setSelectedIndex(null);
    setIsChecked(false);
  };

  const restart = () => {
    const nextDeck = shuffle(deck);
    setShuffledDeck(nextDeck);
    setProgress(Array(nextDeck.length).fill(null));

    setIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.text}>Quiz klart.</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultScore}>
              {score} / {shuffledDeck.length}
            </Text>
            <Text style={styles.resultText}>Rätt svar</Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={restart}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Prova igen!
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Tillbaka
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const questionText = card.questionQuiz ?? card.question ?? "";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{screenTitle}</Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressRow}>
            {progress.map((p, i) => (
              <View
                key={`p-${i}`}
                style={[
                  styles.progressSeg,
                  i === safeIndex && !p && styles.progressActive,
                  p === "correct" && styles.progressCorrect,
                  p === "wrong" && styles.progressWrong,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.question}>{questionText}</Text>

          <View style={styles.options}>
            {quiz.options.map((opt, i) => {
              const isCorrect = isChecked && i === quiz.correctOptionIndex;
              const isWrong =
                isChecked && selectedIndex === i && i !== quiz.correctOptionIndex;

              return (
                <Pressable
                  key={`${card.id}-opt-${i}`}
                  onPress={() => onSelect(i)}
                  disabled={isChecked}
                  style={[
                    styles.option,
                    isCorrect && styles.optionCorrect,
                    isWrong && styles.optionWrong,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      (isCorrect || isWrong) && styles.optionTextChecked,
                    ]}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {isChecked && (
            <View style={styles.actions}>
              <Pressable
                onPress={onNext}
                style={[styles.button, styles.buttonSecondary]}
              >
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                  {safeIndex + 1 >= shuffledDeck.length ? "Resultat" : "Nästa"}
                </Text>
              </Pressable>
            </View>
          )}
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#ffffff",
  },
  progressWrap: {
    marginTop: 12,
  },
  progressRow: {
    flexDirection: "row",
    width: "100%",
    gap: 6,
  },
  progressSeg: {
    flex: 1,
    height: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  progressActive: {
    backgroundColor: "rgba(255,255,255,0.38)",
  },
  progressCorrect: {
    backgroundColor: "#1e8e3e",
  },
  progressWrong: {
    backgroundColor: "#c62828",
  },
  card: {
    marginTop: 16,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  options: {
    marginTop: 14,
    gap: 10,
  },
  option: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
  },
  optionCorrect: {
    backgroundColor: "#1e8e3e",
  },
  optionWrong: {
    backgroundColor: "#c62828",
  },
  optionText: {
    fontSize: 16,
    color: "#111",
  },
  optionTextChecked: {
    color: "#ffffff",
    fontWeight: "700",
  },
  actions: {
    marginTop: 14,
    gap: 10,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#111",
  },
  buttonSecondary: {
    backgroundColor: "#f3f3f3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: "#111",
  },
  resultCard: {
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#f9fafb",
    alignItems: "center",
  },
  resultScore: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
  },
  resultText: {
    marginTop: 6,
    fontSize: 16,
    color: "#444",
  },
});
