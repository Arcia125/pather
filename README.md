![alt text](https://github.com/Arcia125/pather/blob/master/pather-image.png?raw=true)
# Pather

Pather is a versatile and typed pathfinding library designed for 2D games, offering the convenience of pathfinding without the need for a matrix or grid input.

## Demo
Explore the interactive demo on the [Pather Demo Page](https://arcia125.github.io/pather/) or run the following command to experience it locally:
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
  // diagonal?: true,
  // heuristic?: (node, endNode) => number,
  // isDone?: (node, endNode) => boolean,
  wouldCollide: (node) => grid[node.y][node.x] === 1,
  isOutOfBounds: (node) => typeof (grid?.[node.y]?.[node.x]) === 'undefined',
});
```

## Features

- **Matrix-Free Pathfinding**: Pather simplifies pathfinding in 2D games by eliminating the need for a matrix or grid input.
- **Interactive Demo**: Visualize and experiment with Pather's capabilities through the [online demo](https://arcia125.github.io/pather/).

## API

### `findPath(options: PathOptions): Position[] | undefined`

Finds the path between the start and end positions based on the specified options.

#### Parameters

- `options`: PathOptions - Configuration options for pathfinding.
  - `startPos`: Initial position on the grid.
  - `endPos`: Target position on the grid.
  - `diagonal`: (Optional) Whether diagonal movement is allowed.
  - `wouldCollide`: Function to check if a node would collide with obstacles.
  - `isOutOfBounds`: Function to check if a node is out of bounds.
  - `heuristic`: (Optional) Custom heuristic function for path evaluation.
  - `isDone`: (Optional) Custom function to check if the destination is reached.

#### Returns

- An array of `Position` representing the path if found.
- `undefined` if no path is found.

## Installation

To integrate Pather into your project, install it via npm:

```bash
npm install @arcia125/pather
```

## License

Pather is open-source software licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for details.
