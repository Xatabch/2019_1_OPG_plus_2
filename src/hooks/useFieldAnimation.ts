import { useEffect, useRef, useState } from 'react';
import type { Field } from '../game/types';
import { BOARD_SIZE } from '../game/types';

export function useFieldAnimation(field: Field): Set<number> {
  const [lastFilledCells, setLastFilledCells] = useState<Set<number>>(new Set());
  const prevFieldRef = useRef<string | null>(null);

  useEffect(() => {
    const fieldKey = JSON.stringify(field);
    if (prevFieldRef.current === null) {
      prevFieldRef.current = fieldKey;
      return;
    }
    if (fieldKey === prevFieldRef.current) return;

    const prev = JSON.parse(prevFieldRef.current) as string[][];
    const newCells = new Set<number>();

    for (let r = 0; r < field.length; r++) {
      for (let c = 0; c < field[r].length; c++) {
        if (prev[r][c] === '*' && (field[r][c] === 'l' || field[r][c] === 'r')) {
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
  }, [field]);

  return lastFilledCells;
}
