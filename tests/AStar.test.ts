import { describe, expect, it } from 'vitest';
import { AStar, FUNCTIONS } from '../lib/AStar';
import { Position } from '../lib/models';

describe('AStar', () => {
  const grid = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const heuristic: FUNCTIONS['HEURISTIC'] = (node, endNode) =>
    Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y);

  const isDone: FUNCTIONS['IS_DONE'] = (node, endNode) => node.equals(endNode);

  const wouldCollide: FUNCTIONS['WOULD_COLLIDE'] = (node) => grid[node.y][node.x] === 1;

  const isOutOfBounds: FUNCTIONS['IS_OUT_OF_BOUNDS'] = (node) =>
    typeof grid?.[node.y]?.[node.x] === 'undefined';

  const start: Position = { x: 0, y: 0 };
  const end: Position = { x: 4, y: 4 };

  const aStarParamsDiagonal = {
    startPos: start,
    endPos: end,
    diagonal: true,
    wouldCollide,
    isOutOfBounds,
    isDone,
    heuristic,
  };

  const aStarParamsNoDiagonal = {
    startPos: start,
    endPos: end,
    diagonal: false,
    wouldCollide,
    isOutOfBounds,
    isDone,
    heuristic,
  };

const isAdjacent = (pos1: Position | undefined, pos2: Position, diagonal: boolean = false) => {
  if (!pos1) return;
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);

  if (diagonal) {
    return (dx <= 1 && dy <= 1) && (dx + dy > 0);
  } else {
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }
};


  it('should find a path with diagonal movement starting adjacent to the start and ending at the end', () => {
    const aStar = new AStar(aStarParamsDiagonal);
    const path = aStar.findPath();
    expect(path).toBeTruthy();
    expect(isAdjacent(path?.[0].position, start, true)).toBe(true);
    expect(path?.[path.length - 1].position).toEqual(end);
  });

  it('should find a path with no diagonal movement starting adjacent to the start and ending at the end', () => {
    const aStar = new AStar(aStarParamsNoDiagonal);
    const path = aStar.findPath();
    expect(path).toBeTruthy();
    expect(isAdjacent(path?.[0].position, start)).toBe(true);
    expect(path?.[path.length - 1].position).toEqual(end);
  });

  it('should generate path solutions with diagonal movement starting adjacent to the start and ending at the end', () => {
    const aStar = new AStar(aStarParamsDiagonal);
    const generator = aStar.findPathGen();
    let next = generator.next();
    let solution;
    while (!next.done) {
      if (next.value.solution) {
        solution = next.value.solution
      }
      next = generator.next();
    }
    const path = solution?.path;
    expect(path).toBeTruthy();
    expect(isAdjacent(path?.[0].position, start, true)).toBe(true);
    expect(path?.[path.length - 1].position).toEqual(end);
  });

  it('should generate path solutions with no diagonal movement starting adjacent to the start and ending at the end', () => {
    const aStar = new AStar(aStarParamsNoDiagonal);
    const generator = aStar.findPathGen();
    let next = generator.next();
    let solution;
    while (!next.done) {
      if (next.value.solution) {
        solution = next.value.solution
      }
      next = generator.next();
    }
    const path = solution?.path;
    expect(path).toBeTruthy();
    expect(isAdjacent(path?.[0].position, start)).toBe(true);
    expect(path?.[path.length - 1].position).toEqual(end);
  });
});
