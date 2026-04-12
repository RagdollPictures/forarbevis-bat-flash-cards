export type LevelNodeAnchor = {
  id: string;
  type: "read" | "quiz";
  index: number;
  x: number;
  y: number;
};

export type LevelImageAnchor = {
  id: string;
  x: number;
  y: number;
};

export type LevelAnchor = LevelNodeAnchor | LevelImageAnchor;

export type LevelLayout = {
  viewBox: {
    width: number;
    height: number;
  };
  anchors: LevelAnchor[];
};