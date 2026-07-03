import type { GameMode, Player } from '../../game/types';
import styles from './Controls.module.css';

interface ControlsProps {
  mode: GameMode;
  onNewGame: () => void;
  onSetMode: (mode: GameMode) => void;
}

export function Controls({ mode, onNewGame, onSetMode }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <button type="button" className={styles.button} onClick={onNewGame}>
        Новая игра
      </button>
      <div className={styles.modeToggle} role="group" aria-label="Режим игры">
        <button
          type="button"
          className={`${styles.modeButton} ${mode === 'pvp' ? styles.active : ''}`}
          onClick={() => onSetMode('pvp')}
          aria-pressed={mode === 'pvp'}
        >
          2 игрока
        </button>
        <button
          type="button"
          className={`${styles.modeButton} ${mode === 'ai' ? styles.active : ''}`}
          onClick={() => onSetMode('ai')}
          aria-pressed={mode === 'ai'}
        >
          vs AI
        </button>
      </div>
    </div>
  );
}

export function getWinnerLabel(winner: Player, mode: GameMode): string {
  if (winner === 'l') return 'Левый игрок победил!';
  return mode === 'ai' ? 'Компьютер победил!' : 'Правый игрок победил!';
}
