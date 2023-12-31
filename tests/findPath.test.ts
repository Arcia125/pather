import { describe, expect, it } from 'vitest';
import { findPath } from '../lib/findPath';
import { FUNCTIONS } from '../lib/AStar';
import { Position } from '../lib/models';

describe('findPath', () => {
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

  it('should find a path using findPath function', () => {
    const path = findPath(aStarParams);
    expect(path).toBeTruthy();
  });

  it('should return undefined if no path is found', () => {
    const invalidParams = { ...aStarParams, endPos: { x: 10, y: 10 } };
    const path = findPath(invalidParams);
    expect(path).toBeUndefined();
  });
});
