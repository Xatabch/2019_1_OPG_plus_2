import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { ApiErrorResponse, updatePassword, updateUser, uploadAvatar } from '../api/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import iconStyles from '../components/ui/Icon.module.css';
import { Input } from '../components/ui/Input';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { HOST } from '../config';
import defaultAvatar from '../img/default_avatar.svg';
import styles from './EditProfilePage.module.css';
import authStyles from './AuthPages.module.css';

function EditProfileContent() {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(user?.username ?? '');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? `${HOST}${user.avatar}` : defaultAvatar,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.username) setUsername(user.username);
    if (user?.avatar) setAvatarPreview(`${HOST}${user.avatar}`);
  }, [user]);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await uploadAvatar(formData);
      await loadUser();
      setAvatarPreview(URL.createObjectURL(file));
    } catch {
      setError('Не удалось загрузить аватар');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (username !== user?.username) {
        await updateUser({ username });
      }
      if (password) {
        if (password !== passwordRepeat) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }
        await updatePassword(password, passwordRepeat);
      }
      await loadUser();
      navigate('/me');
    } catch (err) {
      if (err instanceof ApiErrorResponse) {
        setError(err.error.message ?? 'Ошибка сохранения');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout showBack backTo="/me">
      <Card title="Редактирование">
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.avatarSection}>
            <div
              className={styles.avatarEdit}
              onClick={() => fileRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
            >
              <img src={avatarPreview} alt="" className={styles.avatar} />
              <div className={styles.editOverlay}>
                <Icon icon={Camera} size="lg" className={iconStyles.onDark} />
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleAvatarChange}
            />
          </div>

          {error && <p className={authStyles.error}>{error}</p>}

          <Input
            label="Никнейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Новый пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Повторите пароль"
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </form>
      </Card>
    </AppLayout>
  );
}

export function EditProfilePage() {
  return (
    <ProtectedRoute>
      <EditProfileContent />
    </ProtectedRoute>
  );
}
