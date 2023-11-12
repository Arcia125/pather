import { cellToColor } from './cellToColor';
import { CELLS, COLORS } from './constants';
import { state, search } from './demo';
import { findCell } from './findCell';
import { getCellSize } from './getCellSize';

const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  let colI = 0;
  for (let col of state.grid) {
    let rowI = 0;
    for (let row of col) {
      drawCell(ctx, canvas, { x: rowI, y: colI, ...row === 1 ? { fill: COLORS.WALL, stroke: COLORS.GRID } : { stroke: COLORS.GRID } });
      rowI++;
    }
    colI++;
  }
  ctx.closePath();
};

const drawCell = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, params: { fill?: string; stroke?: string; x: number; y: number; }) => {
  ctx.beginPath();
  const celLSize = getCellSize(canvas);
  if (params.fill) {
    ctx.fillStyle = params.fill;
  }
  if (params.stroke) {
    ctx.strokeStyle = params.stroke;
  }
  ctx.rect(params.x * celLSize, params.y * celLSize, celLSize, celLSize);
  if (params.fill) {
    ctx.fill();
  }
  if (params.stroke) {
    ctx.stroke();
  }
  ctx.closePath();
};

const drawStartPos = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const startPos = findCell(CELLS.START);
  drawCell(ctx, canvas, {
    x: startPos.x,
    y: startPos.y,
    fill: COLORS.START
  });
};

const drawEndPos = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const endPos = findCell(CELLS.END);
  drawCell(ctx, canvas, {
    x: endPos.x,
    y: endPos.y,
    fill: COLORS.END
  });
};

const drawPath = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  if (!state.path) {
    console.warn('no state.path');
    return;
  }
  for (let i = 0; i < state.pathIndex; i++) {
    const pathPos = state.path[i].position;
    drawCell(ctx, canvas, {
      x: pathPos.x,
      y: pathPos.y,
      fill: COLORS.PATH
    });
  }
};

const drawSearch = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  for (let node of (search.value?.aStar.possibleNodes || [])) {
    if (!node) {
      continue;
    }
    drawCell(ctx, canvas, {
      x: node.x,
      y: node.y,
      fill: COLORS.POSSIBLE,
    });
  }

  for (let node of (search.value?.aStar.checkedNodes || [])) {
    if (!node) {
      continue;
    }

    drawCell(ctx, canvas, {
      x: node.x,
      y: node.y,
      fill: COLORS.CHECKED,
    });
  }
};

const drawPlacing = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const cellSize = getCellSize(canvas);
  const coordSystemPos = {
    x: Math.floor(state.mousePos.x / cellSize),
    y: Math.floor(state.mousePos.y / cellSize)
  };


  const color = cellToColor(state.placing);
  drawCell(ctx, canvas, {
    x: coordSystemPos.x,
    y: coordSystemPos.y,
    fill: `${color}bf`
  });
};

export const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = '#000';
  drawGrid(ctx, canvas);
  drawSearch(ctx, canvas);
  drawPath(ctx, canvas);
  drawStartPos(ctx, canvas);
  drawEndPos(ctx, canvas);
  drawPlacing(ctx, canvas);
};
