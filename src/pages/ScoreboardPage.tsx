import { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../api/api';
import type { UserData } from '../api/types';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { HOST } from '../config';
import defaultAvatar from '../img/default_avatar.svg';
import styles from './ScoreboardPage.module.css';

const PAGE_SIZE = 5;

export function ScoreboardPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadPage = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getUsers(PAGE_SIZE, p);
      setUsers(data.users ?? []);
      setPage(p);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPage(1);
  }, [loadPage]);

  return (
    <AppLayout showBack backTo="/">
      <Card title="Таблица лидеров">
        <div className={styles.list}>
          {loading && <p className={styles.empty}>Загрузка...</p>}
          {!loading && users.length === 0 && (
            <p className={styles.empty}>Нет данных</p>
          )}
          {!loading &&
            users.map((u, i) => (
              <div key={u.username ?? i} className={styles.row}>
                <span className={styles.rank}>{(page - 1) * PAGE_SIZE + i + 1}</span>
                <img
                  src={u.avatar ? `${HOST}${u.avatar}` : defaultAvatar}
                  alt=""
                  className={styles.avatar}
                />
                <span className={styles.username}>{u.username}</span>
                <span className={styles.score}>{u.score ?? 0}</span>
              </div>
            ))}
        </div>

        <div className={styles.pagination}>
          <Button
            variant="secondary"
            onClick={() => loadPage(page - 1)}
            disabled={page <= 1 || loading}
          >
            ←
          </Button>
          <span className={styles.pageNum}>Стр. {page}</span>
          <Button
            variant="secondary"
            onClick={() => loadPage(page + 1)}
            disabled={users.length < PAGE_SIZE || loading}
          >
            →
          </Button>
        </div>
      </Card>
    </AppLayout>
  );
}
