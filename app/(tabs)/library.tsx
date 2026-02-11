import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sources } from "../../constants/flashcards";

export default function Library() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Välj läromedel</Text>

        {sources.map((s) => (
          <Pressable
            key={s.id}
            style={styles.card}
            onPress={() =>
              router.push(`/chapter?sourceId=${encodeURIComponent(s.id)}`)
            }
          >
            <Text style={styles.cardText}>{s.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#1e2939",
  },
  screen: {
    flex: 1,
    backgroundColor: "#1e2939",
  },
  container: {
    padding: 24,
    gap: 12,

    // 🔑 viktigt: så innehållet inte hamnar bakom bottom baren
    paddingBottom: 120,

    // liten extra säkerhetsmarginal
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  card: {
    padding: 16,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  cardText: {
    fontSize: 18,
  },
});
