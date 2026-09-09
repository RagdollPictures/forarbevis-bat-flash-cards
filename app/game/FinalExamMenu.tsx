import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
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
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor:
            "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor:
              colorSchemeGui.slate_900,
            borderRadius: 20,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: "900",
              }}
            >
              Slutprov
            </Text>

            <Pressable
              onPress={onClose}
              hitSlop={12}
            >
              <FontAwesome
                name="times"
                size={30}
                color="#fff"
              />
            </Pressable>
          </View>

          {exams.map((exam) => (
            <Pressable
              key={exam.id}
              onPress={() =>
                onSelect(exam)
              }
              style={{
                backgroundColor:
                  colorSchemeGui.slate_700,
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 19,
                  fontWeight: "800",
                }}
              >
                {exam.title}
              </Text>

              {exam.subtitle ? (
                <Text
                  style={{
                    color: "#e2e8f0",
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  {exam.subtitle}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}