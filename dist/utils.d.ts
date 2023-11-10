import { PathNode } from './pathNode';
export declare const backtrace: (node: PathNode) => PathNode[];
export declare const getNeigbors: (node: PathNode, diagonal?: boolean) => PathNode[];
