import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { loadCourseCache } from "./courseCache";
import type { CourseDecks } from "./loadCourseFromSupabase";
import { syncCourseContent } from "./syncCourseContent";

type ContentContextValue = {
  decks: CourseDecks;
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
  const [isReady, setIsReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function startContent() {
      const cached = await loadCourseCache(courseId);

      if (cancelled) return;

      if (cached) {
        setDecks(cached);
        setIsReady(true);
      }

      setIsSyncing(true);

      try {
        
        const synced =
          await syncCourseContent(courseId);

          

        if (cancelled) return;

        setDecks(synced);
        setIsReady(true);
      } catch (error) {
        console.warn(
          "Kunde inte synka kursinnehåll:",
          error
        );

        if (!cached && !cancelled) {
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