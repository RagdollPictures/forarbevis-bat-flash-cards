import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChapterMenuMap from "../game/ChapterMenuMap";
import { levelIds } from "../game/levelConfig";

export default function ChaptersScreen() {
  const currentLevelId = levelIds[0];
  const unlockedLevelIds = new Set(levelIds);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Pressable onPress={() => router.back()}>
          <Text>Tillbaka</Text>
        </Pressable>
      </View>

      <ChapterMenuMap
        currentLevelId={currentLevelId}
        unlockedLevelIds={unlockedLevelIds}
      />
    </SafeAreaView>
  );
}