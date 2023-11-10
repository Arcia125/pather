import { PathNode } from './pathNode';

export const backtrace = (node: PathNode) => {
  const path: PathNode[] = [];
  let current = node;
  while (current.parent) {
    path.push(current);
    current = current.parent;
  }
  return path;
};

export const getNeigbors = (node: PathNode, diagonal: boolean = false) => {
  const x = node.position.x;
  const y = node.position.y;
  let dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  if (diagonal) {
    dirs = dirs.concat([
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ]);
  }

  return dirs.map(dir => {
    return new PathNode(node, {
      x: x + dir.x,
      y: y + dir.y,
    });
  });
};
