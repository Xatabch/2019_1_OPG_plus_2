import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className={styles.label} htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={[styles.input, error && styles.error, className].filter(Boolean).join(' ')}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}
