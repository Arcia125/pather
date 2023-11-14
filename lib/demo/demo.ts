import { AStar } from '../AStar';
import { PathNode } from '../pathNode';
import { ActionButton, ActionInput } from './dom';
import './demo.css';
import { CELLS } from './constants';
import { findCell } from './findCell';
import { getCellSize } from './getCellSize';
import { render } from './render';
import { Position } from '../models';

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

const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

const getInitialMobileGrid = () => [
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

const getInitialDesktopGrid = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CELLS.START, 0, 1, 0, 1, 0, 0, CELLS.END, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const getInitialGrid = () => {
  if (mobileMediaQuery.matches) return getInitialMobileGrid();
  return getInitialDesktopGrid();
};


export const state: {
  time: typeof time;
  running: boolean;
  path?: PathNode[] | undefined;
  pathIndex: number;
  speed: number;
  diagonal: boolean;
  placing: typeof CELLS[keyof typeof CELLS];
  dragging: typeof CELLS[keyof typeof CELLS] | null;
  grid: number[][];
  mousePos: Position;
  mouseDown: boolean;
} = {
  time,
  running,
  pathIndex,
  speed: 1,
  diagonal: false,
  placing: CELLS.WALL,
  dragging: null,
  grid: getInitialGrid(),
  mousePos: {
    x: 0,
    y: 0,
  },
  mouseDown: false
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

let aStar = createSearch();
let gen = aStar.findPathGen();
export let search: ReturnType<typeof gen.next> = {
  done: false,
  value: {
    aStar,
    solution: undefined
  }
};
let solution = search.value?.solution;



const reset = () => {
  state.pathIndex = 0;
  state.running = false;
  aStar = createSearch();
  gen = aStar.findPathGen();
  search = {
    done: false,
    value: {
      aStar,
      solution: undefined
    }
  };
};

let lastUpdate = 0;
const update = (_timeStamp: number) => {

  if (!search.done) {

    if (Math.abs(_timeStamp - lastUpdate) > state.speed) {
      let temp = gen.next();
      if (!temp.done) {
        search = temp;
        lastUpdate = _timeStamp;
      }
    }
  }
  if (!search.done && search.value) {
    solution = search.value?.solution;
  }

  if (solution && solution.path && state.pathIndex < solution.path.length && Math.abs(_timeStamp - lastUpdate) > (state.speed / 2)) {
    state.path = solution.path;
    state.pathIndex++;
    lastUpdate = _timeStamp;
  }
};

const resetDelta = () => {
  state.time.resetDeltaCount++;
  state.time.delta = 0;
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

const registerDomEvents = () => {
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

  new ActionInput('#diagonal-checkbox', (event) => {
    state.diagonal = (event.target as HTMLInputElement).checked;
  }).element.checked = state.diagonal;

  new ActionInput('#speed-slider', (event) => {
    state.speed = 1000 - parseInt((event.target as HTMLInputElement).value);
  }).element.value = `${1000 - state.speed}`;
};

const defineGridToPoint = (coordSystemPos: Position) => {
  console.log(state.grid[coordSystemPos.y].length, coordSystemPos.x);
  if (state.grid[coordSystemPos.y].length < coordSystemPos.x) {
    for (let i = state.grid[coordSystemPos.y].length; i < coordSystemPos.x; i++) {
      state.grid[coordSystemPos.y][i] = CELLS.NOTHING;
      console.log(i);
    }
  }

  console.log(state.grid[coordSystemPos.y]);
}


const start = () => {
  const canvas = document.querySelector('#main-demo-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  registerDomEvents();

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

    const actions = document.querySelector<HTMLDivElement>('.actions');
    actions!.style.left = `calc(50vw - ${actions?.offsetWidth}px / 2)`;
  };

  resize();

  window.addEventListener("resize", () => {
    resize();
  });

  // canvas.addEventListener('mousedown', console.log);
  canvas.addEventListener('mousedown', (e) => {
    state.mouseDown = true;

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
    defineGridToPoint(coordSystemPos);



    if (state.placing === CELLS.WALL) {
      if (!state.dragging) {
        state.dragging = state.grid[coordSystemPos.y][coordSystemPos.x] === CELLS.WALL ? CELLS.NOTHING : CELLS.WALL
      }
      state.grid[coordSystemPos.y][coordSystemPos.x] = state.dragging;
      reset();
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    state.mouseDown = false;
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
    defineGridToPoint(coordSystemPos);



    if (state.placing !== CELLS.WALL){
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


      reset();
    }

    state.dragging = null;

  });


  canvas.addEventListener('mousemove', (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mousePos = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top
    };

    if (state.mouseDown) {
      const cellSize = getCellSize(canvas);
      const coordSystemPos = {
        x: Math.floor(mousePos.x / cellSize),
        y: Math.floor(mousePos.y / cellSize)
      };
      defineGridToPoint(coordSystemPos);

      if (state.placing === CELLS.WALL) {
        const irreplaceableCells = [CELLS.START, CELLS.END] as (typeof CELLS[keyof typeof CELLS])[];
        if (irreplaceableCells.includes(state.grid[coordSystemPos.y][coordSystemPos.x] as typeof CELLS[keyof typeof CELLS])) {
          return;
        }
        state.grid[coordSystemPos.y][coordSystemPos.x] = state.dragging || CELLS.NOTHING;
        // state.grid[coordSystemPos.y][coordSystemPos.x] =  ? CELLS.NOTHING : CELLS.WALL;
      }

      reset();
    }



    state.mousePos = mousePos;
  });


  mainLoop(ctx, canvas);
};


start();
