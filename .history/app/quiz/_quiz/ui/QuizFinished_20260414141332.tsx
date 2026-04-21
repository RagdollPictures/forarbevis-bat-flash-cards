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
  nextLevelId = null,
}: {
  title: string;
  score: number;
  total: number;
  onRestart: () => void;
  isChapterQuiz?: boolean;
  nextLevelId?: string | null;
}) {
  const goNext = () => {
    if (isChapterQuiz && nextLevelId) {
      router.push({
        pathname: "/game/[levelId]",
        params: { levelId: nextLevelId },
      });
      return;
    }

    router.back();
  };

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
            onPress={goNext}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              {isChapterQuiz && nextLevelId ? "Till nästa bana!" : "Fortsätt"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}