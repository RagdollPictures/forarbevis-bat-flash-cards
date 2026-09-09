import React from "react";
import {
  Animated,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { useAudioPlayer } from "expo-audio";
import { styles } from "../styles";


const AnimatedPressable =
  Animated.createAnimatedComponent(
    Pressable
  );

export default function QuizCard({
  questionText,
  imageSource,
  options,
  optionImageSources,
  correctOptionIndex,
  selectedIndex,
  isChecked,
  onSelect,
  onNext,
  showNextButton,
  isLast,
  answerText,
  textTitle,
  textInfo,
}: {
  questionText: string;
  imageSource?: any;
  options: string[];
  optionImageSources?: (
    | any
    | undefined
  )[];
  correctOptionIndex: number;
  selectedIndex: number | null;
  isChecked: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
  showNextButton: boolean;
  isLast: boolean;
  answerText?: string;
  textTitle?: string;
  textInfo?: string;
}) {
  const hasOptionImages =
    optionImageSources?.some(Boolean);

    const correctSound =
  useAudioPlayer(
    require("../../../../assets/sounds/correct.mp3")
  );

const wrongSound =
  useAudioPlayer(
    require("../../../../assets/sounds/wrong.mp3")
  );

  const correctLift =
    React.useRef(
      new Animated.Value(0)
    ).current;

    const correctWiggle =
  React.useRef(
    new Animated.Value(0)
  ).current;

  React.useEffect(() => {
  const selectedCorrect =
    isChecked &&
    selectedIndex ===
      correctOptionIndex;

  if (selectedCorrect) {
    correctLift.stopAnimation();
    correctLift.setValue(0);

   Animated.sequence([
  Animated.timing(correctLift, {
    toValue: -20,
    duration: 140,
    useNativeDriver: true,
  }),

  Animated.delay(100),

  Animated.spring(correctLift, {
    toValue: 0,
    useNativeDriver: true,
    speed: 14,
    bounciness: 10,
  }),
]).start();
  } else {
    correctLift.stopAnimation();
    correctLift.setValue(0);
  }
}, [
  isChecked,
  selectedIndex,
  correctOptionIndex,
  correctLift,
]);
React.useEffect(() => {
  const answeredWrong =
    isChecked &&
    selectedIndex !== null &&
    selectedIndex !==
      correctOptionIndex;

  if (answeredWrong) {
    correctWiggle.stopAnimation();
    correctWiggle.setValue(0);

    Animated.sequence([
      Animated.timing(correctWiggle, {
        toValue: -1,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(correctWiggle, {
        toValue: 1,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(correctWiggle, {
        toValue: -0.7,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(correctWiggle, {
        toValue: 0.7,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(correctWiggle, {
        toValue: 0,
        duration: 55,
        useNativeDriver: true,
      }),
    ]).start();
  } else {
    correctWiggle.stopAnimation();
    correctWiggle.setValue(0);
  }
}, [
  isChecked,
  selectedIndex,
  correctOptionIndex,
  correctWiggle,
]);

React.useEffect(() => {
  if (
    !isChecked ||
    selectedIndex === null
  ) {
    return;
  }

  const isAnswerCorrect =
    selectedIndex ===
    correctOptionIndex;

  const player =
    isAnswerCorrect
      ? correctSound
      : wrongSound;

  void player
    .seekTo(0)
    .then(() => {
      player.play();
    });
}, [
  isChecked,
  selectedIndex,
  correctOptionIndex,
  correctSound,
  wrongSound,
]);

const correctRotation =
  correctWiggle.interpolate({
    inputRange: [-1, 1],
    outputRange: [
      "-5deg",
      "5deg",
    ],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.question}>
        {questionText}
      </Text>

      {imageSource ? (
        <View
          style={
            styles.imageWrapper
          }
        >
          <Image
            source={imageSource}
            style={
              styles.questionImage
            }
            resizeMode="contain"
          />
        </View>
      ) : null}

    <View
  style={[
    styles.options,
    hasOptionImages &&
      styles.optionsGrid,
  ]}
>
  {options.map((opt, i) => {
    const isCorrect =
      isChecked &&
      i === correctOptionIndex;

    const isWrong =
      isChecked &&
      selectedIndex === i &&
      i !== correctOptionIndex;

    const isSelectedCorrect =
      selectedIndex === i &&
      i === correctOptionIndex;

    const optionImageSource =
      optionImageSources?.[i];

    return (
      <View
        key={`${opt}-${i}`}
        style={[
          styles.optionLiftWrap,
          hasOptionImages &&
            styles.optionLiftWrapGrid,
        ]}
      >
        {(
  isSelectedCorrect ||
  (
    isChecked &&
    selectedIndex !== null &&
    selectedIndex !== correctOptionIndex &&
    i === correctOptionIndex
  )
) ? (
  <View
    pointerEvents="none"
    style={styles.optionLiftBase}
  />
) : null}

        <AnimatedPressable
          onPress={() =>
            onSelect(i)
          }
          disabled={isChecked}
          style={[
            styles.option,

            hasOptionImages &&
              styles.optionGrid,

            isCorrect &&
              styles.optionCorrect,

            isWrong &&
              styles.optionWrong,

            isSelectedCorrect && {
              transform: [
                {
                  translateY:
                    correctLift,
                },
              ],
            },

            isChecked &&
  selectedIndex !==
    correctOptionIndex &&
  i === correctOptionIndex && {
    transform: [
      {
        rotate:
          correctRotation,
      },
    ],
  },

          ]}
        >
          {optionImageSource ? (
            <View
              style={
                styles.optionImageWrapper
              }
            >
              <Image
                source={
                  optionImageSource
                }
                style={
                  styles.optionImage
                }
                resizeMode="cover"
              />
            </View>
          ) : (
            <Text
              style={[
                styles.optionText,

                isChecked &&
                  selectedIndex ===
                    i &&
                  styles.optionTextChecked,

                isCorrect &&
                  styles.optionTextCorrect,

                isWrong &&
                  styles.optionTextWrong,
              ]}
            >
              {opt}
            </Text>
          )}
        </AnimatedPressable>
      </View>
    );
  })}
</View>

      {showNextButton ? (
        <View
          style={
            styles.actions
          }
        >
          <Pressable
            style={[
              styles.button,
              styles.buttonSecondary,
            ]}
            onPress={onNext}
          >
            <Text
              style={[
                styles.buttonText,
                styles.buttonTextSecondary,
              ]}
            >
              {isLast
                ? "Resultat"
                : "Nästa"}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {isChecked &&
      (textTitle ||
        textInfo) ? (
        <View
          style={
            styles.infoBox
          }
        >
          {textTitle ? (
            <Text
              style={
                styles.infoTitle
              }
            >
              {textTitle}
            </Text>
          ) : null}

          {textInfo ? (
            <Text
              style={
                styles.infoText
              }
            >
              {textInfo}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}