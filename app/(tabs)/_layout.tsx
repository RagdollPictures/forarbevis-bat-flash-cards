import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme_old';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#000000',
        
         
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Välj läromedel',
          href: '/(tabs)',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={22} color={color} />
          ),
        }}
      />

     <Tabs.Screen
  name="quiz"
  options={{
    title: "Quiz",
    tabBarIcon: ({ color, focused }) => (
      <FontAwesome
        name={focused ? "question-circle" : "question-circle-o"}
        size={22}
        color={color}
      />
    ),
  }}
/>
      <Tabs.Screen
        name="library"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
