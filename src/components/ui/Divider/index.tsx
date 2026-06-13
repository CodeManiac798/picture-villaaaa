import { cn } from '@/lib/utils/cn';

interface DividerProps {
  variant?: 'gold' | 'subtle' | 'bold';
  className?: string;
  width?: 'full' | 'short' | 'medium';
}

const widthClasses = {
  full: 'w-full',
  medium: 'w-24',
  short: 'w-12',
};

const colorClasses = {
  gold: 'border-(--color-gold) opacity-40',
  subtle: 'border-(--color-beige)',
  bold: 'border-(--color-sandstone)',
};

export function Divider({ variant = 'subtle', width = 'full', className }: DividerProps) {
  return (
    <hr
      className={cn(
        'border-t',
        colorClasses[variant],
        widthClasses[width],
        className,
      )}
    />
  );
}
