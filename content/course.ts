import Constants from "expo-constants";

type CourseConfig = {
  id: string;
  name: string;
  sourceId: string;
  sourceTitle: string;
};

const configuredCourse =
  Constants.expoConfig?.extra
    ?.course as
    | CourseConfig
    | undefined;

if (!configuredCourse) {
  throw new Error(
    "Ingen course-konfiguration hittades i Expo config."
  );
}

export const course =
  configuredCourse;