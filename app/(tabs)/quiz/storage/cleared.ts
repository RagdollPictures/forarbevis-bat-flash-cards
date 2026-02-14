// app/(tabs)/quiz-menu/storage/cleared.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UNLOCK_PERCENT = 75;
export const CLEARED_KEY = "forarintyg_cleared_quiz_ids_v1";

export async function loadClearedSet(): Promise<Set<string>> {
  const raw = await AsyncStorage.getItem(CLEARED_KEY);
  if (!raw) return new Set();
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

export async function saveClearedSet(set: Set<string>) {
  await AsyncStorage.setItem(CLEARED_KEY, JSON.stringify(Array.from(set)));
}
