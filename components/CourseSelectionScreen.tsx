import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colorSchemeGui } from "../constants/colors";
import { useCourse } from "../lib/CourseProvider";

export function CourseSelectionScreen() {
  const {
    courses,
    selectCourse,
  } = useCourse();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Välj kurs
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >
        <Text style={styles.title}>
          Vad vill du träna på?
        </Text>

        <View style={styles.list}>
          {courses.map((course) => (
            <Pressable
              key={course.id}
              style={styles.card}
              onPress={() =>
                selectCourse(course.id)
              }
            >
              <View style={styles.cardRow}>
                <Text
                  style={
                    styles.courseTitle
                  }
                >
                  {course.title}
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

              {course.subtitle ? (
                <Text
                  style={
                    styles.subtitle
                  }
                >
                  {course.subtitle}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor:
        colorSchemeGui.slate_900,
    },

    header: {
      height: 84,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        colorSchemeGui.slate_700,
    },

    headerTitle: {
      color:
        colorSchemeGui.slate_200,
      fontSize: 22,
      fontWeight: "900",
      textAlign: "center",
    },

    container: {
      padding: 24,
      paddingBottom: 48,
    },

    title: {
      color:
        colorSchemeGui.slate_200,
      fontSize: 20,
      fontWeight: "900",
      marginBottom: 20,
    },

    list: {
      gap: 16,
    },

    card: {
      borderWidth: 2,
      borderBottomWidth: 5,
      borderColor:
        colorSchemeGui.slate_700,
      borderRadius: 16,
      padding: 18,
      backgroundColor:
        colorSchemeGui.slate_900,
    },

    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      gap: 12,
    },

    courseTitle: {
      flex: 1,
      color:
        colorSchemeGui.slate_200,
      fontSize: 18,
      fontWeight: "900",
    },

    subtitle: {
      marginTop: 7,
      color:
        colorSchemeGui.slate_200,
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.8,
    },
  });