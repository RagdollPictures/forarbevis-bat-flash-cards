export type QuizItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type LevelObjectConfig = {
  assetKey: string;
  width: number;
  height: number;
  anchor?: "bottom" | "center";
};

export type LevelTheme = {
 
  palette?: {
    sky?: string;
    water?: string;
    path?: string;
    platform?: string;
    accent?: string;
  };
  levelLayerId?: string;
  decoCount?: number;
  layerColors?: Partial<Record<string, string>>;
  visibleSvgLayerIds?: string[];
  objects?: Record<string, LevelObjectConfig>;
  objectAssets?: Record<string, any>;
};

export type MenuLevel = {
  id: string;
  chapterId: string;
  titleShort: string;
  label: string;
  iconName: string;
  menuAnchorId: string;
  layout: any;
  Svg: any;
  theme: LevelTheme;
};

export type BonusLevelItem = {
  id: string;
  title: string;
  unlockWhenClearedQuizId: string;
};

export type ReadPlacedNode = {
  id: string;
  type: "read";
  deckId: string;
  title: string;
  quizId: string;
  x: number;
  y: number;
};

export type QuizPlacedNode = {
  id: string;
  type: "quiz";
  quizId: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
};

export type ChapterTestPlacedNode = {
  id: string;
  type: "chapter_test";
  quizId: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
};

export type ObjectAnchor = {
  id: string;
  type: "object";
  index: number;
  x: number;
  y: number;
};


export type PlacedNode =
  | ReadPlacedNode
  | QuizPlacedNode
  | ChapterTestPlacedNode;