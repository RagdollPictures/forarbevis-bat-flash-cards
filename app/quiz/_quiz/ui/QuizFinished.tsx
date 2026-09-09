import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colorSchemeGui } from "../../../../constants/colors";
import { getCourseAssetUrl } from "../../../../lib/content/courseAssetUrl";
import type { CourseBonusLevel } from "../../../../lib/content/loadCourseStructureFromSupabase";

export default function QuizFinished({
  title,
  onContinue,
  isChapterQuiz = false,
  nextLevelId = null,
  unlockedBonusLevel = null,
  isBonusQuiz = false,
  elapsedSeconds = 0,
  bonusBestTime = null,
  isNewBonusBest = false,
  onTryAgain,
}: {
  title: string;
  onContinue?: () =>
    Promise<void> | void;
  isChapterQuiz?: boolean;
  nextLevelId?: string | null;
  unlockedBonusLevel?: CourseBonusLevel | null;
   isBonusQuiz?: boolean;
  elapsedSeconds?: number;
  bonusBestTime?: number | null;
  isNewBonusBest?: boolean;
  onTryAgain?: () => void;
}) {
  const hasBonusUnlock =
    isChapterQuiz &&
    unlockedBonusLevel !== null;

  const bonusIconUrl =
    hasBonusUnlock
      ? getCourseAssetUrl(
          unlockedBonusLevel.iconOffPath
        )
      : undefined;

  const timeText = `${Math.floor(
    elapsedSeconds / 60
  )
    .toString()
    .padStart(2, "0")}:${(
    elapsedSeconds % 60
  )
    .toString()
    .padStart(2, "0")}`;
    
  
    const bestTimeText =
  bonusBestTime === null
    ? null
    : `${Math.floor(
        bonusBestTime / 60
      )
        .toString()
        .padStart(2, "0")}:${(
        bonusBestTime % 60
      )
        .toString()
        .padStart(2, "0")}`;


  const goNext = async () => {
    await onContinue?.();

    if (
      isChapterQuiz &&
      nextLevelId
    ) {
      router.push({
        pathname:
          "/game/[levelId]",
        params: {
          levelId: nextLevelId,
        },
      });

      return;
    }

    router.back();
  };

  const handlePrimaryPress = () => {
    if (isBonusQuiz) {
      onTryAgain?.();
      return;
    }

    void goNext();
  };

  const heading =
    hasBonusUnlock
      ? "Ny bonusbana"
      : "Snyggt jobbat!";

 const message =
  hasBonusUnlock
    ? `${unlockedBonusLevel.title} är upplåst!`
    : null;

  const buttonText =
    isBonusQuiz
      ? "Prova igen!"
      : isChapterQuiz
        ? "Till nästa bana!"
        : "Till nästa kapitel";

  return (
    <View style={styles.container}>
      <View style={styles.celebration}>
        {hasBonusUnlock ? (
          <View style={styles.iconBase}>
            <View
              style={styles.iconCircle}
            >
              {bonusIconUrl ? (
                <Image
                  source={{
                    uri: bonusIconUrl,
                  }}
                  style={
                    styles.bonusIcon
                  }
                  contentFit="contain"
                />
              ) : (
                <FontAwesome
                  name="star"
                  size={48}
                  color={
                    colorSchemeGui
                      .lime_900
                  }
                />
              )}
            </View>
          </View>
        ) : null}

        <Text
          style={[
            styles.title,
            !hasBonusUnlock &&
              styles.titleWithoutIcon,
          ]}
        >
          {heading}
        </Text>

        {message ? (
          <Text
            style={styles.message}
          >
            {message}
          </Text>
        ) : null}


{isBonusQuiz ? (
  <View
    style={styles.timeResult}
  >
    {isNewBonusBest ? (
      <Text
        style={
          styles.newBestText
        }
      >
        Nytt personbästa!
      </Text>
    ) : null}

    <Text
      style={styles.timeText}
    >
      Din tid: {timeText}
    </Text>

    {bestTimeText ? (
      <Text
        style={
          styles.bestTimeText
        }
      >
        Personbästa:{" "}
        {bestTimeText}
      </Text>
    ) : null}
  </View>
) : null}
        
      </View>

      <View style={styles.actions}>
        <View
          style={styles.primaryBase}
        >
          <Pressable
            onPress={
              handlePrimaryPress
            }
            style={
              styles.primaryButton
            }
          >
            <Text
              style={
                styles.primaryText
              }
            >
              {buttonText}
            </Text>

            <FontAwesome
              name={
                isBonusQuiz
                  ? "refresh"
                  : "chevron-right"
              }
              size={16}
              color={
                colorSchemeGui
                  .lime_900
              }
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingBottom: 32,
    },

    celebration: {
      alignItems: "center",
      paddingHorizontal: 20,
    },

    iconBase: {
      width: 108,
      height: 114,
      borderRadius: 54,
      backgroundColor:
        colorSchemeGui.lime_700,
      justifyContent:
        "flex-end",
      marginBottom: 26,
    },

    iconCircle: {
      width: 108,
      height: 108,
      borderRadius: 54,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        colorSchemeGui.lime_500,
      transform: [
        {
          translateY: -6,
        },
      ],
    },

    bonusIcon: {
      width: 76,
      height: 76,
    },

    title: {
      color:
        colorSchemeGui.slate_200,
      fontSize: 30,
      fontWeight: "900",
      textAlign: "center",
    },

    titleWithoutIcon: {
      marginTop: 32,
    },

    message: {
      color:
        colorSchemeGui.slate_200,
      fontSize: 20,
      lineHeight: 27,
      fontWeight: "800",
      textAlign: "center",
      opacity: 0.9,
      marginTop: 10,
      maxWidth: 320,
    },

    timeResult: {
  alignItems: "center",
  marginTop: 18,
},

newBestText: {
  color:
    colorSchemeGui.lime_500,
  fontSize: 18,
  fontWeight: "900",
  marginBottom: 8,
},

timeText: {
  color:
    colorSchemeGui.slate_200,
  fontSize: 22,
  fontWeight: "900",
},

bestTimeText: {
  color:
    colorSchemeGui.slate_200,
  fontSize: 16,
  fontWeight: "700",
  opacity: 0.75,
  marginTop: 6,
},

    actions: {
      marginTop: 32,
    },

    primaryBase: {
      borderRadius: 14,
      backgroundColor:
        colorSchemeGui.lime_700,
    },

    primaryButton: {
      minHeight: 54,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor:
        colorSchemeGui.lime_500,
      transform: [
        {
          translateY: -5,
        },
      ],
    },

    primaryText: {
      color:
        colorSchemeGui.lime_900,
      fontSize: 17,
      fontWeight: "900",
      textAlign: "center",
    },
  });