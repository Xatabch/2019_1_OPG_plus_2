import { describe, expect, it } from 'vitest';
import { applyAiMove, findBestAiMove } from './ai';
import { createEmptyField, createInitialState } from './types';

describe('ai', () => {
  it('finds a valid move on a fresh board', () => {
    const field = createEmptyField();
    const move = findBestAiMove(field, 'r');
    expect(move).not.toBeNull();
    expect(move!.length).toBeGreaterThanOrEqual(2);
  });

  it('returns null when no moves are available', () => {
    const field = createEmptyField();
    for (let r = 0; r < field.length; r++) {
      for (let c = 0; c < field[r].length; c++) {
        field[r][c] = 'd';
      }
    }
    expect(findBestAiMove(field, 'r')).toBeNull();
  });

  it('applies an AI move and keeps game state consistent', () => {
    const state = createInitialState('ai');
    const afterMove = applyAiMove(state);
    expect(afterMove.currentPlayer).toBe('r');
    expect(afterMove.isDrawing).toBe(false);
    expect(afterMove.steps).toHaveLength(0);
  });
});
