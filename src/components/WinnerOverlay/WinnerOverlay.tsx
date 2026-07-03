import type { GameMode, Player } from '../../game/types';
import { getWinnerLabel } from '../Controls/Controls';
import styles from './WinnerOverlay.module.css';

interface ScoreChange {
  inc?: number;
  dec?: number;
}

interface WinnerOverlayProps {
  winner: Player;
  mode: GameMode;
  onDismiss: () => void;
  scoreChange?: ScoreChange;
}

function formatScoreChange({ inc, dec }: ScoreChange): string | null {
  const parts: string[] = [];
  if (inc !== undefined && inc !== 0) {
    parts.push(`+${inc}`);
  }
  if (dec !== undefined && dec !== 0) {
    parts.push(`-${dec}`);
  }
  return parts.length > 0 ? parts.join(' / ') : null;
}

export function WinnerOverlay({ winner, mode, onDismiss, scoreChange }: WinnerOverlayProps) {
  const scoreText = scoreChange ? formatScoreChange(scoreChange) : null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Результат игры">
      <div className={styles.card}>
        <div
          className={`${styles.badge} ${winner === 'l' ? styles.leftWinner : styles.rightWinner}`}
        >
          {winner === 'l' ? 'L' : 'R'}
        </div>
        <h2 className={styles.title}>{getWinnerLabel(winner, mode)}</h2>
        {scoreText && <p className={styles.scoreChange}>{scoreText} очков</p>}
        <button type="button" className={styles.button} onClick={onDismiss} autoFocus>
          Играть снова
        </button>
      </div>
    </div>
  );
}
