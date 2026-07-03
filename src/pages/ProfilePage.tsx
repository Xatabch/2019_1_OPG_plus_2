import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { HOST } from '../config';
import type { UserData } from '../api/types';
import defaultAvatar from '../img/default_avatar.svg';
import settingsIcon from '../img/settings.svg';
import styles from './ProfilePage.module.css';

function ProfileContent() {
  const { user, loadUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserData | null>(user);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    void loadUser().then((data) => {
      if (data) setProfile(data);
    });
  }, [loadUser]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Удалить аккаунт без возможности восстановления?',
    );
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteUser();
      await logout();
      navigate('/');
    } catch {
      setDeleteError('Не удалось удалить аккаунт');
    } finally {
      setDeleting(false);
    }
  };

  const avatarUrl = profile?.avatar ? `${HOST}${profile.avatar}` : defaultAvatar;

  return (
    <AppLayout showBack backTo="/">
      <Card centered className={styles.profileCard}>
        <Link to="/editme" className={styles.settingsLink} aria-label="Настройки">
          <img src={settingsIcon} alt="" />
        </Link>

        {profile?.avatar ? (
          <img src={avatarUrl} alt="" className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {profile?.username?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        <h2 className={styles.username}>{profile?.username ?? '...'}</h2>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Очки</span>
            <span className={styles.statValue}>{profile?.score ?? 0}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Игр</span>
            <span className={styles.statValue}>{profile?.games ?? 0}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Побед</span>
            <span className={styles.statValue}>{profile?.win ?? 0}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Поражений</span>
            <span className={styles.statValue}>{profile?.lose ?? 0}</span>
          </div>
        </div>

        {deleteError && <p className={styles.error}>{deleteError}</p>}

        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleLogout}>
            Выйти
          </Button>
          <Button variant="secondary" onClick={handleDeleteAccount} disabled={deleting}>
            {deleting ? 'Удаление...' : 'Удалить аккаунт'}
          </Button>
        </div>
      </Card>
    </AppLayout>
  );
}

export function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
