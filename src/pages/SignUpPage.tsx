import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiErrorResponse, signUp } from '../api/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { validEmail, validLogin, validPassword } from '../lib/validation';
import styles from './AuthPages.module.css';

export function SignUpPage() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!validEmail(email)) errors.email = 'Некорректный e-mail';
    if (!validLogin(name)) errors.name = 'Только латиница, до 14 символов';
    if (password !== passwordRepeat) errors.passwordRepeat = 'Пароли не совпадают';
    if (!validPassword(password)) errors.password = 'Минимум 6 символов';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await signUp({ email, password, username: name });
      await loadUser();
      navigate('/me');
    } catch (err) {
      if (err instanceof ApiErrorResponse) {
        const fields = err.error.data ?? [];
        const next: Record<string, string> = {};
        if (fields.includes('email')) next.email = 'E-mail уже занят';
        if (fields.includes('name')) next.name = 'Имя уже занято';
        setFieldErrors(next);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout showBack backTo="/">
      <Card title="Регистрация">
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
            required
            autoFocus
          />
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            required
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            required
          />
          <Input
            label="Повторите пароль"
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            error={fieldErrors.passwordRepeat}
            required
          />
          <div className={styles.actions}>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
}
