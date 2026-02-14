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
}: {
  title: string;
  score: number;
  total: number;
  onRestart: () => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Quiz klart.</Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultScore}>
            {score} / {total}
          </Text>
          <Text style={styles.resultText}>Rätt svar</Text>
        </View>

        <View style={styles.actions}>
          <Pressable onPress={onRestart} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Prova igen!</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Tillbaka</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
