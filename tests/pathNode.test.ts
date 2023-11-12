import { describe, expect, it } from 'vitest';
import { PathNode } from '../lib/pathNode'; // Update the import path as needed
import { Position } from '../lib/models'; // Update the import path as needed

describe('PathNode', () => {
  const positionA: Position = { x: 1, y: 2 };
  const positionB: Position = { x: 3, y: 4 };

  it('should create a PathNode with parent and position', () => {
    const parent = new PathNode(null, positionA);
    const node = new PathNode(parent, positionB);

    expect(node.parent).toBe(parent);
    expect(node.position).toBe(positionB);
  });

  it('should calculate the correct total cost (f)', () => {
    const node = new PathNode(null, positionA);
    node.g = 5;
    node.h = 10;

    expect(node.f).toBe(15);
  });

  it('should check equality between two nodes correctly', () => {
    const nodeA = new PathNode(null, positionA);
    const nodeB = new PathNode(null, positionA);
    const nodeC = new PathNode(null, positionB);

    expect(PathNode.equals(nodeA, nodeB)).toBe(true);
    expect(PathNode.equals(nodeA, nodeC)).toBe(false);
  });

  it('should get and set x and y values correctly', () => {
    const node = new PathNode(null, positionA);

    expect(node.x).toBe(1);
    expect(node.y).toBe(2);

    node.x = 3;
    node.y = 4;

    expect(node.position).toEqual({ x: 3, y: 4 });
  });
});
