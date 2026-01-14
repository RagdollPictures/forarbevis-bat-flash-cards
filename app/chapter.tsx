import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { chapters } from "../constants/flashcards";

export default function Chapter() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj kapitel</Text>

      {chapters.map((c) => (
        <Pressable
          key={c.id}
          style={styles.card}
          onPress={() => router.push(`/deck?chapter=${encodeURIComponent(c.id)}`)}
        >
          <Text style={styles.cardText}>{c.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  card: { padding: 16, borderRadius: 14, borderWidth: 1 },
  cardText: { fontSize: 18 },
});
