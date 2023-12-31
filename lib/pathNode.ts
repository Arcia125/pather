import { Position } from './models';


export class PathNode {

  public static equals(nodeA: PathNode, nodeB: PathNode) {
    if (!nodeA.position || !nodeB.position) {
      return false;
    }
    return nodeA.x === nodeB.x && nodeA.y === nodeB.y;
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

  public get x() {
    return this.position.x;
  }

  public set x(value: number) {
    this.position.x = value;
  }

  public get y() {
    return this.position.y;
  }

  public set y(value: number) {
    this.position.y = value;
  }
}
