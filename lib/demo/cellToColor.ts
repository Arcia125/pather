import { CELLS, COLORS } from './constants';

export const cellToColor = (cell: typeof CELLS[keyof typeof CELLS]) => {
  const cellEntry = Object.entries(CELLS).find(([cellName, cellValue]) => {
    return cellValue === cell;
  });
  if (!cellEntry) {
    return null;
  }
  const colorKey = cellEntry[0] as keyof typeof CELLS;
  return COLORS[colorKey];
}
