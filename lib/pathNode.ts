import { Position } from './models';


export class PathNode {

  public static equals(nodeA: PathNode, nodeB: PathNode) {
    if (!nodeA.position || !nodeB.position) {
      return false;
    }
    return nodeA.position?.x === nodeB.position?.x && nodeA.position?.y === nodeB.position?.y;
  }

  /**
   * movement cost to move from the starting point to this node
   */
  public g = 0;
  /**
   * estimated movement cost  to move from this node to the end
   */
  public h = 0;

  public constructor(public parent: PathNode | null = null, public position: Position) {
  }

  public equals = (node: PathNode) => PathNode.equals(this, node);

  /**
   * total cost (g + h)
   */
  public get f() {
    return this.g + this.h;
  }
}
