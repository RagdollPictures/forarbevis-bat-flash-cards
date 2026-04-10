import type { ComponentType } from "react";
import level001 from "../../assets/game/level_001.json";
import Level001Svg from "../../assets/game/level_001.svg";
import level002 from "../../assets/game/level_002.json";
import Level002Svg from "../../assets/game/level_002.svg";
import level003 from "../../assets/game/level_003.json";
import Level003Svg from "../../assets/game/level_003.svg";
import level004 from "../../assets/game/level_004.json";
import Level004Svg from "../../assets/game/level_004.svg";

import level005 from "../../assets/game/level_005.json";
import Level005Svg from "../../assets/game/level_005.svg";

import level006 from "../../assets/game/level_006.json";
import Level006Svg from "../../assets/game/level_006.svg";

import level007 from "../../assets/game/level_007.json";
import Level007Svg from "../../assets/game/level_007.svg";

import level008 from "../../assets/game/level_008.json";
import Level008Svg from "../../assets/game/level_008.svg";

import level009 from "../../assets/game/level_009.json";
import Level009Svg from "../../assets/game/level_009.svg";

import level010 from "../../assets/game/level_010.json";
import Level010Svg from "../../assets/game/level_010.svg";

import level011 from "../../assets/game/level_011.json";
import Level011Svg from "../../assets/game/level_011.svg";

import level012 from "../../assets/game/level_012.json";
import Level012Svg from "../../assets/game/level_012.svg";

import level013 from "../../assets/game/level_013.json";
import Level013Svg from "../../assets/game/level_013.svg";

import level014 from "../../assets/game/level_014.json";
import Level014Svg from "../../assets/game/level_014.svg";

import level015 from "../../assets/game/level_015.json";
import Level015Svg from "../../assets/game/level_015.svg";

import type { LevelLayout } from "./levelTypes";

export type LevelConfig = {
  chapterId: string;
  layout: LevelLayout;
  Svg: ComponentType<any>;
};

export const levelsById = {
  level_001: {
    chapterId: "sjokortet",
    layout: level001 as LevelLayout,
    Svg: Level001Svg,
  },
  level_002: {
    chapterId: "sjokortet_sjomarken",
    layout: level002 as LevelLayout,
    Svg: Level002Svg,
  },
  level_003: {
    chapterId: "sjokortsarbete",
    layout: level003 as LevelLayout,
    Svg: Level003Svg,
  },
  level_004: {
    chapterId: "navigationsteori",
    layout: level004 as LevelLayout,
    Svg: Level004Svg,
  },
  level_005: {
    chapterId: "praktisk_navigation",
    layout: level005 as LevelLayout,
    Svg: Level005Svg,
  },
  level_006: {
    chapterId: "vajningsregler",
    layout: level006 as LevelLayout,
    Svg: Level006Svg,
  },
  level_007: {
    chapterId: "lanternor",
    layout: level007 as LevelLayout,
    Svg: Level007Svg,
  },
  level_008: {
    chapterId: "manovrering",
    layout: level008 as LevelLayout,
    Svg: Level008Svg,
  },
  level_009: {
    chapterId: "navigationsinstrument",
    layout: level009 as LevelLayout,
    Svg: Level009Svg,
  },
  level_010: {
    chapterId: "sjomanskap",
    layout: level010 as LevelLayout,
    Svg: Level010Svg,
  },
  level_011: {
    chapterId: "signalering",
    layout: level011 as LevelLayout,
    Svg: Level011Svg,
  },
  level_0012: {
    chapterId: "sakerhet",
    layout: level012 as LevelLayout,
    Svg: Level012Svg,
  },
  level_013: {
    chapterId: "sjukvard",
    layout: level013 as LevelLayout,
    Svg: Level013Svg,
  },
  level_014: {
    chapterId: "vader",
    layout: level014 as LevelLayout,
    Svg: Level014Svg,
  },
  level_015: {
    chapterId: "miljo",
    layout: level015 as LevelLayout,
    Svg: Level015Svg,
  },

} satisfies Record<string, LevelConfig>;

export type LevelId = keyof typeof levelsById;

export const levelIds = Object.keys(levelsById) as LevelId[];

export function isLevelId(value: string): value is LevelId {
  return value in levelsById;
}

export function getLevelId(value?: string): LevelId {
  if (value && isLevelId(value)) return value;
  return levelIds[0];
}