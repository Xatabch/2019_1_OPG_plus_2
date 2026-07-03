import type { ReactNode } from 'react';
import { BackButton } from './BackButton';
import { NavMenu } from './NavMenu';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  backTo?: string;
  showNav?: boolean;
  headerExtra?: ReactNode;
  variant?: 'default' | 'game';
}

export function AppLayout({
  children,
  showBack = false,
  backTo,
  showNav = false,
  headerExtra,
  variant = 'default',
}: AppLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>{showBack && <BackButton to={backTo} />}</div>
        {headerExtra}
        {showNav && <NavMenu />}
      </header>
      <main className={variant === 'game' ? styles.gameMain : styles.main}>{children}</main>
    </div>
  );
}
