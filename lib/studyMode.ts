import AsyncStorage from "@react-native-async-storage/async-storage";

export type StudyMode =
  | "guided"
  | "free";

function getStudyModeKey(
  courseId: string
) {
  return `study-mode:${courseId}`;
}

export async function loadStudyMode(
  courseId: string
): Promise<StudyMode | null> {
  const value =
    await AsyncStorage.getItem(
      getStudyModeKey(courseId)
    );

  if (
    value === "guided" ||
    value === "free"
  ) {
    return value;
  }

  return null;
}

export async function saveStudyMode(
  courseId: string,
  mode: StudyMode
): Promise<void> {
  await AsyncStorage.setItem(
    getStudyModeKey(courseId),
    mode
  );
}