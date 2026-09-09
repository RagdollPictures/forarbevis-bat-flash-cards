import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import { colorSchemeGui } from "../../constants/colors";
import type { FinalExam } from "../../lib/content/loadFinalExamsFromSupabase";

type Props = {
  visible: boolean;
  exams: FinalExam[];
  onClose: () => void;
  onSelect: (exam: FinalExam) => void;
};

export default function FinalExamMenu({
  visible,
  exams,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor:
            "rgba(15, 23, 42, 0.78)",
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            inset: 0,
          }}
          onPress={onClose}
        />

        <View
          style={{
            maxHeight: "85%",
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor:
              colorSchemeGui.slate_900,
            borderWidth: 2,
            borderBottomWidth: 6,
            borderColor:
              colorSchemeGui.slate_700,
          }}
        >
          <View
            style={{
              height: 76,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor:
                colorSchemeGui.slate_700,
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                width: 56,
                height: 56,
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={12}
            >
              <FontAwesome
                name="times"
                size={34}
                color={
                  colorSchemeGui.slate_200
                }
              />
            </Pressable>

            <Text
              style={{
                flex: 1,
                marginRight: 56,
                textAlign: "center",
                color:
                  colorSchemeGui.slate_200,
                fontSize: 22,
                fontWeight: "900",
              }}
            >
              Övningsprov
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: 20,
              gap: 14,
            }}
          >
            <Text
              style={{
                color:
                  colorSchemeGui.slate_200,
                fontSize: 20,
                fontWeight: "900",
                marginBottom: 4,
              }}
            >
              Välj övningsprov
            </Text>

            {exams.map((exam) => (
              <Pressable
                key={exam.id}
                onPress={() =>
                  onSelect(exam)
                }
                style={{
                  borderWidth: 2,
                  borderBottomWidth: 5,
                  borderColor:
                    colorSchemeGui.slate_700,
                  borderRadius: 16,
                  padding: 18,
                  backgroundColor:
                    colorSchemeGui.slate_900,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: 12,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color:
                        colorSchemeGui
                          .slate_200,
                      fontSize: 18,
                      fontWeight: "900",
                    }}
                  >
                    {exam.title}
                  </Text>

                  <FontAwesome
                    name="chevron-right"
                    size={18}
                    color={
                      colorSchemeGui
                        .slate_200
                    }
                  />
                </View>

                {exam.subtitle ? (
                  <Text
                    style={{
                      marginTop: 7,
                      color:
                        colorSchemeGui
                          .slate_200,
                      fontSize: 14,
                      lineHeight: 20,
                      opacity: 0.8,
                    }}
                  >
                    {exam.subtitle}
                  </Text>
                ) : null}

                {exam.timeLimitMinutes !==
                null ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 10,
                    }}
                  >
                    <FontAwesome
                      name="clock-o"
                      size={14}
                      color={
                        colorSchemeGui
                          .slate_200
                      }
                    />

                    <Text
                      style={{
                        color:
                          colorSchemeGui
                            .slate_200,
                        fontSize: 13,
                        opacity: 0.7,
                      }}
                    >
                      {
                        exam.timeLimitMinutes
                      }{" "}
                      minuter
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}