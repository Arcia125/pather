import { test, expect } from 'vitest';
import { findPath } from '../lib/findPath';

test('Finds a path correctly', () => {
  const testGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]
  const path = findPath({
    startPos: { x: 1, y: 1 },
    endPos: { x: 3, y: 3 },
    isOutOfBounds: (node) => typeof (testGrid?.[node.position.y]?.[node.position.x]) === 'undefined',
    wouldCollide: (node) => testGrid[node.position.y][node.position.x] === 1,
  });

  expect(path?.[0].position).toStrictEqual({ x: 2, y: 1 });
  expect(path?.[3].position).toStrictEqual({ x: 3, y: 3 });
});
