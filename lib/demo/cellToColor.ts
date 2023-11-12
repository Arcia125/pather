import { CELLS, COLORS } from './constants';

export const cellToColor = (cell: typeof CELLS[keyof typeof CELLS]) => {
  const cellName = Object.keys(CELLS).find((key) => {
    return CELLS[key as keyof typeof CELLS] === cell;
  }) as keyof typeof CELLS;
  if (!cellName) {
    return null;
  }
  const colorKey = cellName;
  return COLORS[colorKey];
}
