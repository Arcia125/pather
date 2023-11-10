import { AStar } from './AStar';

export const findPath = (...args: ConstructorParameters<typeof AStar>) => {
  return new AStar(...args).findPath();
};
