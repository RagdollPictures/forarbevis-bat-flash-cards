import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "../../assets/menu/close_chapter_menu.svg";
import { buildReadSections } from "../../constants/flashcards";
import { cardImages } from "../../constants/flashcards/cardImages";

export default function ReadScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ deckId?: string; title?: string }>();

  const deckId = typeof params.deckId === "string" ? params.deckId : "";
  const title = typeof params.title === "string" ? params.title : "";

  const sections = useMemo(() => {
    return buildReadSections(deckId);
  }, [deckId]);

  const handleClose = () => {
    if (navigation.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View
        style={{
         backgroundColor: "#000",
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          onPress={handleClose}
          style={{
            width: 64,
            height: 64,
            alignItems: "center",
            justifyContent: "center",
            
          }}
           hitSlop={12}
        >
          <CloseIcon width={48} height={48} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 28, fontWeight: "900", marginBottom: 24 }}>
          {title}
        </Text>

        {sections.map((section) => {
          const imageSource = section.imageKey
            ? cardImages[section.imageKey]
            : undefined;

          return (
            <View key={section.id} style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>
                {section.title}
              </Text>

              <Text style={{ fontSize: 16, lineHeight: 24 }}>
                {section.body}
              </Text>

              {imageSource ? (
                <View style={{ marginTop: 14 }}>
                  <Image
                    source={imageSource}
                    style={{ width: "100%", height: 180 }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}