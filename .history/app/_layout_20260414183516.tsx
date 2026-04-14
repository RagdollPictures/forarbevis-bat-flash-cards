import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       
        <Stack.Screen
          name="quiz/[quizId]"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />

<Stack.Screen
  name="read/[deckId]"
  options={{
    headerShown: false,
    animation: "slide_from_bottom",
  }}
/>
      </Stack>
    </SafeAreaProvider>
  );
}
