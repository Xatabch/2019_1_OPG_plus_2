import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Icon } from '../ui/Icon';
import iconStyles from '../ui/Icon.module.css';
import styles from './BackButton.module.css';

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" className={styles.back} onClick={handleClick} aria-label="Назад">
      <Icon icon={ArrowLeft} className={iconStyles.muted} />
    </button>
  );
}
