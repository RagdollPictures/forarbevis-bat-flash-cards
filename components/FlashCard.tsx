import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { cardImages } from "../constants/flashcards/cardImages";
import type { FlashCard as FlashCardType } from "../constants/flashcards/types";

type Props = {
  card: FlashCardType;
  resetKey: string;
};

export default function FlashCard({ card, resetKey }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [resetKey]);

  const questionImage = card.imageKey
    ? cardImages[card.imageKey]
    : null;

  const answerImage = card.answerImageKey
    ? cardImages[card.answerImageKey]
    : null;

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{card.question}</Text>

      {questionImage && (
        <Image source={questionImage} style={styles.image} />
      )}

      {showAnswer && card.answer && (
        <Text style={styles.answer}>{card.answer}</Text>
      )}


{showAnswer && card.textTitle && (
  <Text style={styles.textTitle}>{card.textTitle}</Text>
)}

{showAnswer && card.textInfo && (
  <Text style={styles.textInfo}>{card.textInfo}</Text>
)}

      {showAnswer && answerImage && (
        <Image source={answerImage} style={styles.image} />
      )}

      <Pressable onPress={() => setShowAnswer((v) => !v)} style={styles.button}>
        <Text style={styles.buttonText}>
          {showAnswer ? "Dölj svar" : "Visa svar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff',padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#ffffff', elevation: 3, gap: 16 },
  question: { fontSize: 20, fontWeight: "600" },
  answer: { fontSize: 18, opacity: 0.8 },
  textTitle: {fontSize: 20},
  textInfo: {fontSize: 18},
  image: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
  },
  button: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#009966',
    alignSelf: "flex-start",
    elevation: 3,
    borderColor: '#009966',
  },
  buttonText: { 
    fontSize: 16, 
    color: '#ffffff',
    fontWeight: 'bold'
  },
});
