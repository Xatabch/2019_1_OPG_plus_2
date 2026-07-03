import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import singleplayerIcon from '../img/singleplayer.svg';
import multiplayerIcon from '../img/multiplayer.svg';
import loginIcon from '../img/login.svg';
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
              <img src={singleplayerIcon} alt="" width={20} height={20} />
              Одиночная игра
            </Button>
          </Link>

          {isAuthenticated ? (
            <Link to="/url">
              <Button variant="secondary" size="large" fullWidth>
                <img src={multiplayerIcon} alt="" width={20} height={20} />
                Мультиплеер
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button variant="secondary" size="large" fullWidth>
                <img src={loginIcon} alt="" width={20} height={20} />
                Войти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
