import { useMemo } from "react";

import { useContent } from "../../lib/content/ContentProvider";
import { buildLevelConfigFromStructure } from "./levelConfig";

export function useCourseLevelConfig() {
  const {
    structure,
    isReady: isContentReady,
  } = useContent();

  const config = useMemo(
    () =>
      buildLevelConfigFromStructure(
        structure
      ),
    [structure]
  );

  return {
    ...config,
    isReady:
      isContentReady &&
      config.levelIds.length > 0,
  };
}