import level001 from "../../../assets/game/level_001.json";
import level002 from "../../../assets/game/level_002.json";

import Level001Svg from "../../../assets/game/level_001.svg";
import Level002Svg from "../../../assets/game/level_002.svg";

import type { LevelLayout } from "./levelTypes";

export type LevelConfig = {
  id: string;
  chapterId: string;
  layout: LevelLayout;
  Svg: React.ComponentType<any>;
};

export const levelsById: Record<string, LevelConfig> = {
  level_001: {
    id: "level_001",
    chapterId: "sjokortet",
    layout: level001 as LevelLayout,
    Svg: Level001Svg,
  },
  level_002: {
    id: "level_002",
    chapterId: "sjokortet_sjomarken",
    layout: level002 as LevelLayout,
    Svg: Level002Svg,
  },
};