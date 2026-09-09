import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    loadCoursesFromSupabase,
    type AppCourse,
} from "./content/loadCoursesFromSupabase";

type CourseContextValue = {
  courses: AppCourse[];
  selectedCourseId: string;
  isReady: boolean;
  needsCourseSelection: boolean;
  selectCourse: (
    courseId: string
  ) => void;
  openCourseSelection: () => void;
};

const CourseContext =
  createContext<CourseContextValue | null>(
    null
  );

export function CourseProvider({
  appId,
  fallbackCourseId,
  children,
}: {
  appId: string;
  fallbackCourseId: string;
  children: React.ReactNode;
}) {
  const [courses, setCourses] =
    useState<AppCourse[]>([]);

  const [
    selectedCourseId,
    setSelectedCourseId,
  ] = useState(
    fallbackCourseId
  );

  const [isReady, setIsReady] =
    useState(false);

  const [
    needsCourseSelection,
    setNeedsCourseSelection,
  ] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const loadedCourses =
          await loadCoursesFromSupabase(
            appId
          );

        if (cancelled) {
          return;
        }

        setCourses(
          loadedCourses
        );

        /*
         * Fler än en aktiv kurs:
         * visa kursväljaren.
         */
        setNeedsCourseSelection(
          loadedCourses.length > 1
        );

        /*
         * Bara en aktiv kurs:
         * välj den automatiskt.
         */
        if (
          loadedCourses.length === 1
        ) {
          setSelectedCourseId(
            loadedCourses[0].id
          );
        }

        /*
         * Om fallback-kursen inte finns
         * bland de aktiva kurserna väljer
         * vi första tillgängliga kursen.
         */
        if (
          loadedCourses.length > 0 &&
          !loadedCourses.some(
            (item) =>
              item.id ===
              fallbackCourseId
          )
        ) {
          setSelectedCourseId(
            loadedCourses[0].id
          );
        }
      } catch (error) {
        console.warn(
          "Kunde inte läsa kurslista:",
          error
        );
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [
    appId,
    fallbackCourseId,
  ]);

  function selectCourse(
    courseId: string
  ) {
    if (
      !courses.some(
        (item) =>
          item.id === courseId
      )
    ) {
      return;
    }

    setSelectedCourseId(
      courseId
    );

    setNeedsCourseSelection(
      false
    );
  }

  /*
   * Gör att man kan komma tillbaka
   * till kursväljaren.
   *
   * Har appen bara en kurs finns
   * inget att välja mellan.
   */
  function openCourseSelection() {
    if (courses.length > 1) {
      setNeedsCourseSelection(
        true
      );
    }
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        selectedCourseId,
        isReady,
        needsCourseSelection,
        selectCourse,
        openCourseSelection,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context =
    useContext(CourseContext);

  if (!context) {
    throw new Error(
      "useCourse måste användas inuti CourseProvider"
    );
  }

  return context;
}