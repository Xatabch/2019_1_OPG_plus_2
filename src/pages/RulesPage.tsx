import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import rulesImage from '../img/rules2.svg';
import styles from './RulesPage.module.css';

export function RulesPage() {
  return (
    <AppLayout showBack backTo="/">
      <Card title="Правила">
        <p className={styles.text}>
          Игроки по очереди закрашивают клетки, проводя линии по горизонтали или вертикали.
          Побеждает тот, кто заполнит все свободные клетки.
        </p>
        <img src={rulesImage} alt="Правила игры Colors" className={styles.rulesImage} />
      </Card>
    </AppLayout>
  );
}
