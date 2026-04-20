import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChapterMenuMap from "./ChapterMenuMap";
import { levelIds, type LevelId } from "./levelConfig";

export default function ChaptersScreen() {
  const params = useLocalSearchParams<{ currentLevelId?: string }>();
  const currentLevelId = (params.currentLevelId ?? levelIds[0]) as LevelId;

  const unlockedLevelIds = new Set(levelIds);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#dff4ff" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <Pressable
        onPress={() => router.back()}
        style={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#111",
          }}
        >
          Tillbaka
        </Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        <ChapterMenuMap
          currentLevelId={currentLevelId}
          unlockedLevelIds={unlockedLevelIds}
        />
      </ScrollView>
    </SafeAreaView>
  );
}