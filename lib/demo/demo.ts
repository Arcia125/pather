import { AStar } from '../AStar';
import { PathNode } from '../pathNode';
import { ActionButton } from './ActionButton';
import { ActionCheckbox } from './ActionCheckbox';

const COLORS = {
  START: '#05998c',
  END: '#990512',
  PATH: '#b3e0dc',
  CHECKED: '#5C9905',
  POSSIBLE: '#420599',
  WALL: '#000',
  GRID: '#025043'
};

const time = {
  lastFrameTimeMs: 0,
  maxFPS: 60,
  frameID: 0,
  stepID: 0,
  delta: 0,
  framesThisSecond: 0,
  lastFpsUpdate: 0,
  fps: 0,
  resetDeltaCount: 0,
  timeStep: 1000 / 60,
};

let running = false;

let pathIndex = 0;

const CELLS = {
  NOTHING: 0,
  WALL: 1,
  START: 2,
  END: 3
} as const;

const findCell = (cellValue: typeof CELLS[keyof typeof CELLS]) => {
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

const getInitialGrid = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, CELLS.START, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CELLS.END],
];


const state: {
  time: typeof time;
  running: boolean;
  path?: PathNode[] | undefined;
  pathIndex: number;
  possibleIndex: number;
  checkedIndex: number;
  speed: number;
  diagonal: boolean;
  placing: typeof CELLS[keyof typeof CELLS];
  grid: number[][];
} = {
  time,
  running,
  pathIndex,
  possibleIndex: 0,
  checkedIndex: 0,
  speed: 0.01,
  diagonal: false,
  placing: CELLS.WALL,
  grid: getInitialGrid()
};

const createSearch = () => {
  return new AStar({
    startPos: findCell(CELLS.START),
    endPos: findCell(CELLS.END),
    diagonal: state.diagonal,
    wouldCollide: (node) => state.grid[node.y][node.x] === 1,
    isOutOfBounds: (node) => typeof (state.grid?.[node.y]?.[node.x]) === 'undefined',
  });
};


let search = createSearch();


state.path = search.findPath();

const reset = () => {
  state.pathIndex = 0;
  state.possibleIndex = 0;
  state.checkedIndex = 0;
  state.running = false;
  search = createSearch();
  state.path = search.findPath();
};

const update = (_timeStamp: number) => {
  if (!state.path) {
    return;
  }
  state.checkedIndex += state.time.delta * state.speed;
  if (state.checkedIndex > search.checkedNodes.length) {
    state.checkedIndex = search.checkedNodes.length
    state.possibleIndex += state.time.delta * state.speed;
    if (state.possibleIndex > search.possibleNodes.length) {
      state.possibleIndex = search.possibleNodes.length
      state.pathIndex += state.time.delta * state.speed;
      if (state.pathIndex > state.path?.length) {
        state.pathIndex = state.path?.length;
      }
    }
  }
};

const resetDelta = () => {
  state.time.resetDeltaCount++;
  state.time.delta = 0;
};

const getCellSize = (canvas: HTMLCanvasElement) => Math.min(canvas.width, canvas.height) / state.grid.length;

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
  let possibleIndex = 0;
  for (let node of search.possibleNodes) {
    if (!node) {
      continue;
    }
    if (possibleIndex >= state.possibleIndex) {
      break;
    }
    drawCell(ctx, canvas, {
      x: node.x,
      y: node.y,
      fill: COLORS.POSSIBLE,
    });
    possibleIndex++;
  }

  let checkedIndex = 0;
  for (let node of search.checkedNodes) {
    if (!node) {
      continue;
    }

    if (checkedIndex >= state.checkedIndex) {
      break;
    }
    drawCell(ctx, canvas, {
      x: node.x,
      y: node.y,
      fill: COLORS.CHECKED,
    });
    checkedIndex++;
  }
};

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
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
};

const mainLoop = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  if (!ctx) {
    throw new Error('Missing canvas context');
  }

  const __gameLoop = (timestamp: number) => {
    if (timestamp < state.time.lastFrameTimeMs + (1000 / state.time.maxFPS)) {
      state.time.stepID = window.requestAnimationFrame(__gameLoop);
      return;
    }

    if (state.running) {

      state.time.delta += timestamp - state.time.lastFrameTimeMs;
      state.time.lastFrameTimeMs = timestamp;

      if (timestamp > state.time.lastFpsUpdate + 1000) {
        state.time.fps = 0.25 * state.time.framesThisSecond + 0.75 * state.time.fps;

        state.time.lastFpsUpdate = timestamp;
        state.time.framesThisSecond = 0;
      }

      state.time.framesThisSecond++;

      let numUpdateSteps = 0;

      while (state.time.delta >= state.time.timeStep) {
        update(timestamp);
        state.time.delta -= state.time.timeStep;

        if (++numUpdateSteps >= 240) {
          resetDelta();
          break;
        }
      }
    } else {
      state.time.lastFrameTimeMs = timestamp;
    }


    state.time.frameID++;
    render(ctx, canvas);

    state.time.stepID = window.requestAnimationFrame(__gameLoop);

  };


  __gameLoop(1);
};


const start = () => {
  const canvas = document.querySelector('#main-demo-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  new ActionButton('#reset-button', () => {
    reset();
  });
  new ActionButton('#start-button', () => {
    reset();
    state.running = true;
  });
  new ActionButton('#place-start-button', () => {
    state.placing = CELLS.START;
  });
  new ActionButton('#place-end-button', () => {
    state.placing = CELLS.END;
  });

  new ActionButton('#clear-button', () => {
    for (let y = 0; y < state.grid.length; y++) {
      const column = state.grid[y];
      for (let x = 0; x < column.length; x++) {
        state.grid[y][x] = CELLS.NOTHING;
      }
    }
    state.grid[0][0] = CELLS.START;
    state.grid[state.grid.length - 1][state.grid[0].length - 1] = CELLS.END;
    reset();

  });

  new ActionCheckbox('#diagonal-checkbox', (event) => {
    state.diagonal = (event.target as HTMLInputElement).checked;
  })

  if (!ctx) {
    throw new Error('no context found');
  }

  const resize = () => {
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const aspectRatio = width / height;

    if (height < width / aspectRatio) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }
    (ctx as any).msImageSmoothingEnabled = false;
    (ctx as any).mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  };

  resize();

  window.addEventListener("resize", () => {
    resize();
  });

  canvas.addEventListener('click', (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const clickPos = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top
    };

    const cellSize = getCellSize(canvas);
    const coordSystemPos = {
      x: Math.floor(clickPos.x / cellSize),
      y: Math.floor(clickPos.y / cellSize)
    };

    if (state.placing === CELLS.WALL) {
      state.grid[coordSystemPos.y][coordSystemPos.x] = state.grid[coordSystemPos.y][coordSystemPos.x] === CELLS.WALL ? CELLS.NOTHING : CELLS.WALL;
    } else {
      const prevCell = findCell(state.placing);
      if (state.grid[coordSystemPos.y][coordSystemPos.x] === CELLS.END && state.placing === CELLS.START) {
        state.grid[prevCell.y][prevCell.x] = CELLS.END;
      } else if (state.grid[coordSystemPos.y][coordSystemPos.x] === CELLS.START && state.placing === CELLS.END) {
        state.grid[prevCell.y][prevCell.x] = CELLS.START;
      } else {
        state.grid[prevCell.y][prevCell.x] = CELLS.NOTHING;
      }
      state.grid[coordSystemPos.y][coordSystemPos.x] = state.placing;
      state.placing = CELLS.WALL;
    }
    reset();
  });

  mainLoop(ctx, canvas);
};


start();
