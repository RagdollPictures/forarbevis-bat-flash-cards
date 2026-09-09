import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colorSchemeGui } from "../../constants/colors";
import {
  initializeFreeProgressFromGuided,
} from "../../constants/flashcards/quizProgress";
import { useContent } from "../../lib/content/ContentProvider";
import { useStudyMode } from "../../lib/StudyModeProvider";

import { useCourseLevelConfig } from "./useCourseLevelConfig";

export default function SettingsScreen() {
 const {
  sharedUiText,
  courseId,
} = useContent();

  const {
    studyMode,
    setStudyMode,
  } = useStudyMode();

  const { levelIds } =
    useCourseLevelConfig();

  async function chooseFreeMode() {
    if (studyMode === "free") {
      return;
    }

    await initializeFreeProgressFromGuided(
  courseId
);

    await setStudyMode("free");
  }

  async function chooseGuidedMode() {
  if (studyMode === "guided") {
    return;
  }

  await setStudyMode("guided");
}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorSchemeGui.slate_900,
      }}
    >
      {/* Header */}
      <View
        style={{
          height: 84,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor:
            colorSchemeGui.slate_700,
        }}
      >
        <Pressable
          onPress={() =>
            router.back()
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
            name="times"
            size={38}
            color={
              colorSchemeGui.slate_200
            }
          />
        </Pressable>

        <Text
          style={{
            flex: 1,
            marginRight: 64,
            textAlign: "center",
            color:
              colorSchemeGui.slate_200,
            fontSize: 22,
            fontWeight: "900",
          }}
        >
          {
            sharedUiText[
              "settings_title"
            ]
          }
        </Text>
      </View>

      <View
        style={{
          padding: 24,
          gap: 16,
        }}
      >
        <Text
          style={{
            color:
              colorSchemeGui.slate_200,
            fontSize: 20,
            fontWeight: "900",
            marginBottom: 4,
          }}
        >
          {
            sharedUiText[
              "study_mode_settings_title"
            ]
          }
        </Text>

        {/* Följ banan */}
        <Pressable
          onPress={
            chooseGuidedMode
          }
          style={{
            borderWidth: 2,
            borderBottomWidth: 5,
            borderColor:
              studyMode ===
              "guided"
                ? colorSchemeGui
                    .lime_500
                : colorSchemeGui
                    .slate_700,
            borderRadius: 16,
            padding: 18,
            backgroundColor:
              colorSchemeGui.slate_900,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: 12,
            }}
          >
            <Text
              style={{
                color:
                  colorSchemeGui
                    .slate_200,
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              {
                sharedUiText[
                  "study_mode_guided_title"
                ]
              }
            </Text>

            {studyMode ===
            "guided" ? (
              <FontAwesome
                name="check-circle"
                size={24}
                color={
                  colorSchemeGui
                    .lime_500
                }
              />
            ) : null}
          </View>

          <Text
            style={{
              marginTop: 7,
              color:
                colorSchemeGui
                  .slate_200,
              fontSize: 14,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            {
              sharedUiText[
                "study_mode_guided_description"
              ]
            }
          </Text>
        </Pressable>

        {/* Träna fritt */}
        <Pressable
          onPress={
            chooseFreeMode
          }
          style={{
            borderWidth: 2,
            borderBottomWidth: 5,
            borderColor:
              studyMode === "free"
                ? colorSchemeGui
                    .lime_500
                : colorSchemeGui
                    .slate_700,
            borderRadius: 16,
            padding: 18,
            backgroundColor:
              colorSchemeGui.slate_900,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: 12,
            }}
          >
            <Text
              style={{
                color:
                  colorSchemeGui
                    .slate_200,
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              {
                sharedUiText[
                  "study_mode_free_title"
                ]
              }
            </Text>

            {studyMode ===
            "free" ? (
              <FontAwesome
                name="check-circle"
                size={24}
                color={
                  colorSchemeGui
                    .lime_500
                }
              />
            ) : null}
          </View>

          <Text
            style={{
              marginTop: 7,
              color:
                colorSchemeGui
                  .slate_200,
              fontSize: 14,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            {
              sharedUiText[
                "study_mode_free_description"
              ]
            }
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}