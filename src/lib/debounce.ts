export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms: number,
): (...args: Args) => void {
  let isCooldown = false;
  return (...args: Args) => {
    if (isCooldown) return;
    fn(...args);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
}
