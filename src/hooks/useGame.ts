import { useCallback, useEffect, useReducer } from 'react';
import { applyAiMove } from '../game/ai';
import {
  finishTurn,
  getBlock,
  getBlockNumFromEvent,
  processPointerDown,
  processPointerMove,
} from '../game/engine';
import { clearGameState, loadGameState, saveGameState } from '../game/storage';
import type { GameMode, GameState, Player } from '../game/types';
import { BOARD_SIZE, createInitialState, DELAY_TIME } from '../game/types';
import { debounce } from '../lib/debounce';

type GameAction =
  | { type: 'POINTER_DOWN'; event: PointerEvent }
  | { type: 'POINTER_MOVE'; event: PointerEvent }
  | { type: 'POINTER_UP' }
  | { type: 'NEW_GAME'; mode?: GameMode }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'AI_TURN' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'POINTER_DOWN': {
      const blockNumStr = getBlockNumFromEvent(action.event);
      if (!blockNumStr || blockNumStr === '-1') return state;

      const blockNum = getBlock(blockNumStr);
      const { field, steps } = processPointerDown(blockNum, state, BOARD_SIZE);

      return { ...state, isDrawing: true, field, steps };
    }

    case 'POINTER_MOVE': {
      if (!state.isDrawing) return state;

      const blockNumStr = getBlockNumFromEvent(action.event);
      if (!blockNumStr || blockNumStr === '-1') {
        return { ...state, isDrawing: false };
      }

      const blockNum = getBlock(blockNumStr);
      const { field, steps, allowedStepsByStep } = processPointerMove(
        blockNum,
        state,
        BOARD_SIZE,
      );

      return { ...state, field, steps, allowedStepsByStep };
    }

    case 'POINTER_UP': {
      if (!state.isDrawing && state.steps.length === 0) return state;

      const { winner, nextPlayer, resetField } = finishTurn(state);

      if (resetField && winner) {
        const newState: GameState = {
          ...createInitialState(state.mode),
          winner,
        };
        return newState;
      }

      return {
        ...state,
        isDrawing: false,
        currentPlayer: nextPlayer,
        steps: [],
        allowedStepsByStep: [],
        winner,
      };
    }

    case 'NEW_GAME': {
      const mode = action.mode ?? state.mode;
      clearGameState();
      return createInitialState(mode);
    }

    case 'SET_MODE': {
      clearGameState();
      return createInitialState(action.mode);
    }

    case 'AI_TURN': {
      if (state.mode !== 'ai' || state.currentPlayer !== 'r' || state.winner) {
        return state;
      }

      const afterAi = applyAiMove(state);
      const { winner, nextPlayer, resetField } = finishTurn(afterAi);

      if (resetField && winner) {
        return { ...createInitialState(state.mode), winner };
      }

      return { ...afterAi, currentPlayer: nextPlayer };
    }

    default:
      return state;
  }
}

function getInitialState(): GameState {
  return loadGameState() ?? createInitialState('pvp');
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);

  useEffect(() => {
    if (!state.winner) {
      saveGameState(state);
    }
  }, [state]);

  useEffect(() => {
    if (state.mode === 'ai' && state.currentPlayer === 'r' && !state.isDrawing && !state.winner) {
      const timer = setTimeout(() => dispatch({ type: 'AI_TURN' }), 400);
      return () => clearTimeout(timer);
    }
  }, [state.mode, state.currentPlayer, state.isDrawing, state.winner, state.field]);

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (state.mode === 'ai' && state.currentPlayer === 'r') return;
    dispatch({ type: 'POINTER_DOWN', event });
  }, [state.mode, state.currentPlayer]);

  const onPointerMove = useCallback(
    debounce((event: PointerEvent) => {
      dispatch({ type: 'POINTER_MOVE', event });
    }, DELAY_TIME),
    [],
  );

  const onPointerUp = useCallback(() => {
    dispatch({ type: 'POINTER_UP' });
  }, []);

  const newGame = useCallback((mode?: GameMode) => {
    dispatch({ type: 'NEW_GAME', mode });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', mode });
  }, []);

  const dismissWinner = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  return {
    state,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    newGame,
    setMode,
    dismissWinner,
  };
}

export function getPlayerLabel(player: Player): string {
  return player === 'l' ? 'Левый' : 'Правый';
}

export function getPlayerColor(player: Player): string {
  return player === 'l' ? '#E5C1BD' : '#5E747F';
}
