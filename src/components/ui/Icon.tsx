import type { LucideIcon, LucideProps } from 'lucide-react';
import styles from './Icon.module.css';

export const ICON_SIZES = {
  sm: 20,
  md: 22,
  lg: 24,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

interface IconProps extends Omit<LucideProps, 'size'> {
  icon: LucideIcon;
  size?: IconSize;
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  className,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const classes = [styles.icon, className].filter(Boolean).join(' ');

  return (
    <IconComponent
      size={ICON_SIZES[size]}
      strokeWidth={strokeWidth}
      aria-hidden
      className={classes}
      {...props}
    />
  );
}
