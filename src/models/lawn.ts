export enum GrassState {
  Regular = 1,
  Mowed = 0,
}

export type Lawn = GrassState[][];

export function createLawn(maxX: number, maxY: number): Lawn {
  return Array.from({ length: maxY + 1 }, () =>
    Array(maxX + 1).fill(GrassState.Regular)
  );
}
