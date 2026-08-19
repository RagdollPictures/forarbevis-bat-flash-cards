import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { ScreenTransitionProvider } from "./transitions/ScreenTransitionProvider";

export default function RootLayout() {
  useEffect(() => {
  async function testSupabase() {
    const { data, error } = await supabase
      .from("test_questions")
      .select("*");

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);
  }

  testSupabase();
}, []);
  return (
    <SafeAreaProvider>
      <ScreenTransitionProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="quiz/[quizId]"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />

          <Stack.Screen
            name="read/[deckId]"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />

          <Stack.Screen
            name="game/chapters"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
             
            }}
          />
        </Stack>
      </ScreenTransitionProvider>
    </SafeAreaProvider>
  );
}