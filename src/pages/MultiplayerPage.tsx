import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  finishTurn,
  getBlock,
  getBlockNumFromEvent,
  processPointerDown,
  processPointerMove,
  syncStepsWithField,
  matrixCopy,
} from '../game/engine';
import type { Coords, Field as GameField, GameState, Player } from '../game/types';
import { BOARD_SIZE, createEmptyField, createInitialState, DELAY_TIME } from '../game/types';
import { debounce } from '../lib/debounce';
import { usePointerDraw } from '../hooks/usePointerDraw';
import { useAuth } from '../contexts/AuthContext';
import { HOST, HOST_MULTIPLAYER_WS } from '../config';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { Field } from '../components/Field/Field';
import { PlayerIndicator } from '../components/PlayerIndicator/PlayerIndicator';
import { WinnerOverlay } from '../components/WinnerOverlay/WinnerOverlay';
import { Modal } from '../components/ui/Modal';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import defaultAvatar from '../img/default_avatar.svg';
import gameBoardStyles from '../components/GameBoard/GameBoard.module.css';
import styles from './MultiplayerPage.module.css';

interface MultiplayerPlayer {
  username: string;
  avatar?: string;
}

interface WsMessage {
  type: string;
  user?: string;
  data?: {
    coords?: { x: number; y: number }[];
    event_type?: string;
    event_data?: {
      winner?: string;
      score_inc?: number;
      score_dec?: number;
      locked?: { x: number; y: number }[];
      whose_turn?: string;
      players?: MultiplayerPlayer[];
    };
  };
}

type MultiplayerAction =
  | { type: 'INIT'; field: GameField; currentPlayer: Player; players: MultiplayerPlayer[]; me: string }
  | { type: 'WAIT' }
  | { type: 'POINTER_DOWN'; event: PointerEvent }
  | { type: 'POINTER_MOVE'; event: PointerEvent }
  | { type: 'POINTER_UP' }
  | { type: 'REMOTE_MOVE'; steps: Coords[]; player: Player }
  | { type: 'WIN'; winner: Player; scoreInc?: number; scoreDec?: number }
  | { type: 'DISMISS' };

interface MultiplayerState extends GameState {
  waiting: boolean;
  me: string;
  players: MultiplayerPlayer[];
  scoreChange?: { inc?: number; dec?: number };
}

function coordsToBlocks(coords: { x: number; y: number }[]): number[] {
  return coords.map((c) => c.x * BOARD_SIZE + c.y);
}

function fillSteps(field: GameField, steps: Coords[], player: Player): GameField {
  return syncStepsWithField(steps, matrixCopy(field), player);
}

function interpolateSteps(start: number, end: number): number[] {
  const diff = Math.abs(end - start);
  if (diff < BOARD_SIZE) {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    const blocks: number[] = [];
    for (let i = min; i <= max; i++) blocks.push(i);
    return blocks;
  }
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  const blocks: number[] = [];
  for (let i = min; i <= max; i += BOARD_SIZE) blocks.push(i);
  return blocks;
}

function multiplayerReducer(state: MultiplayerState, action: MultiplayerAction): MultiplayerState {
  switch (action.type) {
    case 'WAIT':
      return { ...state, waiting: true };

    case 'INIT': {
      return {
        ...createInitialState('pvp'),
        field: action.field,
        currentPlayer: action.currentPlayer,
        waiting: false,
        me: action.me,
        players: action.players,
        mode: 'pvp',
      };
    }

    case 'POINTER_DOWN': {
      if (state.waiting || state.winner) return state;
      const blockNumStr = getBlockNumFromEvent(action.event);
      if (!blockNumStr || blockNumStr === '-1') return state;
      const blockNum = getBlock(blockNumStr);
      const { field, steps } = processPointerDown(blockNum, state, BOARD_SIZE);
      return { ...state, isDrawing: true, field, steps };
    }

    case 'POINTER_MOVE': {
      if (!state.isDrawing || state.waiting) return state;
      const blockNumStr = getBlockNumFromEvent(action.event);
      if (!blockNumStr || blockNumStr === '-1') {
        return { ...state, isDrawing: false };
      }
      const blockNum = getBlock(blockNumStr);
      const { field, steps, allowedStepsByStep } = processPointerMove(blockNum, state, BOARD_SIZE);
      return { ...state, field, steps, allowedStepsByStep };
    }

    case 'POINTER_UP': {
      if (!state.isDrawing && state.steps.length === 0) return state;
      const { winner, nextPlayer, resetField } = finishTurn(state);
      if (resetField && winner) {
        return { ...state, winner, isDrawing: false, steps: [], allowedStepsByStep: [] };
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

    case 'REMOTE_MOVE': {
      const field = fillSteps(state.field, action.steps, action.player);
      const nextPlayer: Player = action.player === 'l' ? 'r' : 'l';
      return { ...state, field, currentPlayer: nextPlayer, steps: [], isDrawing: false };
    }

    case 'WIN':
      return {
        ...state,
        winner: action.winner,
        scoreChange: { inc: action.scoreInc, dec: action.scoreDec },
      };

    case 'DISMISS':
      return { ...state, winner: null, scoreChange: undefined };

    default:
      return state;
  }
}

function MultiplayerContent() {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [lastFilledCells] = useState<Set<number>>(new Set());

  const initialState: MultiplayerState = {
    ...createInitialState('pvp'),
    waiting: true,
    me: user?.username ?? '',
    players: [],
  };

  const [state, dispatch] = useReducer(multiplayerReducer, initialState);

  const isMyTurn =
    state.players.length >= 2 &&
    !state.waiting &&
    ((state.currentPlayer === 'l' && state.players[0]?.username === state.me) ||
      (state.currentPlayer === 'r' && state.players[1]?.username === state.me));

  useEffect(() => {
    if (!roomId || !user?.username) return;

    const ws = new WebSocket(`${HOST_MULTIPLAYER_WS}/${roomId}/room`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          user: user.username,
          avatar: user.avatar,
          type: 'register',
        }),
      );
    };

    ws.onmessage = (event) => {
      const lines = String(event.data).split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line) as WsMessage;

          if (msg.type === 'register') {
            dispatch({ type: 'WAIT' });
          }

          if (msg.user === 'SERVICE' && msg.data?.event_data) {
            const ev = msg.data.event_data;
            let players = ev.players ?? [];
            if (players[1]?.username === user.username) {
              players = [players[1], players[0]];
            }

            const field = createEmptyField();
            for (const lock of ev.locked ?? []) {
              if (field[lock.x]?.[lock.y] !== undefined) {
                field[lock.x][lock.y] = 'd';
              }
            }

            const whoseTurn = ev.whose_turn === players[0]?.username ? 'l' : 'r';

            dispatch({
              type: 'INIT',
              field,
              currentPlayer: whoseTurn,
              players,
              me: user.username ?? '',
            });
          }

          if (msg.type === 'game' && msg.user !== user.username && msg.data?.coords) {
            const coords = msg.data.coords;
            const blocks = coordsToBlocks(coords);
            const start = blocks[0];
            const end = blocks[blocks.length - 1];
            const allBlocks = interpolateSteps(start, end);
            const steps: Coords[] = allBlocks.map((b) => [
              Math.floor(b / BOARD_SIZE),
              b % BOARD_SIZE,
            ] as Coords);

            const remotePlayer: Player =
              msg.user === state.players[0]?.username ? 'l' : 'r';

            dispatch({ type: 'REMOTE_MOVE', steps, player: remotePlayer });
          }

          if (msg.type === 'event' && msg.data?.event_type === 'win') {
            const ev = msg.data.event_data;
            const winnerName = ev?.winner;
            const winner: Player =
              winnerName === state.players[0]?.username ? 'l' : 'r';
            dispatch({
              type: 'WIN',
              winner,
              scoreInc: ev?.score_inc,
              scoreDec: ev?.score_dec,
            });
          }
        } catch {
          // ignore malformed messages
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, user?.username, user?.avatar]);

  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      if (!isMyTurn) return;
      dispatch({ type: 'POINTER_DOWN', event });
    },
    [isMyTurn],
  );

  const onPointerMove = useCallback(
    debounce((event: PointerEvent) => {
      dispatch({ type: 'POINTER_MOVE', event });
    }, DELAY_TIME),
    [],
  );

  const onPointerUp = useCallback(() => {
    if (state.steps.length >= 2 && wsRef.current && isMyTurn) {
      const coords = state.steps.map(([x, y]) => ({ x, y }));
      wsRef.current.send(
        JSON.stringify({
          user: state.me,
          type: 'game',
          data: {
            coords: [coords[0], coords[coords.length - 1]],
          },
        }),
      );
    }
    dispatch({ type: 'POINTER_UP' });
  }, [state.steps, state.me, isMyTurn]);

  usePointerDraw(containerRef, { onPointerDown, onPointerMove, onPointerUp });

  const leftActive = state.currentPlayer === 'l';
  const rightActive = state.currentPlayer === 'r';

  if (!roomId) {
    return <GameBoard />;
  }

  return (
    <div className={gameBoardStyles.container} ref={containerRef}>
      <header className={gameBoardStyles.header}>
        <PlayerIndicator currentPlayer={state.currentPlayer} mode="pvp" />
        <div className={styles.players}>
          {state.players.map((p, i) => (
            <div key={p.username} className={styles.playerBadge}>
              <img
                src={p.avatar ? `${HOST}${p.avatar}` : defaultAvatar}
                alt=""
                className={styles.playerAvatar}
              />
              <span>
                {p.username}
                {i === 0 ? ' (L)' : ' (R)'}
              </span>
            </div>
          ))}
        </div>
      </header>

      <main className={gameBoardStyles.body}>
        <div
          className={`${gameBoardStyles.playerColumn} ${leftActive ? gameBoardStyles.leftPlayer : ''}`}
          aria-hidden="true"
        />
        <Field field={state.field} numBlock={BOARD_SIZE} lastFilledCells={lastFilledCells} />
        <div
          className={`${gameBoardStyles.playerColumn} ${rightActive ? gameBoardStyles.rightPlayer : ''}`}
          aria-hidden="true"
        />
      </main>

      {state.waiting && (
        <Modal>
          <p className={styles.waitText}>Ожидание второго игрока...</p>
        </Modal>
      )}

      {state.winner && (
        <>
          <WinnerOverlay
            winner={state.winner}
            mode="pvp"
            onDismiss={() => dispatch({ type: 'DISMISS' })}
          />
        </>
      )}
    </div>
  );
}

export function MultiplayerPage() {
  return (
    <ProtectedRoute>
      <MultiplayerContent />
    </ProtectedRoute>
  );
}
