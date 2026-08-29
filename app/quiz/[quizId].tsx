import { colorSchemeGui } from "@/constants/colors";
import {
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "../../assets/menu/close_chapter_menu.svg";

import { course } from "../../content/course";

import {
  getDeckIdsForChapterFromStructure,
  getQuizByIdFromStructure,
} from "../../lib/content/courseStructureSelectors";

import { useContent } from "../../lib/content/ContentProvider";

import { useCourseLevelConfig } from "../game/useCourseLevelConfig";

import {
  saveQuizProgress,
} from "../../constants/flashcards/quizProgress";

import { addClearedQuizId } from "../quiz/storage/cleared";

import { styles } from "./_quiz/styles";
import { BoatProgressBar } from "./_quiz/ui/boatProgressBar";
import QuizCard from "./_quiz/ui/QuizCard";
import QuizFinished from "./_quiz/ui/QuizFinished";
import QuizMissing from "./_quiz/ui/QuizMissing";
import { useQuizSession } from "./_quiz/useQuizSession";
import { validateDeck } from "./_quiz/validateDeck";

export default function QuizScreen() {
  const navigation = useNavigation();
 const { decks, structure } = useContent();
const {
  levelIds,
  levelsById,
} = useCourseLevelConfig();
  const { quizId } =
    useLocalSearchParams<{
      quizId: string;
    }>();

  const id =
    typeof quizId === "string"
      ? quizId
      : "";


const resolved = useMemo(
  () =>
    getQuizByIdFromStructure({
      structure,
      quizId: id,
      sourceId: course.sourceId,
      courseId: course.id,
    }),
  [id, structure]
);


 const isChapterQuiz =
  Boolean(resolved?.chapterId);

  const deckIds = useMemo(() => {
    if (!resolved) {
      return [];
    }

    if (resolved.chapterId) {
      return getDeckIdsForChapterFromStructure({
  structure,
  chapterId: resolved.chapterId,
});
    }

    if (resolved.deckId) {
      return [
        resolved.deckId,
      ];
    }

    return [];
  }, [resolved, structure]);

  const contentVariants = useMemo(
  () =>
    Array.from(
      new Set(
        deckIds.flatMap((deckId) =>
          (decks[deckId] ?? [])
            .map((card) =>
              card.contentVariant?.trim()
            )
            .filter(
              (variant): variant is string =>
                Boolean(variant)
            )
        )
      )
    ),
  [deckIds, decks]

  );


  const contentVariantPrompt = useMemo(() => {
  for (const deckId of deckIds) {
    const cards =
      decks[deckId] ?? [];

    const prompt = cards
      .find(
        (card) =>
          Boolean(
            card.contentVariant
          ) &&
          Boolean(
            card.contentVariantPrompt?.trim()
          )
      )
      ?.contentVariantPrompt?.trim();

    if (prompt) {
      return prompt;
    }
  }

  return "Välj variant";
}, [deckIds, decks]);

const [
  selectedVariant,
  setSelectedVariant,
] = useState<string | null>(null);

const filteredRawDeck = useMemo(
  () =>
    deckIds.flatMap((deckId) => {
      const cards =
        decks[deckId] ?? [];

      const deckHasVariants =
        cards.some((card) =>
          Boolean(
            card.contentVariant?.trim()
          )
        );

      // Vanligt deck:
      // behåll alla frågor.
      if (!deckHasVariants) {
        return cards;
      }

      // Variantdeck:
      // vänta tills användaren valt.
      if (!selectedVariant) {
        return [];
      }

      // Ta bara vald variant.
      return cards.filter(
        (card) =>
          card.contentVariant?.trim() ===
          selectedVariant
      );
    }),
  [
    deckIds,
    decks,
    selectedVariant,
  ]
);

const deck = useMemo(
  () =>
    validateDeck(filteredRawDeck),
  [filteredRawDeck]
);

  const s = useQuizSession({
    quizId: id,
    deck,
  });

  const currentChapterId =
    resolved?.chapterId ??
    null;

  const currentLevelIndex =
    currentChapterId == null
      ? -1
      : levelIds.findIndex(
          (levelId) =>
            levelsById[
              levelId
            ].chapterId ===
            currentChapterId
        );

  const currentLevelId =
    currentLevelIndex >= 0
      ? levelIds[
          currentLevelIndex
        ]
      : null;

  const nextLevelId =
    currentLevelIndex >= 0 &&
    currentLevelIndex <
      levelIds.length - 1
      ? levelIds[
          currentLevelIndex +
            1
        ]
      : null;

  const screenTitle =
    resolved
      ? resolved.subtitle
        ? `${resolved.title} – ${resolved.subtitle}`
        : resolved.title
      : "Quiz";

  const handleClose = () => {
    if (
      navigation.canGoBack()
    ) {
      router.back();
      return;
    }

    if (currentLevelId) {
      router.replace({
        pathname:
          "/game/[levelId]",
        params: {
          levelId:
            currentLevelId,
        },
      });

      return;
    }

    router.replace("/");
  };

  if (!resolved) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={headerStyle}
        >
          <Pressable
            onPress={
              handleClose
            }
            style={
              iconWrapStyle
            }
            hitSlop={12}
          >
            <CloseIcon
              width={48}
              height={48}
            />
          </Pressable>
        </View>

        <QuizMissing
          title="Quiz"
          message="Det här quizet finns inte."
        />
      </SafeAreaView>
    );
  }

 if (
  contentVariants.length > 0 &&
  !selectedVariant
) {
  return (
    <SafeAreaView
      style={styles.safe}
    >
      <View
        style={headerStyle}
      >
        <Pressable
          onPress={
            handleClose
          }
          style={
            iconWrapStyle
          }
        >
          <CloseIcon
            width={48}
            height={48}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >
        <Text
          style={styles.title}
        >
          {screenTitle}
        </Text>

        <Text
  style={styles.text}
>
  {contentVariantPrompt}
</Text>

        <View
          style={{
            marginTop: 16,
            gap: 12,
          }}
        >
          {contentVariants.map(
            (variant) => (
              <Pressable
                key={variant}
                onPress={() =>
                  setSelectedVariant(
                    variant
                  )
                }
                style={[
                  styles.option,
                  {
                    alignItems:
                      "center",
                  },
                ]}
              >
                <Text
                  style={
                    styles.optionText
                  }
                >
                  {variant}
                </Text>
              </Pressable>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
  
  if (
    deck.length === 0
  ) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={headerStyle}
        >
          <Pressable
            onPress={
              handleClose
            }
            style={
              iconWrapStyle
            }
          >
            <CloseIcon
              width={48}
              height={48}
            />
          </Pressable>
        </View>

        <QuizMissing
          title={screenTitle}
          message="Det här quizet är inte klart än."
        />
      </SafeAreaView>
    );
  }

  if (
    s.shuffledDeck
      .length === 0 ||
    !s.card
  ) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={headerStyle}
        >
          <Pressable
            onPress={
              handleClose
            }
            style={
              iconWrapStyle
            }
          >
            <CloseIcon
              width={48}
              height={48}
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={
            styles.container
          }
        >
          <Text
            style={
              styles.title
            }
          >
            {screenTitle}
          </Text>

          <Text
            style={
              styles.text
            }
          >
            Laddar quiz...
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (s.isFinished) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={headerStyle}
        >
          <Pressable
            onPress={
              handleClose
            }
            style={
              iconWrapStyle
            }
          >
            <CloseIcon
              width={48}
              height={48}
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={
            styles.container
          }
        >
          <Text
            style={
              styles.title
            }
          >
            {screenTitle}
          </Text>

          <View
            style={
              styles.progressWrap
            }
          >
            <BoatProgressBar
              value={
                s.visualProgress
              }
            />
          </View>

          <QuizFinished
            title={
              screenTitle
            }
            score={s.score}
            total={
              s.shuffledDeck
                .length
            }
            onRestart={
              s.restart
            }
            onContinue={
              async () => {
                const total =
                  s.shuffledDeck.length;

                if (total > 0) {
                  await saveQuizProgress({
                    quizId: id,

                    progress:
                      Array(total).fill(
                        "correct"
                      ),

                    score: total,
                    total,

                    updatedAt:
                      Date.now(),

                    firstTryCorrect:
                      s.firstTryCorrectCount,

                    firstTryTotal:
                      total,
                  });
                }

                if (
                  isChapterQuiz
                ) {
                  await addClearedQuizId(
                    id
                  );
                }
              }
            }
            isChapterQuiz={
              isChapterQuiz
            }
            nextLevelId={
              nextLevelId
            }
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const questionText =
    s.card.questionQuiz ??
    s.card.question ??
    "";

  const imageSource =
    s.card.imageUrl
      ? {
          uri:
            s.card.imageUrl,
        }
      : undefined;

  const optionImageSources =
    s.quiz.options.map(
      (_, index) => {
        const imageUrl =
          s.quiz
            .optionImageUrls[
            index
          ];

        return imageUrl
          ? {
              uri: imageUrl,
            }
          : undefined;
      }
    );

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <View
        style={headerStyle}
      >
        <Pressable
          onPress={
            handleClose
          }
          style={
            iconWrapStyle
          }
        >
          <CloseIcon
            width={48}
            height={48}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >
        <Text
          style={
            styles.title
          }
        >
          {screenTitle}
        </Text>

        <BoatProgressBar
          value={
            s.visualProgress
          }
        />

        <QuizCard
          questionText={
            questionText
          }
          imageSource={
            imageSource
          }
          options={
            s.quiz.options
          }
          optionImageSources={
            optionImageSources
          }
          correctOptionIndex={
            s.quiz
              .correctOptionIndex
          }
          selectedIndex={
            s.selectedIndex
          }
          isChecked={
            s.isChecked
          }
          onSelect={
            s.onSelect
          }
          onNext={
            s.onNext
          }
          showNextButton={
            s.isChecked
          }
          isLast={
            s.masteredCount >=
            s.total
          }
          answerText={
            s.card.answer
          }
          textTitle={
            s.card.textTitle
          }
          textInfo={
            s.card.textInfo
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const headerStyle = {
  height: 72,
  backgroundColor:
    colorSchemeGui.slate_900,
  paddingHorizontal: 16,
  flexDirection:
    "row" as const,
  alignItems:
    "center" as const,
  justifyContent:
    "flex-end" as const,
};

const iconWrapStyle = {
  width: 64,
  height: 64,
  alignItems:
    "center" as const,
  justifyContent:
    "center" as const,
 };