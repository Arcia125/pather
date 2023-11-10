
export type Position = {
  x: number;
  y: number;
};

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

const backtrace = (node: PathNode) => {
  const path: PathNode[] = [];
  let current = node;
  while (current.parent) {
    path.push(current);
    current = current.parent;
  }
  return path;
};

const getNeigbors = (node: PathNode, diagonal: boolean = false) => {
  const x = node.position.x;
  const y = node.position.y;
  let dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  if (diagonal) {
    dirs = dirs.concat([
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ]);
  }

  return dirs.map(dir => {
    return new PathNode(node, {
      x: x + dir.x,
      y: y + dir.y,
    });
  });
};

type HEURISTIC = (node: PathNode, endNode: PathNode) => number;

type IS_DONE = (node: PathNode, endNOde: PathNode) => boolean;

type WOULD_COLLIDE = (node: PathNode) => boolean;

export type FUNCTIONS = {
  HEURISTIC: HEURISTIC;
  IS_DONE: IS_DONE;
  WOULD_COLLIDE: WOULD_COLLIDE;
};

export const HEURISTIC_FUNCS: Record<'DEFAULT', FUNCTIONS['HEURISTIC']> = {
  DEFAULT: (node, endNode) => Math.abs(node.position.x - endNode.position.x) + Math.abs(node.position.y - endNode.position.y),
};

export const IS_DONE_FUNCS: Record<'DEFAULT', FUNCTIONS['IS_DONE']> = {
  DEFAULT: (node, endNode) => node.equals(endNode),
};

const DEFAULT_MAX_ITERATIONS = 99999;

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

export class AStar {

  /**
   * Open list of nodes to be checked
   */
  public possibleNodes: PathNode[] = [];
  /**
   * Closed list of nodes to be checked
   */
  public checkedNodes: PathNode[] = [];

  /**
   * Beginning node
   */
  public start: PathNode;
  /**
   * Destination node
   */
  public end: PathNode;

  public config: Required<AStarParams>;
  public constructor(config: AStarParams) {

    this.config = {
      ...config,
      heuristic: config.heuristic || HEURISTIC_FUNCS.DEFAULT,
      diagonal: config.diagonal || false,
      maxIterations: config.maxIterations || DEFAULT_MAX_ITERATIONS,
      isDone: config.isDone || IS_DONE_FUNCS.DEFAULT
    };

    this.start = new PathNode(null, config.startPos);
    this.end =  new PathNode(null, config.endPos);

    this.possibleNodes.push(this.start);
  }

  public findPath = () => {
    while (this.possibleNodes.length) {
      const solution = this.checkNode();
      if (solution?.path) {
        return solution.path;
      }
    }
  };

  private checkNode = () => {
    this.possibleNodes.sort((a, b) => b.f - a.f);
    const currentNode = this.possibleNodes.pop();
    if (!currentNode) {
      return;
    }
    this.checkedNodes.push(currentNode);

    if (this.config.isDone(currentNode, this.end)) {
      return {
        path: backtrace(currentNode).reverse(),
      };
    }

    const neighbors = getNeigbors(currentNode, this.config.diagonal);
    for (let neighbor of neighbors) {
      if (this.config.wouldCollide(neighbor)) {
        continue;
      }
      if (this.possibleNodes.filter(node => node.equals(neighbor)).length > 0) {
        continue;
      }
      if (this.checkedNodes.filter(node => node.equals(neighbor)).length > 0) {
        continue;
      }
      neighbor.g = currentNode.g + 1;
      neighbor.h = this.config.heuristic(neighbor, this.end);
      this.possibleNodes.push(neighbor);
    }
  };
}

export const findPath = (...args: ConstructorParameters<typeof AStar>) => {
  return new AStar(...args).findPath();
};
