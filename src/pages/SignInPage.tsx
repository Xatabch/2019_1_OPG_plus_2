import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiErrorResponse, signIn } from '../api/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import styles from './AuthPages.module.css';

export function SignInPage() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      await signIn(email, password);
      await loadUser();
      navigate('/me');
    } catch (err) {
      if (err instanceof ApiErrorResponse) {
        const fields = err.error.data ?? [];
        setFieldErrors({
          email: fields.includes('email') ? 'Неверный e-mail' : undefined,
          password: fields.includes('password') ? 'Неверный пароль' : undefined,
        });
        setError(`Неверный ${fields[0] ?? 'логин'} или e-mail`);
      } else {
        setError('Ошибка входа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout showBack backTo="/">
      <Card title="Вход">
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            required
            autoFocus
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            required
          />
          <div className={styles.actions}>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </div>
        </form>
        <p className={styles.linkRow}>
          Нет аккаунта? <Link to="/signup">Регистрация</Link>
        </p>
      </Card>
    </AppLayout>
  );
}
