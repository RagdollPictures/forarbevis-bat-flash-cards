import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQuizById } from "../../../constants/flashcards";
import { cardImages } from "../../../constants/flashcards/cardImages";
import type { FlashCard } from "../../../constants/flashcards/types";
import { BoatProgressBar } from "./_quiz/ui/boatProgressBar";

import { styles } from "./_quiz/styles";
import QuizCard from "./_quiz/ui/QuizCard";
import QuizFinished from "./_quiz/ui/QuizFinished";
import QuizMissing from "./_quiz/ui/QuizMissing";
import { useQuizSession } from "./_quiz/useQuizSession";
import { validateDeck } from "./_quiz/validateDeck";

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const id = typeof quizId === "string" ? quizId : "";

  const resolved = getQuizById(id);

  const screenTitle = resolved
    ? resolved.subtitle
      ? `${resolved.title} – ${resolved.subtitle}`
      : resolved.title
    : "Quiz";

  if (!resolved) {
    return <QuizMissing title="Quiz" message="Det här quizet finns inte." />;
  }

  const rawDeck = (resolved.deck ?? []) as FlashCard[];

  const deck = useMemo(() => validateDeck(rawDeck), [rawDeck]);

  if (deck.length === 0) {
    return (
      <QuizMissing
        title={screenTitle}
        message="Det här quizet är inte klart än (inga frågor med options + correctOptionIndex)."
      />
    );
  }

  const s = useQuizSession({ quizId: id, deck });

  if (s.shuffledDeck.length === 0 || !s.card) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.text}>Laddar quiz...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (s.isFinished) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{screenTitle}</Text>

        <BoatProgressBar value={1} />

        <QuizFinished
          title={screenTitle}
          score={s.score}
          total={s.shuffledDeck.length}
          onRestart={s.restart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


  const questionText = s.card.questionQuiz ?? s.card.question ?? "";

  const hasQuestionImage =
    !!s.card.imageKey &&
    Object.prototype.hasOwnProperty.call(cardImages, s.card.imageKey);

  const imageSource = hasQuestionImage ? cardImages[s.card.imageKey!] : undefined;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{screenTitle}</Text>

<BoatProgressBar value={s.visualProgress} />


        <QuizCard
          questionText={questionText}
          imageSource={imageSource}
          options={s.quiz.options}
          correctOptionIndex={s.quiz.correctOptionIndex}
          selectedIndex={s.selectedIndex}
          isChecked={s.isChecked}
          onSelect={s.onSelect}
          onNext={s.onNext}
          showNextButton={s.isChecked}
          isLast={s.isFinished}
          textTitle={s.card.textTitle}
          textInfo={s.card.textInfo}
        
        />
      </ScrollView>
    </SafeAreaView>
  );
}
