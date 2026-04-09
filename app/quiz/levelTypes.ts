export type LevelAnchor = {
  id: string;
  type: "read" | "quiz";
  index: number;
  x: number;
  y: number;
};

export type LevelLayout = {
  viewBox: {
    width: number;
    height: number;
  };
  anchors: LevelAnchor[];
};