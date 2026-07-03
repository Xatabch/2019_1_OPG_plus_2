export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let isCooldown = false;
  return (...args: Parameters<T>) => {
    if (isCooldown) return;
    fn(...args);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
}
