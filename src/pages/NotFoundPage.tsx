import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function NotFoundPage() {
  return (
    <AppLayout>
      <Card title="404 — Не найдено" centered>
        <Link to="/">
          <Button variant="primary" size="large">
            На главную
          </Button>
        </Link>
      </Card>
    </AppLayout>
  );
}
