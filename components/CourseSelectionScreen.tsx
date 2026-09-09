import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useCourse } from "../lib/CourseProvider";

export function CourseSelectionScreen() {
  const {
    courses,
    selectCourse,
  } = useCourse();

  return (
    <View style={styles.container}>
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
            <Text style={styles.courseTitle}>
              {course.title}
            </Text>

            {course.subtitle ? (
              <Text style={styles.subtitle}>
                {course.subtitle}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
  },

  list: {
    gap: 16,
  },

  card: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    opacity: 0.65,
  },
});