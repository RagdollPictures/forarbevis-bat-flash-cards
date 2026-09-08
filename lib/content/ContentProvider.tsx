import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { CourseContent } from "./courseContent";
import { loadCourseContentCache } from "./courseContentCache";
import type { CourseDecks } from "./loadCourseFromSupabase";
import type { CourseStructure } from "./loadCourseStructureFromSupabase";
import type { SharedUiText } from "./loadSharedUiTextFromSupabase";
import { syncFullCourseContent } from "./syncCourseContent";

const emptyStructure: CourseStructure = {
  levels: [],
  units: [],
  bonusLevels: [],
  levelGraphics: [],
};

type ContentContextValue = {
  decks: CourseDecks;
  structure: CourseStructure;
  sharedUiText: SharedUiText;
  isReady: boolean;
  isSyncing: boolean;
};

const ContentContext =
  createContext<ContentContextValue | null>(null);

export function ContentProvider({
  courseId,
  children,
}: {
  courseId: string;
  children: React.ReactNode;
}) {
  const [decks, setDecks] =
    useState<CourseDecks>({});

  const [structure, setStructure] =
    useState<CourseStructure>(
      emptyStructure
    );

  const [
    sharedUiText,
    setSharedUiText,
  ] =
    useState<SharedUiText>({});

  const [isReady, setIsReady] =
    useState(false);

  const [isSyncing, setIsSyncing] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function startContent() {
      const cached =
        await loadCourseContentCache(
          courseId
        );

      if (cancelled) return;

      if (cached) {
        setDecks(cached.decks);

        setStructure(
          cached.structure
        );

        setSharedUiText(
          cached.sharedUiText ?? {}
        );

        setIsReady(true);
      }

      setIsSyncing(true);

      try {
        const synced: CourseContent =
          await syncFullCourseContent(
            courseId
          );

        if (cancelled) return;

        setDecks(synced.decks);

        setStructure(
          synced.structure
        );

        setSharedUiText(
          synced.sharedUiText
        );

        setIsReady(true);
      } catch (error) {
        console.warn(
          "Kunde inte synka kursinnehåll:",
          error
        );

        if (!cancelled) {
          setIsReady(true);
        }
      } finally {
        if (!cancelled) {
          setIsSyncing(false);
        }
      }
    }

    startContent();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  return (
    <ContentContext.Provider
      value={{
        decks,
        structure,
        sharedUiText,
        isReady,
        isSyncing,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context =
    useContext(ContentContext);

  if (!context) {
    throw new Error(
      "useContent måste användas inuti ContentProvider"
    );
  }

  return context;
}