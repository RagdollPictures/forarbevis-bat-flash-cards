import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    loadStudyMode,
    saveStudyMode,
    type StudyMode,
} from "./studyMode";

type StudyModeContextValue = {
  studyMode: StudyMode;
  isReady: boolean;
  setStudyMode: (
    mode: StudyMode
  ) => Promise<void>;
};

const StudyModeContext =
  createContext<StudyModeContextValue | null>(
    null
  );

export function StudyModeProvider({
  courseId,
  children,
}: {
  courseId: string;
  children: React.ReactNode;
}) {
  const [
    studyMode,
    setStudyModeState,
  ] =
    useState<StudyMode>("guided");

  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const saved =
        await loadStudyMode(
          courseId
        );

      if (cancelled) {
        return;
      }

      setStudyModeState(
        saved ?? "guided"
      );

      setIsReady(true);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  async function setStudyMode(
    mode: StudyMode
  ) {
    await saveStudyMode(
      courseId,
      mode
    );

    setStudyModeState(mode);
  }

  return (
    <StudyModeContext.Provider
      value={{
        studyMode,
        isReady,
        setStudyMode,
      }}
    >
      {children}
    </StudyModeContext.Provider>
  );
}

export function useStudyMode() {
  const context =
    useContext(StudyModeContext);

  if (!context) {
    throw new Error(
      "useStudyMode måste användas inuti StudyModeProvider"
    );
  }

  return context;
}