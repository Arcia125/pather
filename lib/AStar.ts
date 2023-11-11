import { backtrace, getNeigbors } from './utils';
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
  isOutOfBounds: FUNCTIONS['IS_OUT_OF_BOUNDS'];
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
  public possibleNodes: PathNode[];
  /**
   * Closed list of nodes to be checked
   */
  public checkedNodes: PathNode[];

  /**
   * Beginning node
   */
  public start: PathNode;
  /**
   * Destination node
   */
  public end: PathNode;

  private iterations: number;

  public config: Required<AStarParams>;
  public constructor(config: AStarParams) {
    this.config = {
      ...config,
      heuristic: config.heuristic || HEURISTIC_FUNCS.DEFAULT,
      diagonal: config.diagonal || false,
      maxIterations: config.maxIterations || DEFAULT_MAX_ITERATIONS,
      isDone: config.isDone || IS_DONE_FUNCS.DEFAULT
    };

    const { start, end, iterations, possibleNodes, checkedNodes } = this.initialState();
    this.possibleNodes = possibleNodes;
    this.checkedNodes = checkedNodes;
    this.start = start;
    this.end = end;
    this.iterations = iterations;
  }

  private initialState = () => {
    const iterations = 0;
    const start = new PathNode(null, this.config.startPos);
    const end = new PathNode(null, this.config.endPos);
    const possibleNodes: PathNode[] = [];
    const checkedNodes: PathNode[] = [];
    possibleNodes.push(this.start);
    return {
      iterations,
      start,
      end,
      possibleNodes,
      checkedNodes
    }
  };

  public findPath = () => {
    if (this.iterations !== 0) {
      const { start, end, iterations, possibleNodes, checkedNodes } = this.initialState();
      this.possibleNodes = possibleNodes;
      this.checkedNodes = checkedNodes;
      this.start = start;
      this.end = end;
      this.iterations = iterations;
    }
    while (this.possibleNodes.length) {
      if (this.iterations >= this.config.maxIterations) {
        return;
      }
      const solution = this.checkNode();
      if (solution?.path) {
        return solution.path;
      }
      this.iterations++;
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
      if (this.config.isOutOfBounds(neighbor)) {
        continue;
      }
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
