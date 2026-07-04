import { Link } from 'react-router-dom';
import { CirclePlay, LogIn, Users } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import iconStyles from '../components/ui/Icon.module.css';
import { useAuth } from '../contexts/AuthContext';
import styles from './HomePage.module.css';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <AppLayout showNav>
      <div className={styles.hero}>
        <div className={styles.logo}>C</div>
        <h1 className={styles.title}>Colors</h1>
        <p className={styles.subtitle}>Пошаговая игра на поле 5×5</p>

        <div className={styles.actions}>
          <Link to="/game">
            <Button variant="primary" size="large" fullWidth>
              <Icon icon={CirclePlay} size="sm" className={iconStyles.onPrimary} />
              Одиночная игра
            </Button>
          </Link>

          {isAuthenticated ? (
            <Link to="/url">
              <Button variant="secondary" size="large" fullWidth>
                <Icon icon={Users} size="sm" className={iconStyles.muted} />
                Мультиплеер
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button variant="secondary" size="large" fullWidth>
                <Icon icon={LogIn} size="sm" className={iconStyles.muted} />
                Войти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
