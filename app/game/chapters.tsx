import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CloseIcon from "../../assets/menu/close_chapter_menu.svg";
import { colorSchemeGui } from "../../constants/colors";
import { useContent } from "../../lib/content/ContentProvider";
import ChapterMenuMap from "./ChapterMenuMap";

import type { MenuLevel } from "./levelScreenTypes";
import { getUnlockedLevelIds } from "./levelUnlocks";
import { useCourseLevelConfig } from "./useCourseLevelConfig";
import { useLevelProgress } from "./useLevelProgress";



export default function ChaptersScreen() {
  const { structure } = useContent();
  const {
  levelIds,
  levelsById,
  isReady,
} = useCourseLevelConfig();
  const params = useLocalSearchParams<{ currentLevelId?: string }>();
 const currentLevelId =
  params.currentLevelId ?? levelIds[0] ?? "";

  const levelMap = levelsById as Record<string, MenuLevel>;

  const { clearedIds } = useLevelProgress({
  quizzes: [],
});

    const unlockedLevelIds = useMemo(() => {
    return getUnlockedLevelIds(
      levelIds,
      clearedIds,
      structure
    );
  }, [clearedIds, structure]);

  if (!isReady) {
  return null;
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorSchemeGui.slate_900 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <Pressable
        onPress={() => router.back()}
        style={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 12,
        }}
      >
       <CloseIcon width={64} height={64} />
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