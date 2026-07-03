import type { Player } from '../../game/types';
import styles from './PlayerIndicator.module.css';

interface PlayerIndicatorProps {
  currentPlayer: Player;
  mode: 'pvp' | 'ai';
}

export function PlayerIndicator({ currentPlayer, mode }: PlayerIndicatorProps) {
  const isLeft = currentPlayer === 'l';

  return (
    <div className={styles.indicator} role="status" aria-live="polite">
      <div className={`${styles.logo} ${isLeft ? styles.leftPlayer : styles.rightPlayer}`}>
        C
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>Colors</h1>
        <p className={styles.subtitle}>
          Ход: <strong>{isLeft ? 'Левый' : mode === 'ai' ? 'Компьютер' : 'Правый'}</strong>
        </p>
      </div>
    </div>
  );
}
