# Pather

Pather is a typed pathfinding library designed for 2D games that eliminates the need for a matrix or grid input.

## Demo
To view the interactive demo visit: https://arcia125.github.io/pather/
or run the following command to view it locally:
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

## Features

- **Matrix-Free Pathfinding**: Pather simplifies pathfinding in 2D games by eliminating the need for a matrix or grid input.

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

#### Returns

- An array of `Position` representing the path if found.
- `undefined` if no path is found.

## Installation

To use Pather in your project, install it via npm:

```bash
npm install @arcia125/pather
```

## License

Pather is open-source software licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
