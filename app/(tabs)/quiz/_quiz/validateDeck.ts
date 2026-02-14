import type { FlashCard } from "../../../constants/flashcards/types";

export function validateDeck(rawDeck: FlashCard[]) {
  return rawDeck.filter((c) => {
    if (!c) return false;
    if (!Array.isArray(c.options)) return false;
    if (c.options.length < 2) return false;
    if (!Number.isInteger(c.correctOptionIndex)) return false;
    if ((c.correctOptionIndex ?? -1) < 0) return false;
    if ((c.correctOptionIndex ?? 999) >= c.options.length) return false;
    return true;
  });
}
