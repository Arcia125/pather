import { state } from './demo';

export const getCellSize = (canvas: HTMLCanvasElement) => Math.min(canvas.width, canvas.height) / state.grid[0].length;
