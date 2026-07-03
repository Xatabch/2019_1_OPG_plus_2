import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE } from '../../game/types';
import { useGame } from '../../hooks/useGame';
import { usePointerDraw } from '../../hooks/usePointerDraw';
import { Controls } from '../Controls/Controls';
import { Field } from '../Field/Field';
import { PlayerIndicator } from '../PlayerIndicator/PlayerIndicator';
import { WinnerOverlay } from '../WinnerOverlay/WinnerOverlay';
import styles from './GameBoard.module.css';

export function GameBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastFilledCells, setLastFilledCells] = useState<Set<number>>(new Set());
  const prevFieldRef = useRef<string | null>(null);

  const {
    state,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    newGame,
    setMode,
    dismissWinner,
  } = useGame();

  usePointerDraw(containerRef, { onPointerDown, onPointerMove, onPointerUp });

  useEffect(() => {
    const fieldKey = JSON.stringify(state.field);
    if (prevFieldRef.current === null) {
      prevFieldRef.current = fieldKey;
      return;
    }
    if (fieldKey === prevFieldRef.current) return;

    const prev = JSON.parse(prevFieldRef.current) as string[][];
    const newCells = new Set<number>();

    for (let r = 0; r < state.field.length; r++) {
      for (let c = 0; c < state.field[r].length; c++) {
        if (prev[r][c] === '*' && (state.field[r][c] === 'l' || state.field[r][c] === 'r')) {
          newCells.add(r * BOARD_SIZE + c);
        }
      }
    }

    prevFieldRef.current = fieldKey;

    if (newCells.size > 0) {
      setLastFilledCells(newCells);
      const timer = setTimeout(() => setLastFilledCells(new Set()), 400);
      return () => clearTimeout(timer);
    }
  }, [state.field]);

  const leftActive = state.currentPlayer === 'l';
  const rightActive = state.currentPlayer === 'r';

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <PlayerIndicator currentPlayer={state.currentPlayer} mode={state.mode} />
        <Controls mode={state.mode} onNewGame={newGame} onSetMode={setMode} />
      </header>

      <main className={styles.body}>
        <div
          className={`${styles.playerColumn} ${leftActive ? styles.leftPlayer : ''}`}
          aria-hidden="true"
        />
        <Field
          field={state.field}
          numBlock={BOARD_SIZE}
          lastFilledCells={lastFilledCells}
        />
        <div
          className={`${styles.playerColumn} ${rightActive ? styles.rightPlayer : ''}`}
          aria-hidden="true"
        />
      </main>

      {state.winner && (
        <WinnerOverlay
          winner={state.winner}
          mode={state.mode}
          onDismiss={dismissWinner}
        />
      )}
    </div>
  );
}
