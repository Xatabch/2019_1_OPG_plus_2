import type { Cell } from '../../game/types';
import styles from './Block.module.css';

interface BlockProps {
  cell: Cell;
  num: number;
  isNew?: boolean;
}

export function Block({ cell, num, isNew }: BlockProps) {
  const className = [
    styles.block,
    cell === 'd' && styles.disabled,
    cell === 'l' && styles.leftPlayer,
    cell === 'r' && styles.rightPlayer,
    isNew && styles.newCell,
  ]
    .filter(Boolean)
    .join(' ');

  const label =
    cell === 'l' ? 'Левый игрок' : cell === 'r' ? 'Правый игрок' : cell === 'd' ? 'Заблокировано' : 'Свободно';

  return (
    <div
      className={className}
      data-num={num}
      data-type="field"
      role="gridcell"
      aria-label={`Клетка ${num + 1}: ${label}`}
      tabIndex={cell === '*' ? 0 : -1}
    />
  );
}
