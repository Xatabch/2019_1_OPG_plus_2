import {
  canSetField,
  matrixCopy,
  processPointerDown,
  processPointerMove,
  syncStepsWithField,
} from './engine';
import type { Coords, Field, GameState, Player } from './types';
import { BOARD_SIZE, randomInt, setDisabledBlocks } from './types';

function countEmptyCells(field: Field): number {
  return field.flat().filter((cell) => cell === '*').length;
}

function getAllValidMoves(field: Field, player: Player): Coords[][] {
  const moves: Coords[][] = [];
  const size = field.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const start: Coords = [row, col];
      if (!canSetField(start, field)) continue;

      for (let r2 = 0; r2 < size; r2++) {
        for (let c2 = 0; c2 < size; c2++) {
          if (row === r2 && col === c2) continue;
          const end: Coords = [r2, c2];
          if (!canSetField(end, field)) continue;

          const isHorizontal = row === r2;
          const isVertical = col === c2;
          if (!isHorizontal && !isVertical) continue;

          let state = { field: matrixCopy(field), currentPlayer: player, steps: [] as Coords[] };
          const startNum = row * size + col;
          const down = processPointerDown(startNum, state, size);
          state = { ...state, ...down };

          const endNum = r2 * size + c2;
          const moved = processPointerMove(endNum, { ...state, allowedStepsByStep: [], numField: createNumField(size) }, size);

          if (moved.steps.length >= 2) {
            moves.push(moved.steps);
          }
        }
      }
    }
  }

  return moves;
}

function createNumField(size: number): number[][] {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => row * size + col),
  );
}

function simulateMove(field: Field, steps: Coords[], player: Player): Field {
  return syncStepsWithField(steps, matrixCopy(field), player);
}

function scoreMove(field: Field, steps: Coords[], player: Player): number {
  const result = simulateMove(field, steps, player);
  const captured = steps.length;
  const remaining = countEmptyCells(result);
  const opponent: Player = player === 'l' ? 'r' : 'l';

  let score = captured * 10;

  if (remaining === 0) {
    score += 1000;
  }

  const opponentMoves = getAllValidMoves(result, opponent);
  score -= opponentMoves.length * 2;

  return score;
}

export function findBestAiMove(field: Field, player: Player = 'r'): Coords[] | null {
  const moves = getAllValidMoves(field, player);
  if (moves.length === 0) return null;

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const score = scoreMove(field, move, player);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export function applyAiMove(state: GameState): GameState {
  const move = findBestAiMove(state.field, 'r');
  if (!move || move.length === 0) return state;

  const field = syncStepsWithField(move, matrixCopy(state.field), 'r');

  return {
    ...state,
    field,
    steps: [],
    allowedStepsByStep: [],
    isDrawing: false,
    currentPlayer: 'r',
  };
}

export function resetFieldWithDisabled(): Field {
  const field = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => '*' as const),
  );
  setDisabledBlocks(field, randomInt(5, 10));
  return field;
}
