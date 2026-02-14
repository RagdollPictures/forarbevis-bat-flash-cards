import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles";

export default function QuizCard({
  questionText,
  imageSource,
  options,
  correctOptionIndex,
  selectedIndex,
  isChecked,
  onSelect,
  onNext,
  showNextButton,
  isLast,
}: {
  questionText: string;
  imageSource?: any;
  options: string[];
  correctOptionIndex: number;
  selectedIndex: number | null;
  isChecked: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
  showNextButton: boolean;
  isLast: boolean;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{questionText}</Text>

      {imageSource ? (
        <Image source={imageSource} style={styles.questionImage} resizeMode="contain" />
      ) : null}

      <View style={styles.options}>
        {options.map((opt, i) => {
          const isCorrect = isChecked && i === correctOptionIndex;
          const isWrong = isChecked && selectedIndex === i && i !== correctOptionIndex;

          return (
            <Pressable
              key={`opt-${i}`}
              onPress={() => onSelect(i)}
              disabled={isChecked}
              style={[
                styles.option,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  (isCorrect || isWrong) && styles.optionTextChecked,
                ]}
              >
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {showNextButton ? (
        <View style={styles.actions}>
          <Pressable onPress={onNext} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              {isLast ? "Resultat" : "Nästa"}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
