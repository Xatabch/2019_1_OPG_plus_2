import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = 'Загрузка...' }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
