import AsyncStorage from "@react-native-async-storage/async-storage";

function getKey(
  courseId: string,
  levelId: string
) {
  return `free-last-node:${courseId}:${levelId}`;
}

export async function saveFreeModeLastNode(
  courseId: string,
  levelId: string,
  quizId: string
) {
  await AsyncStorage.setItem(
    getKey(courseId, levelId),
    quizId
  );
}

export async function loadFreeModeLastNode(
  courseId: string,
  levelId: string
) {
  return AsyncStorage.getItem(
    getKey(courseId, levelId)
  );
}