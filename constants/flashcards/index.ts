import type { FlashCard } from "./sjokortet";
import { sjokortet } from "./sjokortet";

export type ChapterId = "Sjökortet";

export const chapters: { id: ChapterId; title: string }[] = [
  { id: "Sjökortet", title: "Sjökortet" },
];

export const deckByChapter: Record<ChapterId, FlashCard[]> = {
  Sjökortet: sjokortet,
};
