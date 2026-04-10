import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";

export default function QuizFinished({
  title,
  score,
  total,
  onRestart,
  isChapterQuiz = false,
}: {
  title: string;
  score: number;
  total: number;
  onRestart: () => void;
  isChapterQuiz?: boolean;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            {isChapterQuiz
              ? "Grattis du är redo för nästa level"
              : "Grattis!"}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              {isChapterQuiz ? "Till nästa level" : "Tillbaka"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}