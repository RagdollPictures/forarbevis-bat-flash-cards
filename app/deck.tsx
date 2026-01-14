import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FlashCard from "../components/FlashCard";
import { deckByChapter, type ChapterId } from "../constants/flashcards";

export default function Deck() {
  const { chapter } = useLocalSearchParams<{ chapter?: string }>();

  const chapterId = useMemo(() => {
    const decoded = chapter ? decodeURIComponent(chapter) : "Sjökortet";
    return (decoded as ChapterId) || "Sjökortet";
  }, [chapter]);

  const deck = deckByChapter[chapterId] ?? [];
  const [index, setIndex] = useState(0);

  const card = deck[index];

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Hittade ingen kortlek för kapitel: {chapterId}</Text>
      </View>
    );
  }

  const canPrev = index > 0;
  const canNext = index < deck.length - 1;

  return (
    <View style={styles.container}>
      <Text style={styles.chapterTitle}>{chapterId}</Text>
      <Text style={styles.counter}>
        {index + 1} / {deck.length}
      </Text>

      <FlashCard card={card} resetKey={card.id} />

      <View style={styles.navRow}>
        <Pressable
          onPress={() => canPrev && setIndex((i) => i - 1)}
          style={[styles.navButton, !canPrev && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>Föregående</Text>
        </Pressable>

        <Pressable
          onPress={() => canNext && setIndex((i) => i + 1)}
          style={[styles.navButton, !canNext && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>Nästa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 10 },
  chapterTitle: { fontSize: 18, fontWeight: "600", opacity: 0.7, textAlign: "center" },
  counter: { fontSize: 14, opacity: 0.6, textAlign: "center" },
  navRow: { flexDirection: "row", gap: 12, justifyContent: "center", marginTop: 8 },
  navButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1 },
  navButtonDisabled: { opacity: 0.4 },
  navButtonText: { fontSize: 16 },
});
