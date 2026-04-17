import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { buildReadSections } from "../../constants/flashcards";
import { cardImages } from "../../constants/flashcards/cardImages";

export default function ReadScreen() {
  const params = useLocalSearchParams<{ deckId?: string; title?: string }>();

  const deckId = typeof params.deckId === "string" ? params.deckId : "";
  const title = typeof params.title === "string" ? params.title : "";

  const sections = useMemo(() => {
    return buildReadSections(deckId);
  }, [deckId]);

  const stickyHeaderIndices = useMemo(() => {
    return sections.map((_, index) => 1 + index * 2);
  }, [sections]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        stickyHeaderIndices={stickyHeaderIndices}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>{title}</Text>
        </View>

        {sections.flatMap((section) => {
          const imageSource = section.imageKey
            ? cardImages[section.imageKey]
            : undefined;

          return [
            <View key={`${section.id}-sticky`} style={styles.stickyHeader}>
              <Text style={styles.stickyHeaderText}>{section.title}</Text>
            </View>,

            <View key={section.id} style={styles.sectionCard}>
              <Text style={styles.bodyText}>{section.body}</Text>

              {imageSource ? (
                <View style={styles.imageWrap}>
                  <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>,
          ];
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4efe7",
  },

  content: {
    paddingBottom: 40,
  },

  pageHeader: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#163049",
  },

  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#f4efe7",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(22,48,73,0.08)",
  },

  stickyHeaderText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#163049",
  },

  sectionCard: {
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },

  bodyText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#24384d",
  },

  imageWrap: {
    marginTop: 16,
  },

  image: {
    width: "100%",
    height: 180,
  },
});