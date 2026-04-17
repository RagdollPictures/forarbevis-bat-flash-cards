import type { LevelTheme } from "./levelScreenTypes";

function decoId(index: number) {
  return `deco_${String(index).padStart(2, "0")}`;
}

export function getVisibleSvgLayerIds(theme: LevelTheme) {
  if (theme.visibleSvgLayerIds?.length) {
    return theme.visibleSvgLayerIds;
  }

  const ids: string[] = [];

  if (theme.levelLayerId) {
    ids.push(theme.levelLayerId);
  }

  const count = theme.decoCount ?? 0;

  for (let i = 1; i <= count; i++) {
    ids.push(decoId(i));
  }

  return ids;
}