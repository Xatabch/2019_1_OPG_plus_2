import type { GameMode, Player } from '../../game/types';
import { getWinnerLabel } from '../Controls/Controls';
import styles from './WinnerOverlay.module.css';

interface WinnerOverlayProps {
  winner: Player;
  mode: GameMode;
  onDismiss: () => void;
}

export function WinnerOverlay({ winner, mode, onDismiss }: WinnerOverlayProps) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Результат игры">
      <div className={styles.card}>
        <div
          className={`${styles.badge} ${winner === 'l' ? styles.leftWinner : styles.rightWinner}`}
        >
          {winner === 'l' ? 'L' : 'R'}
        </div>
        <h2 className={styles.title}>{getWinnerLabel(winner, mode)}</h2>
        <button type="button" className={styles.button} onClick={onDismiss} autoFocus>
          Играть снова
        </button>
      </div>
    </div>
  );
}
