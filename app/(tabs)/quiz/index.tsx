import { router } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getQuizzes } from "../../../constants/flashcards";

export default function QuizMenuScreen() {
  const quizzes = useMemo(() => getQuizzes("forarintyg"), []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.text}>Välj vilket quiz du vill träna på.</Text>

        <View style={styles.list}>
          {quizzes.map((q) => (
            <Pressable
              key={q.id}
              onPress={() => router.push(`/quiz/${q.id}`)}
              style={styles.item}
            >
              <Text style={styles.itemTitle}>{q.title}</Text>

              <Text style={styles.itemMeta}>{q.deck.length} frågor</Text>
            </Pressable>
          ))}
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
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  itemMeta: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
  },
});
