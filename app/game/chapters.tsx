import { FontAwesome } from "@expo/vector-icons";
import {
  router,
  Stack,
  useLocalSearchParams,
} from "expo-router";
import React, {
  useMemo,
} from "react";
import {
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colorSchemeGui } from "../../constants/colors";
import { useContent } from "../../lib/content/ContentProvider";

import { useStudyMode } from "../../lib/StudyModeProvider";
import ChapterMenuMap from "./ChapterMenuMap";
import type { MenuLevel } from "./levelScreenTypes";
import { getUnlockedLevelIds } from "./levelUnlocks";
import { useCourseLevelConfig } from "./useCourseLevelConfig";
import { useLevelProgress } from "./useLevelProgress";

export default function ChaptersScreen() {
  const { structure } =
    useContent();

    const { studyMode } =
  useStudyMode();

  const {
    levelIds,
    levelsById,
    isReady,
  } = useCourseLevelConfig();

  const params =
    useLocalSearchParams<{
      currentLevelId?: string;
    }>();

  const currentLevelId =
    params.currentLevelId ??
    levelIds[0] ??
    "";

  const levelMap =
    levelsById as Record<
      string,
      MenuLevel
    >;

  const { clearedIds } =
    useLevelProgress({
      quizzes: [],
    });

  const unlockedLevelIds =
  useMemo(() => {
    if (studyMode === "free") {
      return new Set(levelIds);
    }

    return getUnlockedLevelIds(
      levelIds,
      clearedIds,
      structure
    );
  }, [
    studyMode,
    levelIds,
    clearedIds,
    structure,
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorSchemeGui.slate_900,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor:
      colorSchemeGui.slate_700,
        }}
      >
        <Pressable
          onPress={() =>
            router.back()
          }
        >
          <FontAwesome
  name="times"
  size={38}
  color={
    colorSchemeGui.slate_200
  }
/>
        </Pressable>

        <Pressable
          onPress={() =>
            router.push(
              "/game/settings"
            )
          }
          style={{
            width: 64,
            height: 64,
            alignItems: "center",
            justifyContent:
              "center",
          }}
        >
          <FontAwesome
            name="cog"
            size={38}
            color={
              colorSchemeGui.slate_200
            }
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        <ChapterMenuMap
          currentLevelId={
            currentLevelId
          }
          unlockedLevelIds={
            unlockedLevelIds
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}