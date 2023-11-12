

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

  const aStarParams = {
    startPos: start,
    endPos: end,
    diagonal: true,
    wouldCollide,
    isOutOfBounds,
    isDone,
    heuristic,
  };

  it('should find a path', () => {
    const aStar = new AStar(aStarParams);
    const path = aStar.findPath();
    expect(path).toBeTruthy();
  });

  it('should generate path solutions using generator', () => {
    const aStar = new AStar(aStarParams);
    const generator = aStar.findPathGen();
    let next = generator.next();
    while (!next.done) {
      const solution = next.value;
      expect(solution).toBeTruthy();
      expect(solution.aStar).toBeInstanceOf(AStar);
      next = generator.next();
    }
  });

  it('should return undefined if no path is found', () => {
    const invalidParams = { ...aStarParams, endPos: { x: 10, y: 10 } };
    const aStar = new AStar(invalidParams);
    const path = aStar.findPath();
    expect(path).toBeUndefined();
  });

  it('should handle custom heuristic and isDone functions', () => {
    const customParams = {
      ...aStarParams,
      heuristic: (node, endNode) => 2 * heuristic(node, endNode),
      isDone: (node, endNode) => !isDone(node, endNode),
    };
    const aStar = new AStar(customParams);
    const path = aStar.findPath();
    expect(path).toBeTruthy();
  });
});
