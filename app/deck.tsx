import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FlashCard from "../components/FlashCard";
import { getDeck } from "../constants/flashcards";

export default function Deck() {
  const { deckId, title } = useLocalSearchParams<{ deckId?: string; title?: string }>();

  const decodedDeckId = useMemo(() => (deckId ? decodeURIComponent(deckId) : ""), [deckId]);
  const decodedTitle = useMemo(() => (title ? decodeURIComponent(title) : ""), [title]);

  const deck = getDeck(decodedDeckId);
  const [index, setIndex] = useState(0);

  const card = deck[index];

  if (!decodedDeckId) {
    return (
      <View style={styles.container}>
        <Text>Ingen kortlek vald.</Text>
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>{decodedTitle || decodedDeckId}</Text>
        <Text>Inga kort ännu i den här kortleken.</Text>
      </View>
    );
  }

  const canPrev = index > 0;
  const canNext = index < deck.length - 1;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{decodedTitle}</Text>
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
  subtitle: { fontSize: 16, opacity: 0.7, textAlign: "center" },
  counter: { fontSize: 14, opacity: 0.6, textAlign: "center" },
  navRow: { flexDirection: "row", gap: 12, justifyContent: "center", marginTop: 8 },
  navButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1 },
  navButtonDisabled: { opacity: 0.4 },
  navButtonText: { fontSize: 16 },
});
