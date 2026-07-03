import { describe, expect, it } from 'vitest';
import {
  blockFromCoords,
  canSetField,
  finishTurn,
  getCoords,
  hasWinner,
  processPointerDown,
  syncStepsWithField,
} from './engine';
import { BOARD_SIZE, createEmptyField, createInitialState } from './types';

describe('engine', () => {
  describe('hasWinner', () => {
    it('returns false when empty cells remain', () => {
      const field = createEmptyField();
      expect(hasWinner(field)).toBe(false);
    });

    it('returns true when no empty cells remain', () => {
      const field = createEmptyField();
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          field[r][c] = r % 2 === 0 ? 'l' : 'r';
        }
      }
      expect(hasWinner(field)).toBe(true);
    });
  });

  describe('canSetField', () => {
    it('allows placing on empty cells', () => {
      expect(canSetField([0, 0], createEmptyField())).toBe(true);
    });

    it('rejects disabled cells', () => {
      const field = createEmptyField();
      field[0][0] = 'd';
      expect(canSetField([0, 0], field)).toBe(false);
    });
  });

  describe('getCoords / blockFromCoords', () => {
    it('roundtrips block numbers', () => {
      for (let n = 0; n < BOARD_SIZE * BOARD_SIZE; n++) {
        const coords = getCoords(n, BOARD_SIZE);
        expect(blockFromCoords(coords, BOARD_SIZE)).toBe(n);
      }
    });
  });

  describe('processPointerDown', () => {
    it('starts a move on an empty cell', () => {
      const field = createEmptyField();
      const state = {
        field,
        currentPlayer: 'l' as const,
        steps: [] as [number, number][],
      };
      const blockNum = 0;
      const { steps, field: nextField } = processPointerDown(blockNum, state, BOARD_SIZE);
      expect(steps).toHaveLength(1);
      expect(nextField[0][0]).toBe('l');
    });
  });

  describe('syncStepsWithField', () => {
    it('fills cells for the given player', () => {
      const field = createEmptyField();
      const result = syncStepsWithField(
        [
          [0, 0],
          [0, 1],
        ],
        field,
        'r',
      );
      expect(result[0][0]).toBe('r');
      expect(result[0][1]).toBe('r');
    });
  });

  describe('finishTurn', () => {
    it('detects winner when board is full', () => {
      const field = createEmptyField();
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          field[r][c] = 'l';
        }
      }
      const result = finishTurn({ field, currentPlayer: 'l' });
      expect(result.winner).toBe('r');
      expect(result.resetField).toBe(true);
    });

    it('switches player when game continues', () => {
      const state = createInitialState('pvp');
      const result = finishTurn(state);
      expect(result.winner).toBeNull();
      expect(result.nextPlayer).toBe('r');
    });
  });
});
