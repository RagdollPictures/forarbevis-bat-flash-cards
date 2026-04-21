import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "../../assets/menu/close_chapter_menu.svg";

import { getQuizById } from "../../constants/flashcards";
import { cardImages } from "../../constants/flashcards/cardImages";
import type { FlashCard } from "../../constants/flashcards/types";

import { levelIds, levelsById } from "../game/levelConfig";

import { styles } from "./_quiz/styles";
import { BoatProgressBar } from "./_quiz/ui/boatProgressBar";
import QuizCard from "./_quiz/ui/QuizCard";
import QuizFinished from "./_quiz/ui/QuizFinished";
import QuizMissing from "./_quiz/ui/QuizMissing";
import { useQuizSession } from "./_quiz/useQuizSession";
import { validateDeck } from "./_quiz/validateDeck";

export default function QuizScreen() {
  const navigation = useNavigation();

  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const id = typeof quizId === "string" ? quizId : "";
  const isChapterQuiz = id.endsWith("_quiz");

  const resolved = getQuizById(id);

  const currentChapterId = resolved?.chapterId ?? null;

  const currentLevelIndex =
    currentChapterId == null
      ? -1
      : levelIds.findIndex(
          (levelId) => levelsById[levelId].chapterId === currentChapterId
        );

  const currentLevelId =
    currentLevelIndex >= 0 ? levelIds[currentLevelIndex] : null;

  const nextLevelId =
    currentLevelIndex >= 0 && currentLevelIndex < levelIds.length - 1
      ? levelIds[currentLevelIndex + 1]
      : null;

  const screenTitle = resolved
    ? resolved.subtitle
      ? `${resolved.title} – ${resolved.subtitle}`
      : resolved.title
    : "Quiz";

  const handleClose = () => {
    if (navigation.canGoBack()) {
      router.back();
      return;
    }

    if (currentLevelId) {
      router.replace({
        pathname: "/game/[levelId]",
        params: {
          levelId: currentLevelId,
        },
      });
      return;
    }

    router.replace("/");
  };

  if (!resolved) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={headerStyle}>
          <Pressable onPress={handleClose} style={iconWrapStyle}>
            <CloseIcon width={48} height={48} />
          </Pressable>
        </View>

        <QuizMissing title="Quiz" message="Det här quizet finns inte." />
      </SafeAreaView>
    );
  }

  const rawDeck = (resolved.deck ?? []) as FlashCard[];
  const deck = useMemo(() => validateDeck(rawDeck), [rawDeck]);

  if (deck.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={headerStyle}>
          <Pressable onPress={handleClose} style={iconWrapStyle}>
            <CloseIcon width={48} height={48} />
          </Pressable>
        </View>

        <QuizMissing
          title={screenTitle}
          message="Det här quizet är inte klart än."
        />
      </SafeAreaView>
    );
  }

  const s = useQuizSession({ quizId: id, deck });

  if (s.shuffledDeck.length === 0 || !s.card) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={headerStyle}>
          <Pressable onPress={handleClose} style={iconWrapStyle}>
            <CloseIcon width={48} height={48} />
          </Pressable>
        </View>

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
        <View style={headerStyle}>
          <Pressable onPress={handleClose} style={iconWrapStyle}>
            <CloseIcon width={48} height={48} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{screenTitle}</Text>

          <BoatProgressBar value={s.visualProgress} />

          <QuizFinished
            title={screenTitle}
            score={s.score}
            total={s.shuffledDeck.length}
            onRestart={s.restart}
            isChapterQuiz={isChapterQuiz}
            nextLevelId={nextLevelId}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const questionText = s.card.questionQuiz ?? s.card.question ?? "";

  const hasQuestionImage =
    !!s.card.imageKey &&
    Object.prototype.hasOwnProperty.call(cardImages, s.card.imageKey);

  const imageSource = hasQuestionImage
    ? cardImages[s.card.imageKey!]
    : undefined;

  const optionImageSources = s.quiz.optionImageKeys.map((key) => {
    if (!key) return undefined;
    if (!Object.prototype.hasOwnProperty.call(cardImages, key)) return undefined;
    return cardImages[key];
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={headerStyle}>
        <Pressable onPress={handleClose} style={iconWrapStyle}>
          <CloseIcon width={48} height={48} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{screenTitle}</Text>

        <BoatProgressBar value={s.visualProgress} />

        <QuizCard
          questionText={questionText}
          imageSource={imageSource}
          options={s.quiz.options}
          optionImageSources={optionImageSources}
          correctOptionIndex={s.quiz.correctOptionIndex}
          selectedIndex={s.selectedIndex}
          isChecked={s.isChecked}
          onSelect={s.onSelect}
          onNext={s.onNext}
          showNextButton={s.isChecked}
          isLast={s.masteredCount >= s.total}
          textTitle={s.card.textTitle}
          textInfo={s.card.textInfo}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const headerStyle = {
  height: 10,
  paddingHorizontal: 16,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "flex-end" as const,
};

const iconWrapStyle = {
  width: 64,
  height: 64,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};