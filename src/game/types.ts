export type Cell = '*' | 'l' | 'r' | 'd';
export type Player = 'l' | 'r';
export type Coords = [row: number, col: number];
export type Field = Cell[][];

export type GameMode = 'pvp' | 'ai';

export interface GameState {
  field: Field;
  numField: number[][];
  currentPlayer: Player;
  steps: Coords[];
  allowedStepsByStep: number[];
  isDrawing: boolean;
  winner: Player | null;
  mode: GameMode;
}

export const BOARD_SIZE = 5;
export const DELAY_TIME = 10;

export function createEmptyField(size = BOARD_SIZE): Field {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => '*' as Cell),
  );
}

export function createNumField(size = BOARD_SIZE): number[][] {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => row * size + col),
  );
}

export function createInitialState(mode: GameMode = 'pvp'): GameState {
  const field = createEmptyField();
  setDisabledBlocks(field, randomInt(5, 10));

  return {
    field,
    numField: createNumField(),
    currentPlayer: 'l',
    steps: [],
    allowedStepsByStep: [],
    isDrawing: false,
    winner: null,
    mode,
  };
}

export function randomInt(min: number, max: number): number {
  return min + Math.floor((max - min) * Math.random());
}

export function setDisabledBlocks(field: Field, count: number): void {
  for (let i = 0; i < count; i++) {
    const x = randomInt(0, field.length);
    const y = randomInt(0, field.length);
    field[x][y] = 'd';
  }
}
