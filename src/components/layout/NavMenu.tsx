import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import profileIcon from '../../img/profile.svg';
import trophyIcon from '../../img/trophy.svg';
import rulesIcon from '../../img/rules.svg';
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
        <img src={profileIcon} alt="" />
      </Link>
      <Link to="/leaders" className={styles.link} aria-label="Таблица лидеров">
        <img src={trophyIcon} alt="" />
      </Link>
      <Link to="/rules" className={styles.link} aria-label="Правила">
        <img src={rulesIcon} alt="" />
      </Link>
    </nav>
  );
}
