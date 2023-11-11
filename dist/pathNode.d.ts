import { Position } from './models';
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
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
}
