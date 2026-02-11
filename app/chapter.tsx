import { router, Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getChapters, sources } from "../constants/flashcards";
import type { Chapter } from "../constants/flashcards/types";

export default function ChapterPage() {
  const { sourceId } = useLocalSearchParams<{ sourceId?: string }>();

  const decodedSourceId = useMemo(
    () => (sourceId ? decodeURIComponent(sourceId) : ""),
    [sourceId]
  );

  const sourceTitle =
    sources.find((s) => s.id === decodedSourceId)?.title ?? "Okänt läromedel";

  const chapters = getChapters(decodedSourceId);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  if (!decodedSourceId) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Kapitel" }} />
        <Text style={styles.title}>Inget läromedel valt</Text>
      </View>
    );
  }

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderChapter(c: Chapter, level: number) {
    const isGroup = !!c.children?.length;
    const isOpen = !!open[c.id];
    const isChild = level > 0;

    const pressableStyle = [
      styles.card,
      { paddingLeft: 16 + level * 12 },
      isChild ? styles.childCard : null,
    ];

    if (isGroup) {
      return (
        <View key={c.id}>
          <Pressable style={pressableStyle} onPress={() => toggle(c.id)}>
            <Text style={styles.arrow}>{isOpen ? "▾" : "▸"}</Text>
            <Text style={styles.cardText}>{c.title}</Text>
          </Pressable>

          {isOpen && c.children!.map((child) => renderChapter(child, level + 1))}
        </View>
      );
    }

    return (
      <Pressable
        key={c.id}
        style={pressableStyle}
        onPress={() =>
          router.push(
            `/deck?deckId=${encodeURIComponent(
              c.deckId ?? ""
            )}&title=${encodeURIComponent(c.title)}`
          )
        }
      >
        <Text style={styles.cardText}>{c.title}</Text>
      </Pressable>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "Kapitel" }} />
      <Text style={styles.title}>{sourceTitle}</Text>
      <Text style={styles.subtitle}>Välj kapitel</Text>

      {chapters.map((c) => renderChapter(c, 0))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#1e2939' ,flex: 1 },
  container: { padding: 24, gap: 12, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700" , color: '#ffffff' },
  subtitle: { fontSize: 16, opacity: 0.7 , color: '#ffffff' },

  card: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  childCard: {
    marginTop: 8,
    marginLeft: 10,
  },

  arrow: {
    fontSize: 18,
    width: 20,
  },

  cardText: {
    fontSize: 18,
    flex: 1,
  },
});
