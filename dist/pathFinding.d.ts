export type Position = {
    x: number;
    y: number;
};
export declare class PathNode {
    parent: PathNode | null;
    position: Position;
    static equals(nodeA: PathNode, nodeB: PathNode): boolean;
    /**
     * movement cost to move from the starting point to this node
     */
    g: number;
    /**
     * estimated movement cost  to move from this node to the end
     */
    h: number;
    constructor(parent: PathNode | null, position: Position);
    equals: (node: PathNode) => boolean;
    /**
     * total cost (g + h)
     */
    get f(): number;
}
type HEURISTIC = (node: PathNode, endNode: PathNode) => number;
type IS_DONE = (node: PathNode, endNOde: PathNode) => boolean;
type WOULD_COLLIDE = (node: PathNode) => boolean;
export type FUNCTIONS = {
    HEURISTIC: HEURISTIC;
    IS_DONE: IS_DONE;
    WOULD_COLLIDE: WOULD_COLLIDE;
};
export declare const HEURISTIC_FUNCS: Record<'DEFAULT', FUNCTIONS['HEURISTIC']>;
export declare const IS_DONE_FUNCS: Record<'DEFAULT', FUNCTIONS['IS_DONE']>;
type AStarParams = {
    startPos: Position;
    endPos: Position;
    diagonal?: boolean;
    maxIterations?: number;
    wouldCollide: FUNCTIONS['WOULD_COLLIDE'];
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
    config: Required<AStarParams>;
    constructor(config: AStarParams);
    findPath: () => PathNode[] | undefined;
    private checkNode;
}
export declare const findPath: (config: AStarParams) => PathNode[] | undefined;
export {};
