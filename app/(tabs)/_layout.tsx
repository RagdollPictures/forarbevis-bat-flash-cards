import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { colorSchemeGui } from "@/constants/colors";
import { Colors } from "@/constants/theme_old";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme =
    useColorScheme();

  return (
    <Tabs
      initialRouteName="game"
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor:
          Colors[
            colorScheme ?? "light"
          ].tint,
        tabBarInactiveTintColor:
          "#9CA3AF",
        sceneStyle: {
          backgroundColor:
            colorSchemeGui.slate_900,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor:
            colorSchemeGui.slate_900,
        },
      }}
    >
      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarIcon: ({
            color,
          }) => (
            <FontAwesome
              name="gamepad"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}