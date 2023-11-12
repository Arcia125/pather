import { CELLS } from './constants';
import { state } from './demo';

export const findCell = (cellValue: typeof CELLS[keyof typeof CELLS]) => {
  for (let y = 0; y < state.grid.length; y++) {
    const column = state.grid[y];
    for (let x = 0; x < column.length; x++) {
      const cell = column[x];
      if (cell === cellValue) {
        return { x, y };
      }
    }
  }
  throw new Error(`${cellValue} not found`);
};
