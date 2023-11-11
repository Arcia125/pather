import { Position } from './models';
import { PathNode } from './pathNode';
type HEURISTIC = (node: PathNode, endNode: PathNode) => number;
type IS_DONE = (node: PathNode, endNode: PathNode) => boolean;
type WOULD_COLLIDE = (node: PathNode) => boolean;
type IS_OUT_OF_BOUNDS = (node: PathNode) => boolean;
export type FUNCTIONS = {
    HEURISTIC: HEURISTIC;
    IS_DONE: IS_DONE;
    WOULD_COLLIDE: WOULD_COLLIDE;
    IS_OUT_OF_BOUNDS: IS_OUT_OF_BOUNDS;
};
export declare const HEURISTIC_FUNCS: Record<'DEFAULT', FUNCTIONS['HEURISTIC']>;
export declare const IS_DONE_FUNCS: Record<'DEFAULT', FUNCTIONS['IS_DONE']>;
type AStarParams = {
    startPos: Position;
    endPos: Position;
    diagonal?: boolean;
    maxIterations?: number;
    wouldCollide: FUNCTIONS['WOULD_COLLIDE'];
    isOutOfBounds: FUNCTIONS['IS_OUT_OF_BOUNDS'];
    isDone?: FUNCTIONS['IS_DONE'];
    heuristic?: FUNCTIONS['HEURISTIC'];
};
type Required<Type> = {
    [Property in keyof Type]-?: Type[Property];
};
export declare class AStar {
    /**
     * Open list of nodes to be checked
     */
    possibleNodes: PathNode[];
    /**
     * Closed list of nodes to be checked
     */
    checkedNodes: PathNode[];
    /**
     * Beginning node
     */
    start: PathNode;
    /**
     * Destination node
     */
    end: PathNode;
    private iterations;
    config: Required<AStarParams>;
    constructor(config: AStarParams);
    private initialState;
    findPath: () => PathNode[] | undefined;
    private checkNode;
}
export {};
