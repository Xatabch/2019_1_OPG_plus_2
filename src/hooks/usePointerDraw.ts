import { useEffect, useRef } from 'react';

interface UsePointerDrawOptions {
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: () => void;
}

export function usePointerDraw(
  containerRef: React.RefObject<HTMLElement | null>,
  { onPointerDown, onPointerMove, onPointerUp }: UsePointerDrawOptions,
): void {
  const handlersRef = useRef({ onPointerDown, onPointerMove, onPointerUp });

  useEffect(() => {
    handlersRef.current = { onPointerDown, onPointerMove, onPointerUp };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleDown = (e: PointerEvent) => handlersRef.current.onPointerDown(e);
    const handleMove = (e: PointerEvent) => handlersRef.current.onPointerMove(e);
    const handleUp = () => handlersRef.current.onPointerUp();

    container.addEventListener('pointerdown', handleDown);
    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerup', handleUp);
    container.addEventListener('pointercancel', handleUp);

    return () => {
      container.removeEventListener('pointerdown', handleDown);
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerup', handleUp);
      container.removeEventListener('pointercancel', handleUp);
    };
  }, [containerRef]);
}
