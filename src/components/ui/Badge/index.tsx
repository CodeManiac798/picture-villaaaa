import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-label text-(--color-mist)',
        'border border-(--color-beige) px-3 py-1',
        className,
      )}
    >
      {children}
    </span>
  );
}
