# Pather

A typed pathfinding library for 2D games that doesn't need a matrix or grid input.

## Demo
Run the following command to view the interactive demo
```bash
npm run dev
```

## Usage

```js
import { findPath } from '@arcia125/pather';

const grid = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

findPath({
  startPos: { x: 0, y: 0 },
  endPos: { x: 4, y: 4 },
  // diagonal: true,
  wouldCollide: (node) => grid[node.y][node.x] === 1,
  isOutOfBounds: (node) => typeof (grid?.[node.y]?.[node.x]) === 'undefined',
});

```
