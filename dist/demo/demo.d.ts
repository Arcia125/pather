import { AStar } from '../AStar';
import { PathNode } from '../pathNode';
import { CELLS } from './constants';
import { Position } from '../models';
declare const time: {
    lastFrameTimeMs: number;
    maxFPS: number;
    frameID: number;
    stepID: number;
    delta: number;
    framesThisSecond: number;
    lastFpsUpdate: number;
    fps: number;
    resetDeltaCount: number;
    timeStep: number;
};
export declare const state: {
    time: typeof time;
    running: boolean;
    path?: PathNode[] | undefined;
    pathIndex: number;
    speed: number;
    diagonal: boolean;
    placing: typeof CELLS[keyof typeof CELLS];
    grid: number[][];
    mousePos: Position;
};
declare let gen: Generator<{
    solution: {
        path: PathNode[];
    } | undefined;
    aStar: AStar;
}, void, unknown>;
export declare let search: ReturnType<typeof gen.next>;
export {};
