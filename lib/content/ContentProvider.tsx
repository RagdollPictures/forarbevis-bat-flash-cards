import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { loadCourseCache } from "./courseCache";
import type { CourseContent } from "./courseContent";
import { loadCourseContentCache } from "./courseContentCache";
import type { CourseDecks } from "./loadCourseFromSupabase";
import type { CourseStructure } from "./loadCourseStructureFromSupabase";
import { syncFullCourseContent } from "./syncCourseContent";

const emptyStructure: CourseStructure = {
  levels: [],
  units: [],
  bonusLevels: [],
};

type ContentContextValue = {
  decks: CourseDecks;
  structure: CourseStructure;
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
  const [decks, setDecks] = useState<CourseDecks>({});
  const [structure, setStructure] =
    useState<CourseStructure>(emptyStructure);

  const [isReady, setIsReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function startContent() {
      const cached =
        await loadCourseContentCache(courseId);

      if (cancelled) return;

      if (cached) {
        setDecks(cached.decks);
        setStructure(cached.structure);
        setIsReady(true);
      } else {
        // Tillfällig fallback till den gamla cachen
        // under migreringen.
        const oldCached =
          await loadCourseCache(courseId);

        if (cancelled) return;

        if (oldCached) {
          setDecks(oldCached);
          setIsReady(true);
        }
      }

      setIsSyncing(true);

      try {
        const synced: CourseContent =
          await syncFullCourseContent(courseId);

        if (cancelled) return;

        setDecks(synced.decks);
        setStructure(synced.structure);

        
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
        isReady,
        isSyncing,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error(
      "useContent måste användas inuti ContentProvider"
    );
  }

  return context;
}