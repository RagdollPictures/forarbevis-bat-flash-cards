import Constants from "expo-constants";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CourseSelectionScreen } from "../components/CourseSelectionScreen";
import { colorSchemeGui } from "../constants/colors";
import { course } from "../content/course";
import { ContentProvider } from "../lib/content/ContentProvider";
import {
  CourseProvider,
  useCourse,
} from "../lib/CourseProvider";
import { StudyModeProvider } from "../lib/StudyModeProvider";
import { ScreenTransitionProvider } from "./transitions/ScreenTransitionProvider";

const appId =
  Constants.expoConfig?.extra?.appId;

if (
  typeof appId !== "string" ||
  !appId
) {
  throw new Error(
    "Ingen appId-konfiguration hittades i Expo config."
  );
}

function CourseBoundLayout() {
  const {
    selectedCourseId,
    isReady,
    needsCourseSelection,
  } = useCourse();

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            colorSchemeGui.slate_900,
        }}
      />
    );
  }

  if (needsCourseSelection) {
    return <CourseSelectionScreen />;
  }

  return (
    <ContentProvider
      courseId={selectedCourseId}
    >
      <StudyModeProvider
        courseId={selectedCourseId}
      >
        <ScreenTransitionProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor:
                  colorSchemeGui.slate_900,
              },
            }}
            initialRouteName="(tabs)"
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="quiz/[quizId]"
              options={{
                headerShown: false,
                animation:
                  "slide_from_bottom",
              }}
            />

            <Stack.Screen
              name="read/[deckId]"
              options={{
                headerShown: false,
                animation:
                  "slide_from_bottom",
              }}
            />

            <Stack.Screen
              name="game/chapters"
              options={{
                headerShown: false,
                animation:
                  "slide_from_bottom",
              }}
            />

            <Stack.Screen
              name="game/settings"
              options={{
                headerShown: false,
                animation:
                  "slide_from_right",
              }}
            />

            <Stack.Screen
              name="exam/[examId]"
              options={{
                headerShown: false,
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </ScreenTransitionProvider>
      </StudyModeProvider>
    </ContentProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CourseProvider
        appId={appId}
        fallbackCourseId={
          course.id
        }
      >
        <CourseBoundLayout />
      </CourseProvider>
    </SafeAreaProvider>
  );
}