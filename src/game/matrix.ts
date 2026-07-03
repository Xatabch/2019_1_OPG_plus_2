import type { Coords } from './types';

export function getCol<T>(matrix: T[][], col: number): T[] {
  const column: T[] = [];
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][col]) {
      column.push(matrix[i][col]);
    }
  }
  return column;
}

export function isDiagonal(blockCoords: Coords, startBlockCoords: Coords): boolean {
  const [x, y] = blockCoords;
  const [xStartPoint, yStartPoint] = startBlockCoords;
  return !!((xStartPoint - x) && (yStartPoint - y));
}
