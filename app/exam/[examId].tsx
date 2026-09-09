import { FontAwesome } from "@expo/vector-icons";
import {
    router,
    useLocalSearchParams,
} from "expo-router";
import React, { useMemo } from "react";
import {
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colorSchemeGui } from "../../constants/colors";
import { useContent } from "../../lib/content/ContentProvider";

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
  useExamSession(deck);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorSchemeGui.slate_900,
      }}
    >
      <View
        style={{
          height: 72,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 64,
            height: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
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

      <View
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        {exam ? (
          <>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "900",
              }}
            >
              {exam.title}
            </Text>

            {exam.subtitle ? (
              <Text
                style={{
                  color: "#cbd5e1",
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                {exam.subtitle}
              </Text>
            ) : null}

            {session.isFinished ? (
  <>
    <Text
      style={{
        color: "#fff",
        fontSize: 30,
        fontWeight: "900",
        marginTop: 24,
      }}
    >
      Resultat
    </Text>

    <Text
      style={{
        color: "#fff",
        fontSize: 22,
        fontWeight: "800",
        marginTop: 16,
      }}
    >
      {session.score} av{" "}
      {session.total} rätt
    </Text>

    {session.wrongQuestions.length > 0 ? (
      <>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "800",
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          Frågor du hade fel på
        </Text>

        {session.wrongQuestions.map(
          (item) => {
            const options =
              item.card.options ?? [];

            const yourAnswer =
              item.selectedIndex !== null
                ? options[
                    item.selectedIndex
                  ] ?? ""
                : "Inget svar";

          const correctOptionIndex =
  item.card.correctOptionIndex;

const correctAnswer =
  typeof correctOptionIndex === "number"
    ? options[
        correctOptionIndex
      ] ?? ""
    : "";

            return (
              <View
                key={item.index}
                style={{
                  backgroundColor:
                    "#1e293b",
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "800",
                  }}
                >
                  {item.card
                    .questionQuiz ??
                    item.card
                      .question ??
                    ""}
                </Text>

                <Text
                  style={{
                    color: "#cbd5e1",
                    fontSize: 15,
                    marginTop: 12,
                  }}
                >
                  Ditt svar:{" "}
                  {yourAnswer}
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    marginTop: 6,
                  }}
                >
                  Rätt svar:{" "}
                  {correctAnswer}
                </Text>
              </View>
            );
          }
        )}
      </>
    ) : (
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          marginTop: 32,
        }}
      >
        Alla svar var rätt!
      </Text>
    )}
  </>
) : session.card ? (
  <>
    <Text
      style={{
        color: "#cbd5e1",
        fontSize: 16,
        marginTop: 24,
      }}
    >
      Fråga {session.index + 1} av{" "}
      {session.total}
    </Text>

    <Text
      style={{
        color: "#fff",
        fontSize: 22,
        fontWeight: "800",
        marginTop: 20,
      }}
    >
      {session.card.questionQuiz ??
        session.card.question ??
        ""}
    </Text>

    <View
      style={{
        marginTop: 24,
        gap: 12,
      }}
    >
      {(session.card.options ?? []).map(
        (option, optionIndex) => (
          <Pressable
            key={optionIndex}
            onPress={() =>
              session.selectAnswer(
                optionIndex
              )
            }
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor:
                session.selectedIndex ===
                optionIndex
                  ? "#475569"
                  : "#1e293b",
              borderWidth: 2,
              borderColor:
                session.selectedIndex ===
                optionIndex
                  ? "#fff"
                  : "#334155",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 17,
              }}
            >
              {option}
            </Text>
          </Pressable>
        )
      )}
    </View>

    <View
      style={{
        flexDirection: "row",
        justifyContent:
          "space-between",
        marginTop: 32,
      }}
    >
      <Pressable
        disabled={session.isFirst}
        onPress={session.goPrevious}
        style={{
          padding: 16,
          opacity:
            session.isFirst
              ? 0.3
              : 1,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "700",
          }}
        >
          Föregående
        </Text>
      </Pressable>

      <Pressable
        onPress={
          session.isLast
            ? session.submit
            : session.goNext
        }
        style={{
          padding: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "700",
          }}
        >
          {session.isLast
            ? "Lämna in prov"
            : "Nästa"}
        </Text>
      </Pressable>
    </View>
  </>
) : (
  <Text
    style={{
      color: "#fff",
      fontSize: 18,
      marginTop: 32,
    }}
  >
    Inga frågor hittades.
  </Text>
)}
          </>
        ) : (
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
            }}
          >
            Slutprovet finns inte.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}