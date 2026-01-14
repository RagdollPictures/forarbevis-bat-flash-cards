import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{card.question}</Text>

      {showAnswer && <Text style={styles.answer}>{card.answer}</Text>}

      <Pressable onPress={() => setShowAnswer((v) => !v)} style={styles.button}>
        <Text style={styles.buttonText}>{showAnswer ? "Dölj svar" : "Visa svar"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24, borderRadius: 16, borderWidth: 1, gap: 16 },
  question: { fontSize: 20, fontWeight: "600" },
  answer: { fontSize: 18, opacity: 0.8 },
  button: { padding: 12, borderRadius: 12, borderWidth: 1, alignSelf: "flex-start" },
  buttonText: { fontSize: 16 },
});
