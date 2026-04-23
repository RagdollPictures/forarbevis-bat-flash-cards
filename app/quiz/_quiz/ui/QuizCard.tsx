import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles";

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
  textTitle,
  textInfo,
}: {
  questionText: string;
  imageSource?: any;
  options: string[];
  optionImageSources?: (any | undefined)[];
  correctOptionIndex: number;
  selectedIndex: number | null;
  isChecked: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
  showNextButton: boolean;
  isLast: boolean;
  textTitle?: string;
  textInfo?: string;
}) {
  const hasOptionImages = optionImageSources?.some(Boolean);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{questionText}</Text>

      {imageSource ? (
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource}
            style={styles.questionImage}
            resizeMode="contain"
          />
        </View>
      ) : null}

      <View style={[styles.options, hasOptionImages && styles.optionsGrid]}>
        {options.map((opt, i) => {
          const isCorrect = isChecked && i === correctOptionIndex;
          const isWrong =
            isChecked && selectedIndex === i && i !== correctOptionIndex;
          const optionImageSource = optionImageSources?.[i];

          return (
            <Pressable
              key={`${opt}-${i}`}
              onPress={() => onSelect(i)}
              disabled={isChecked}
              style={[
                styles.option,
                hasOptionImages && styles.optionGrid,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
            >
              {optionImageSource ? (
                <View style={styles.optionImageWrapper}>
                  <Image
                    source={optionImageSource}
                    style={styles.optionImage}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <Text
                  style={[
                    styles.optionText,
                    isChecked &&
                      selectedIndex === i &&
                      styles.optionTextChecked,
                    isCorrect && styles.optionTextCorrect,
                    isWrong && styles.optionTextWrong,
                  ]}
                >
                  {opt}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      {showNextButton ? (
        <View style={styles.actions}>
          <Pressable style={[styles.button, styles.buttonSecondary]} onPress={onNext}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              {isLast ? "Resultat" : "Nästa"}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {isChecked && (textTitle || textInfo) ? (
        <View style={styles.infoBox}>
          {textTitle ? <Text style={styles.infoTitle}>{textTitle}</Text> : null}
          {textInfo ? <Text style={styles.infoText}>{textInfo}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}