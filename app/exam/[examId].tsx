import { FontAwesome } from "@expo/vector-icons";
import {
    router,
    useLocalSearchParams,
} from "expo-router";
import React, { useMemo } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colorSchemeGui } from "../../constants/colors";
import { useContent } from "../../lib/content/ContentProvider";
import { styles as quizStyles } from "../quiz/_quiz/styles";
import { useExamSession } from "./_exam/useExamSession";

export default function ExamScreen() {
  const {
    decks,
    finalExams,
  } = useContent();

  const { examId } =
    useLocalSearchParams<{
      examId: string;
    }>();

  const id =
    typeof examId === "string"
      ? examId
      : "";

  const exam = useMemo(
    () =>
      finalExams.find(
        (item) => item.id === id
      ) ?? null,
    [finalExams, id]
  );

  const deck =
    exam
      ? decks[exam.deckId] ?? []
      : [];

  const session =
    useExamSession(
      deck,
      exam?.timeLimitMinutes ?? null
    );

  const timerText =
    session.remainingSeconds === null
      ? null
      : `${Math.floor(
          session.remainingSeconds / 60
        )}:${String(
          session.remainingSeconds % 60
        ).padStart(2, "0")}`;

  const handleSubmit = () => {
    const unanswered =
      session.total -
      session.answeredCount;

    if (unanswered === 0) {
      session.submit();
      return;
    }

    Alert.alert(
      "Obesvarade frågor",
      `Du har ${unanswered} obesvarade frågor. Vill du ändå lämna in provet?`,
      [
        {
          text: "Fortsätt provet",
          style: "cancel",
        },
        {
          text: "Lämna in",
          style: "destructive",
          onPress: session.submit,
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={quizStyles.safe}
    >
      <View style={examStyles.header}>
        <Pressable
          onPress={() => router.back()}
          style={examStyles.closeButton}
          hitSlop={12}
        >
          <FontAwesome
            name="times"
            size={38}
            color={
              colorSchemeGui.slate_200
            }
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={
          examStyles.container
        }
      >
        {exam ? (
          <>
            <Text
              style={quizStyles.title}
            >
              {exam.title}
            </Text>

            {exam.subtitle ? (
              <Text
                style={quizStyles.text}
              >
                {exam.subtitle}
              </Text>
            ) : null}

            {session.isFinished ? (
              <>
                <View
                  style={
                    examStyles.resultHeader
                  }
                >
                  <Text
                    style={
                      examStyles.resultTitle
                    }
                  >
                    Resultat
                  </Text>

                  <Text
                    style={
                      examStyles.resultScore
                    }
                  >
                    {session.score} av{" "}
                    {session.total} rätt
                  </Text>
                </View>

                {session.wrongQuestions
                  .length > 0 ? (
                  <>
                    <Text
                      style={
                        examStyles.sectionTitle
                      }
                    >
                      Frågor du hade fel på
                    </Text>

                    {session.wrongQuestions.map(
                      (item) => {
                        const options =
                          item.card
                            .options ?? [];

                        const yourAnswer =
                          item.selectedIndex !==
                          null
                            ? options[
                                item
                                  .selectedIndex
                              ] ?? ""
                            : "Inget svar";

                        const correctOptionIndex =
                          item.card
                            .correctOptionIndex;

                        const correctAnswer =
                          typeof correctOptionIndex ===
                          "number"
                            ? options[
                                correctOptionIndex
                              ] ?? ""
                            : "";

                        return (
                          <View
                            key={
                              item.index
                            }
                            style={
                              examStyles.wrongCard
                            }
                          >
                            <Text
                              style={
                                quizStyles.question
                              }
                            >
                              {item.card
                                .questionQuiz ??
                                item.card
                                  .question ??
                                ""}
                            </Text>

                            <View
                              style={
                                examStyles.answerBlock
                              }
                            >
                              <Text
                                style={
                                  examStyles.answerLabel
                                }
                              >
                                Ditt svar
                              </Text>

                              <Text
                                style={
                                  examStyles.yourAnswer
                                }
                              >
                                {yourAnswer}
                              </Text>
                            </View>

                            <View
                              style={
                                examStyles.answerBlock
                              }
                            >
                              <Text
                                style={
                                  examStyles.answerLabel
                                }
                              >
                                Rätt svar
                              </Text>

                              <Text
                                style={
                                  examStyles.correctAnswer
                                }
                              >
                                {correctAnswer}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                    )}
                  </>
                ) : (
                  <View
                    style={
                      examStyles.perfectCard
                    }
                  >
                    <FontAwesome
                      name="check-circle"
                      size={34}
                      color={
                        colorSchemeGui.lime_500
                      }
                    />

                    <Text
                      style={
                        examStyles.perfectText
                      }
                    >
                      Alla svar var rätt!
                    </Text>
                  </View>
                )}
              </>
            ) : session.card ? (
              <>
                <View
                  style={
                    examStyles.statusRow
                  }
                >
                  {timerText ? (
                    <View
                      style={
                        examStyles.statusItem
                      }
                    >
                      <FontAwesome
                        name="clock-o"
                        size={17}
                        color={
                          colorSchemeGui
                            .slate_200
                        }
                      />

                      <Text
                        style={
                          examStyles.statusText
                        }
                      >
                        {timerText}
                      </Text>
                    </View>
                  ) : null}

                  <View
                    style={
                      examStyles.statusItem
                    }
                  >
                    <FontAwesome
                      name="check-square-o"
                      size={16}
                      color={
                        colorSchemeGui.slate_200
                      }
                    />

                    <Text
                      style={
                        examStyles.statusText
                      }
                    >
                      {
                        session.answeredCount
                      }
                      /{session.total}
                    </Text>
                  </View>
                </View>

                <Text
                  style={
                    examStyles.questionCounter
                  }
                >
                  Fråga{" "}
                  {session.index + 1} av{" "}
                  {session.total}
                </Text>

                <View
                  style={quizStyles.card}
                >
                  <Text
                    style={
                      quizStyles.question
                    }
                  >
                    {session.card
                      .questionQuiz ??
                      session.card
                        .question ??
                      ""}
                  </Text>

                  <View
                    style={
                      quizStyles.options
                    }
                  >
                    {(
                      session.card.options ??
                      []
                    ).map(
                      (
                        option,
                        optionIndex
                      ) => {
                        const isSelected =
                          session.selectedIndex ===
                          optionIndex;

                        return (
                          <Pressable
                            key={
                              optionIndex
                            }
                            onPress={() =>
                              session.selectAnswer(
                                optionIndex
                              )
                            }
                            style={[
                              quizStyles.option,
                              isSelected &&
                                examStyles.optionSelected,
                            ]}
                          >
                            <Text
                              style={[
                                quizStyles.optionText,
                                isSelected &&
                                  examStyles.optionTextSelected,
                              ]}
                            >
                              {option}
                            </Text>
                          </Pressable>
                        );
                      }
                    )}
                  </View>
                </View>

                <View
                  style={
                    examStyles.navigation
                  }
                >
                  <Pressable
                    disabled={
                      session.isFirst
                    }
                    onPress={
                      session.goPrevious
                    }
                    style={[
                      examStyles.navButton,
                      examStyles.previousButton,
                      session.isFirst &&
                        examStyles.disabledButton,
                    ]}
                  >
                    <FontAwesome
                      name="chevron-left"
                      size={15}
                      color={
                        colorSchemeGui.slate_200
                      }
                    />

                    <Text
                      style={
                        examStyles.previousText
                      }
                    >
                      Föregående
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={
                      session.isLast
                        ? handleSubmit
                        : session.goNext
                    }
                    style={[
                      quizStyles.button,
                      quizStyles.buttonSecondary,
                      examStyles.navButton,
                    ]}
                  >
                    <Text
                      style={[
                        quizStyles.buttonText,
                        quizStyles.buttonTextSecondary,
                      ]}
                    >
                      {session.isLast
                        ? "Lämna in prov"
                        : "Nästa"}
                    </Text>

                    {!session.isLast ? (
                      <FontAwesome
                        name="chevron-right"
                        size={15}
                        color={
                          colorSchemeGui.lime_900
                        }
                      />
                    ) : null}
                  </Pressable>
                </View>
              </>
            ) : (
              <Text
                style={quizStyles.text}
              >
                Inga frågor hittades.
              </Text>
            )}
          </>
        ) : (
          <Text
            style={quizStyles.text}
          >
            Slutprovet finns inte.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const examStyles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor:
      colorSchemeGui.slate_900,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  closeButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 48,
  },

  statusRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor:
      colorSchemeGui.slate_700,
    backgroundColor:
      colorSchemeGui.slate_900,
  },

  statusText: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 15,
    fontWeight: "700",
  },

  questionCounter: {
    color:
      colorSchemeGui.Fuchsia_500,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 18,
    paddingHorizontal: 4,
  },

  optionSelected: {
    backgroundColor:
      colorSchemeGui.slate_700,
    borderColor:
      colorSchemeGui.Fuchsia_500,
  },

  optionTextSelected: {
    fontWeight: "800",
    color:
      colorSchemeGui.slate_200,
  },

  navigation: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  navButton: {
    flex: 1,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  previousButton: {
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor:
      colorSchemeGui.slate_700,
    backgroundColor:
      colorSchemeGui.slate_900,
  },

  previousText: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 16,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.3,
  },

  resultHeader: {
    marginTop: 24,
    padding: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor:
      colorSchemeGui.lime_600,
    backgroundColor:
      colorSchemeGui.lime_500,
    alignItems: "center",
  },

  resultTitle: {
    color:
      colorSchemeGui.lime_900,
    fontSize: 18,
    fontWeight: "800",
  },

  resultScore: {
    color:
      colorSchemeGui.lime_900,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },

  sectionTitle: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 12,
  },

  wrongCard: {
    marginBottom: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor:
      colorSchemeGui.slate_700,
    backgroundColor:
      colorSchemeGui.slate_900,
  },

  answerBlock: {
    marginTop: 14,
  },

  answerLabel: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.7,
    marginBottom: 3,
  },

  yourAnswer: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 16,
  },

  correctAnswer: {
    color:
      colorSchemeGui.lime_500,
    fontSize: 16,
    fontWeight: "800",
  },

  perfectCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor:
      colorSchemeGui.lime_600,
    backgroundColor:
      colorSchemeGui.slate_900,
    alignItems: "center",
    gap: 10,
  },

  perfectText: {
    color:
      colorSchemeGui.slate_200,
    fontSize: 18,
    fontWeight: "800",
  },
});