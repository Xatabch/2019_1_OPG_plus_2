import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'default' | 'large';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'default',
  size = 'default',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    size === 'large' && styles.large,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
