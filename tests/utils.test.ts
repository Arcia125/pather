import { describe, expect, it } from 'vitest';
import { backtrace, getNeigbors } from '../lib/utils';
import { PathNode } from '../lib/pathNode';

describe('backtrace', () => {
  it('should backtrace correctly', () => {
    // Create a simple path for testing
    const startNode = new PathNode(null, { x: 0, y: 0 });
    const middleNode = new PathNode(startNode, { x: 1, y: 1 });
    const endNode = new PathNode(middleNode, { x: 2, y: 2 });

    const path = backtrace(endNode);

    expect(path).toHaveLength(2); // The path should have two nodes excluding the endNode
    expect(path[0]).toEqual(endNode);
    expect(path[1]).toEqual(middleNode);
  });

  it('should return an empty array for a node without a parent', () => {
    const node = new PathNode(null, { x: 0, y: 0 });
    const path = backtrace(node);

    expect(path).toHaveLength(0);
  });
});

describe('getNeigbors', () => {
  it('should get neighbors without diagonal movement', () => {
    const node = new PathNode(null, { x: 1, y: 1 });
    const neighbors = getNeigbors(node);

    expect(neighbors).toHaveLength(4); // Four neighbors without diagonal movement
    expect(neighbors.some((neighbor) => neighbor.x === 0 && neighbor.y === 1)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 2 && neighbor.y === 1)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 1 && neighbor.y === 0)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 1 && neighbor.y === 2)).toBeTruthy();
  });

  it('should get neighbors with diagonal movement', () => {
    const node = new PathNode(null, { x: 1, y: 1 });
    const neighbors = getNeigbors(node, true);

    expect(neighbors).toHaveLength(8); // Eight neighbors with diagonal movement
    expect(neighbors.some((neighbor) => neighbor.x === 0 && neighbor.y === 1)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 2 && neighbor.y === 1)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 1 && neighbor.y === 0)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 1 && neighbor.y === 2)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 0 && neighbor.y === 0)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 2 && neighbor.y === 0)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 0 && neighbor.y === 2)).toBeTruthy();
    expect(neighbors.some((neighbor) => neighbor.x === 2 && neighbor.y === 2)).toBeTruthy();
  });
});
