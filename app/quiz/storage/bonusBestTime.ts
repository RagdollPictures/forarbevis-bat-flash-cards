import AsyncStorage from "@react-native-async-storage/async-storage";

function getKey(
  courseId: string,
  bonusId: string
) {
  return `bonus-best-time:${courseId}:${bonusId}`;
}

export async function getBonusBestTime(
  courseId: string,
  bonusId: string
): Promise<number | null> {
  const raw =
    await AsyncStorage.getItem(
      getKey(
        courseId,
        bonusId
      )
    );

  if (raw === null) {
    return null;
  }

  const value = Number(raw);

  if (
    !Number.isFinite(value) ||
    value < 0
  ) {
    return null;
  }

  return value;
}

export async function saveBonusBestTime(
  courseId: string,
  bonusId: string,
  elapsedSeconds: number
): Promise<{
  bestTime: number;
  isNewBest: boolean;
}> {
  const time = Math.max(
    0,
    Math.floor(elapsedSeconds)
  );

  const currentBest =
    await getBonusBestTime(
      courseId,
      bonusId
    );

  if (
    currentBest === null ||
    time < currentBest
  ) {
    await AsyncStorage.setItem(
      getKey(
        courseId,
        bonusId
      ),
      String(time)
    );

    return {
      bestTime: time,
      isNewBest: true,
    };
  }

  return {
    bestTime: currentBest,
    isNewBest: false,
  };
}