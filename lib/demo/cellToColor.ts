import { CELLS, COLORS } from './constants';

export const cellToColor = (cell: typeof CELLS[keyof typeof CELLS]) => {
  const cellName = Object.keys(CELLS).find<keyof typeof CELLS>((key) => {
    return CELLS[key as keyof typeof CELLS] === cell;
  });
  if (!cellName) {
    return null;
  }
  const colorKey = cellName;
  return COLORS[colorKey];
}
