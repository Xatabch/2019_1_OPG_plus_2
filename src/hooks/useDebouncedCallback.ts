import { useMemo, useRef } from 'react';
import { debounce } from '../lib/debounce';

export function useDebouncedCallback<Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms: number,
): (...args: Args) => void {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(
    () =>
      debounce((...args: Args) => {
        fnRef.current(...args);
      }, ms),
    [ms],
  );
}
