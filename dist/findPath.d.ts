export declare const findPath: (config: {
    startPos: import("./models").Position;
    endPos: import("./models").Position;
    diagonal?: boolean | undefined;
    maxIterations?: number | undefined;
    wouldCollide: (node: import("./pathNode").PathNode) => boolean;
    isDone?: ((node: import("./pathNode").PathNode, endNode: import("./pathNode").PathNode) => boolean) | undefined;
    heuristic?: ((node: import("./pathNode").PathNode, endNode: import("./pathNode").PathNode) => number) | undefined;
}) => import("./pathNode").PathNode[] | undefined;
