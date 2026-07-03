import type { Field } from '../../game/types';
import { Block } from '../Block/Block';
import styles from './Field.module.css';

interface FieldProps {
  field: Field;
  numBlock: number;
  lastFilledCells?: Set<number>;
}

export function Field({ field, numBlock, lastFilledCells }: FieldProps) {
  return (
    <div className={styles.field} data-num="-1" role="grid" aria-label="Игровое поле 5 на 5">
      {field.map((blockRow, rowIndex) => (
        <div key={`r-${rowIndex}`} className={styles.row} data-num="-1" role="row">
          {blockRow.map((cell, colIndex) => {
            const num = rowIndex * numBlock + colIndex;
            return (
              <Block
                key={`b-${colIndex}`}
                cell={cell}
                num={num}
                isNew={lastFilledCells?.has(num)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
