import AsyncStorage from "@react-native-async-storage/async-storage";
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
  ) => Promise<void>;
  openCourseSelection: () => void;
};

const CourseContext =
  createContext<CourseContextValue | null>(
    null
  );

function getSelectedCourseKey(
  appId: string
) {
  return `selected-course:${appId}`;
}

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
        const [
          loadedCourses,
          savedCourseId,
        ] = await Promise.all([
          loadCoursesFromSupabase(
            appId
          ),
          AsyncStorage.getItem(
            getSelectedCourseKey(
              appId
            )
          ),
        ]);

        if (cancelled) {
          return;
        }

        setCourses(
          loadedCourses
        );

        if (
          loadedCourses.length === 0
        ) {
          setSelectedCourseId(
            fallbackCourseId
          );

          setNeedsCourseSelection(
            false
          );

          return;
        }

        if (
          loadedCourses.length === 1
        ) {
          const onlyCourseId =
            loadedCourses[0].id;

          setSelectedCourseId(
            onlyCourseId
          );

          setNeedsCourseSelection(
            false
          );

          await AsyncStorage.setItem(
            getSelectedCourseKey(
              appId
            ),
            onlyCourseId
          );

          return;
        }

        const savedCourseExists =
          savedCourseId !== null &&
          loadedCourses.some(
            (item) =>
              item.id ===
              savedCourseId
          );

        if (
          savedCourseExists &&
          savedCourseId
        ) {
          setSelectedCourseId(
            savedCourseId
          );

          setNeedsCourseSelection(
            false
          );

          return;
        }

        const fallbackExists =
          loadedCourses.some(
            (item) =>
              item.id ===
              fallbackCourseId
          );

        setSelectedCourseId(
          fallbackExists
            ? fallbackCourseId
            : loadedCourses[0].id
        );

        setNeedsCourseSelection(
          true
        );
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

  async function selectCourse(
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

    try {
      await AsyncStorage.setItem(
        getSelectedCourseKey(
          appId
        ),
        courseId
      );
    } catch (error) {
      console.warn(
        "Kunde inte spara vald kurs:",
        error
      );
    }
  }

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