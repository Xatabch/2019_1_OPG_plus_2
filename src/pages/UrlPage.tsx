import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoomUrl } from '../api/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { MY_HOST } from '../config';
import { copyToClipboard } from '../lib/validation';
import styles from './UrlPage.module.css';

function UrlContent() {
  const navigate = useNavigate();
  const [roomUrl, setRoomUrl] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const { id } = await getRoomUrl();
      const url = `${MY_HOST}/multiplayer/${id}`;
      setRoomUrl(url);
      await copyToClipboard(url);
      setShowHelp(true);
      setTimeout(() => setShowHelp(false), 5000);
    } catch {
      setError('Не удалось создать комнату');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    const match = roomUrl.match(/\/multiplayer\/([^/?#]+)/);
    if (match) {
      navigate(`/multiplayer/${match[1]}`);
      return;
    }
    setError('Вставьте корректную ссылку на комнату');
  };

  return (
    <AppLayout showBack backTo="/">
      <Card title="Мультиплеер">
        <form className={styles.form} onSubmit={handleJoin}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            label="Ссылка на комнату"
            value={roomUrl}
            onChange={(e) => setRoomUrl(e.target.value)}
            placeholder="https://..."
            required
          />
          {showHelp && (
            <p className={styles.help}>Ссылка скопирована в буфер обмена!</p>
          )}
          <div className={styles.actions}>
            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={handleCreate}
              disabled={loading}
            >
              {loading ? 'Создание...' : 'Создать комнату'}
            </Button>
            <Button type="submit" variant="secondary" fullWidth>
              Присоединиться
            </Button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
}

export function UrlPage() {
  return (
    <ProtectedRoute>
      <UrlContent />
    </ProtectedRoute>
  );
}
