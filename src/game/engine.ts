import { getCol, isDiagonal } from './matrix';
import type { Coords, Field, Player } from './types';
import { BOARD_SIZE } from './types';

function copySteps(steps: Coords[]): Coords[] {
  return steps.map(([x, y]) => [x, y]);
}

export function getAllowedStepsArrayByStep(
  steps: Coords[],
  numBlock: number,
  field: number[][],
  blockFromCoordsFn: (coords: Coords, numBlock: number) => number,
  getColFn: typeof getCol,
  getNeighborsFn: typeof getNeighbors,
): number[] {
  if (steps.length > 1) {
    const diff =
      blockFromCoordsFn(steps[1], numBlock) - blockFromCoordsFn(steps[0], numBlock);
    if (Math.abs(diff) === 1) {
      const [allowedRow] = steps[0];
      return field[allowedRow];
    }
    if (Math.abs(diff) === numBlock) {
      const [, allowedCol] = steps[0];
      return getColFn(field, allowedCol);
    }
  } else if (steps.length === 1) {
    const [x, y] = steps[0];
    return getNeighborsFn(field, x, y);
  }
  return [];
}

export function getNeighbors(matrix: number[][], rowNumber: number, columnNumber: number): number[] {
  const top = matrix[rowNumber - 1]?.[columnNumber];
  const left = matrix[rowNumber]?.[columnNumber + 1];
  const down = matrix[rowNumber + 1]?.[columnNumber];
  const right = matrix[rowNumber]?.[columnNumber - 1];
  const blocks: number[] = [];

  [top, left, down, right].forEach((block) => {
    if (block !== undefined) {
      blocks.push(block);
    }
  });

  return blocks;
}

export function hasWinner(field: Field): boolean {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === '*') {
        return false;
      }
    }
  }
  return true;
}

export function getBlock(block: string | number): number {
  return parseInt(String(block), 10);
}

export function getBlockNumFromEvent(event: PointerEvent): string | undefined {
  const target = event.target as HTMLElement;
  return target.dataset.num;
}

export function getCoords(intNumBlock: number | string, numBlock: number): Coords {
  const n = typeof intNumBlock === 'string' ? parseInt(intNumBlock, 10) : intNumBlock;
  const x = Math.floor(n / numBlock);
  const y = Math.floor(n % numBlock);

  if (x >= numBlock || y >= numBlock) {
    return [-1, -1];
  }
  return [x, y];
}

export function blockFromCoords(blockCoords: Coords, numBlock: number): number {
  const [x, y] = blockCoords;
  return x * numBlock + y;
}

export function isRepeat(blockCoords: Coords, steps: Coords[]): boolean {
  for (let i = 0; i < steps.length; i++) {
    const [x1, y1] = steps[i];
    const [x2, y2] = blockCoords;
    if (x1 === x2 && y1 === y2) {
      return true;
    }
  }
  return false;
}

export function isAllowedStepsByStep(
  blockCoords: Coords,
  numBlock: number,
  blockFromCoordsFn: (coords: Coords, numBlock: number) => number,
  allowedStepsByStep: number[],
): boolean {
  const block = blockFromCoordsFn(blockCoords, numBlock);
  return allowedStepsByStep.includes(block);
}

export function canSetField(blockCoords: Coords, field: Field): boolean {
  const [x, y] = blockCoords;
  return x >= 0 && y >= 0 && field[x][y] === '*';
}

export function canSetStep(
  repeat: boolean,
  allowed: boolean,
  allowedStepsByStep: number[],
  diagonal?: boolean,
): boolean {
  if (allowedStepsByStep.length) {
    return !repeat && allowed;
  }
  return !repeat && !diagonal;
}

export function setStep(
  blockCoords: Coords,
  stepsCopy: Coords[],
  canSetFieldResult: boolean,
  canSetStepResult: boolean,
): Coords[] {
  if (canSetFieldResult && canSetStepResult) {
    stepsCopy.push(blockCoords);
  }
  return stepsCopy;
}

export function matrixCopy<T>(matrix: T[][]): T[][] {
  return matrix.map((row) => [...row]);
}

export function syncStepsWithField(
  steps: Coords[],
  fieldCopy: Field,
  playerStep: Player,
): Field {
  steps.forEach((step) => {
    const [x, y] = step;
    fieldCopy[x][y] = playerStep;
  });
  return fieldCopy;
}

export function convert<T, R>(
  steps: T[],
  numBlock: number,
  convertFn: (step: T, numBlock: number) => R,
): R[] {
  return steps.map((step) => convertFn(step, numBlock));
}

export function getConsistentSteps(steps: number[], numBlock: number): number[] {
  if (steps.length < 2 || Math.abs(steps[1] - steps[0]) < 0) {
    return steps;
  }

  const isYMove = Math.abs(steps[1] - steps[0]) >= numBlock;
  const isXMove = Math.abs(steps[1] - steps[0]) >= 1;
  const stepsCopy = [...steps].sort((a, b) => a - b);

  if (isYMove) {
    return stepsCopy.reduce<number[]>((fullArray, _, i) => {
      fullArray.push(stepsCopy[i]);
      const diff = Math.abs(stepsCopy[i] - stepsCopy[i + 1]) >= numBlock;
      if (stepsCopy[i + 1] !== undefined && diff) {
        for (let j = stepsCopy[i] + numBlock; j < stepsCopy[i + 1]; j += numBlock) {
          fullArray.push(j);
        }
      }
      return fullArray;
    }, []);
  }

  if (isXMove) {
    return stepsCopy.reduce<number[]>((fullArray, _, i) => {
      fullArray.push(stepsCopy[i]);
      const diff = Math.abs(stepsCopy[i] - stepsCopy[i + 1]) >= 2;
      if (stepsCopy[i + 1] !== undefined && diff) {
        for (let j = stepsCopy[i] + 1; j < stepsCopy[i + 1]; j++) {
          fullArray.push(j);
        }
      }
      return fullArray;
    }, []);
  }

  return steps;
}

export function getCross(
  allowedStepsByStepCoords: Coords[],
  field: Field,
  playerStep: Player,
  isFirstStep = false,
): Coords[] {
  const enemyStep: Player = playerStep === 'l' ? 'r' : 'l';
  let playerStepIndex = -1;
  let enemyStepIndex = -1;

  if (isFirstStep) {
    return allowedStepsByStepCoords.filter((step) => {
      const [x, y] = step;
      return field[x][y] === '*';
    });
  }

  allowedStepsByStepCoords.forEach((step, i) => {
    const [x, y] = step;
    if (x >= 0 && y >= 0) {
      if (field[x][y] === playerStep && playerStepIndex < 0) {
        playerStepIndex = i;
      } else if (
        (field[x][y] === enemyStep || field[x][y] === 'd') &&
        enemyStepIndex < 0
      ) {
        enemyStepIndex = i;
      }
    }
  });

  if (playerStepIndex >= 0 && enemyStepIndex >= 0) {
    if (playerStepIndex < enemyStepIndex) {
      return allowedStepsByStepCoords.slice(0, enemyStepIndex);
    }
    if (playerStepIndex > enemyStepIndex) {
      return allowedStepsByStepCoords.slice(
        playerStepIndex - 1,
        allowedStepsByStepCoords.length,
      );
    }
  }

  return allowedStepsByStepCoords;
}

export function processPointerMove(
  blockNum: number,
  state: {
    field: Field;
    numField: number[][];
    currentPlayer: Player;
    steps: Coords[];
    allowedStepsByStep: number[];
  },
  numBlock = BOARD_SIZE,
): { field: Field; steps: Coords[]; allowedStepsByStep: number[] } {
  const blockCoords = getCoords(blockNum, numBlock);

  let allowedStepsByStep = [...state.allowedStepsByStep];
  allowedStepsByStep = convert(
    getCross(
      convert(
        getAllowedStepsArrayByStep(
          state.steps,
          numBlock,
          state.numField,
          blockFromCoords,
          getCol,
          getNeighbors,
        ),
        numBlock,
        getCoords,
      ),
      state.field,
      state.currentPlayer,
    ),
    numBlock,
    blockFromCoords,
  );

  const consistSteps = getConsistentSteps(
    convert(
      setStep(
        blockCoords,
        copySteps(state.steps),
        canSetField(blockCoords, state.field),
        canSetStep(
          isRepeat(blockCoords, state.steps),
          isAllowedStepsByStep(blockCoords, numBlock, blockFromCoords, allowedStepsByStep),
          allowedStepsByStep,
          state.steps.length > 0
            ? isDiagonal(blockCoords, state.steps[0])
            : false,
        ),
      ),
      numBlock,
      blockFromCoords,
    ),
    numBlock,
  );

  const steps = convert(consistSteps, numBlock, getCoords);
  const field = syncStepsWithField(steps, matrixCopy(state.field), state.currentPlayer);

  return { field, steps, allowedStepsByStep };
}

export function processPointerDown(
  blockNum: number,
  state: {
    field: Field;
    currentPlayer: Player;
    steps: Coords[];
  },
  numBlock = BOARD_SIZE,
): { field: Field; steps: Coords[] } {
  const blockCoords = getCoords(blockNum, numBlock);
  const steps = setStep(
    blockCoords,
    copySteps(state.steps),
    canSetField(blockCoords, state.field),
    canSetStep(isRepeat(blockCoords, state.steps), false, []),
  );
  const field = syncStepsWithField(steps, matrixCopy(state.field), state.currentPlayer);
  return { field, steps };
}

export function finishTurn(state: {
  field: Field;
  currentPlayer: Player;
}): {
  winner: Player | null;
  nextPlayer: Player;
  resetField: boolean;
} {
  if (hasWinner(state.field)) {
    const winner: Player = state.currentPlayer === 'l' ? 'r' : 'l';
    return { winner, nextPlayer: 'l', resetField: true };
  }
  return {
    winner: null,
    nextPlayer: state.currentPlayer === 'l' ? 'r' : 'l',
    resetField: false,
  };
}
