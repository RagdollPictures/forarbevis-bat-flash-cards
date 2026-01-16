import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
       <Stack.Screen options={{ title: sourceTitle }} />
     
     

      {chapters.map((c) => (
        <Pressable
          key={c.id}
          style={styles.card}
          onPress={() =>
            router.push(
              `/deck?deckId=${encodeURIComponent(c.deckId)}&title=${encodeURIComponent(c.title)}`
            )
          }
        >
          <Text style={styles.cardText}>{c.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 24, gap: 12, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 16, opacity: 0.7 },
  card: { padding: 16, borderRadius: 14, borderWidth: 1 },
  cardText: { fontSize: 18 },
});
