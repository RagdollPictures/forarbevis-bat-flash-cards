import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getChapters, sources } from "../constants/flashcards";

export default function Chapter() {
  const { sourceId } = useLocalSearchParams<{ sourceId?: string }>();
  const decodedSourceId = sourceId ? decodeURIComponent(sourceId) : "";

  const sourceTitle =
    sources.find((s) => s.id === decodedSourceId)?.title ?? "Okänt läromedel";

  const chapters = getChapters(decodedSourceId);

  if (!decodedSourceId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inget läromedel valt</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sourceTitle}</Text>
      <Text style={styles.subtitle}>Välj kapitel</Text>

      {chapters.map((c) => (
        <Pressable
          key={c.id}
          style={styles.card}
          onPress={() =>
            router.push(`/deck?deckId=${encodeURIComponent(c.deckId)}&title=${encodeURIComponent(c.title)}`)
          }
        >
          <Text style={styles.cardText}>{c.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 16, opacity: 0.7 },
  card: { padding: 16, borderRadius: 14, borderWidth: 1 },
  cardText: { fontSize: 18 },
});
