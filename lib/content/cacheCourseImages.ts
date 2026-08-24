import type { FlashCard } from "../../constants/flashcards/types";
import { cacheRemoteImage } from "./imageCache";
import type { CourseDecks } from "./loadCourseFromSupabase";

async function cacheImage(
  courseId: string,
  url: string | undefined
): Promise<string | undefined> {
  if (!url) return undefined;

  return cacheRemoteImage(courseId, url);
}

async function cacheCardImages(
  courseId: string,
  card: FlashCard
): Promise<FlashCard> {
  const imageUrl = await cacheImage(
    courseId,
    card.imageUrl
  );

  const answerImageUrl = await cacheImage(
    courseId,
    card.answerImageUrl
  );

  const optionImageUrls = card.optionImageUrls
    ? await Promise.all(
        card.optionImageUrls.map((url) =>
          cacheImage(courseId, url)
        )
      )
    : undefined;

  return {
    ...card,
    imageUrl,
    answerImageUrl,
    optionImageUrls,
  };
}

export async function cacheCourseImages(
  courseId: string,
  decks: CourseDecks
): Promise<CourseDecks> {
  const cachedDecks: CourseDecks = {};

  for (const [deckId, cards] of Object.entries(decks)) {
    cachedDecks[deckId] = [];

    for (const card of cards) {
      const cachedCard = await cacheCardImages(
        courseId,
        card
      );

      cachedDecks[deckId].push(cachedCard);
    }
  }

  return cachedDecks;
}