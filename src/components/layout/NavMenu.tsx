import { Link } from 'react-router-dom';
import { BookOpen, Trophy, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from '../ui/Icon';
import iconStyles from '../ui/Icon.module.css';
import styles from './NavMenu.module.css';

export function NavMenu() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <Link
        to="/me"
        className={[styles.link, !isAuthenticated && styles.hidden].filter(Boolean).join(' ')}
        aria-label="Профиль"
      >
        <Icon icon={User} className={iconStyles.muted} />
      </Link>
      <Link to="/leaders" className={styles.link} aria-label="Таблица лидеров">
        <Icon icon={Trophy} className={iconStyles.muted} />
      </Link>
      <Link to="/rules" className={styles.link} aria-label="Правила">
        <Icon icon={BookOpen} className={iconStyles.muted} />
      </Link>
    </nav>
  );
}
