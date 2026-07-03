import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

export function Card({ title, children, centered = false, className = '' }: CardProps) {
  return (
    <div className={[styles.card, centered && styles.centered, className].filter(Boolean).join(' ')}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
    </div>
  );
}
