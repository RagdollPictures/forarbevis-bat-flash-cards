import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { sources } from "../constants/flashcards";

export default function Library() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj läromedel</Text>

      {sources.map((s) => (
        <Pressable
          key={s.id}
          style={styles.card}
          onPress={() => router.push(`/chapter?sourceId=${encodeURIComponent(s.id)}`)}

        >
          <Text style={styles.cardText}>{s.title}</Text>
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
