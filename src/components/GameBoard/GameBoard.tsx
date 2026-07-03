import { useRef } from 'react';
import { BOARD_SIZE } from '../../game/types';
import { useFieldAnimation } from '../../hooks/useFieldAnimation';
import { useGame } from '../../hooks/useGame';
import { usePointerDraw } from '../../hooks/usePointerDraw';
import { Controls } from '../Controls/Controls';
import { Field } from '../Field/Field';
import { PlayerIndicator } from '../PlayerIndicator/PlayerIndicator';
import { WinnerOverlay } from '../WinnerOverlay/WinnerOverlay';
import styles from './GameBoard.module.css';

export function GameBoard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    state,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    newGame,
    setMode,
    dismissWinner,
  } = useGame();

  const lastFilledCells = useFieldAnimation(state.field);

  usePointerDraw(containerRef, { onPointerDown, onPointerMove, onPointerUp });

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
