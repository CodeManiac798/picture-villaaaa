import { cn } from '@/lib/utils/cn';

type Background = 'ivory' | 'cream' | 'beige' | 'charcoal' | 'transparent';

const bgClasses: Record<Background, string> = {
  ivory:       'bg-(--color-ivory)',
  cream:       'bg-(--color-cream)',
  beige:       'bg-(--color-beige)',
  charcoal:    'bg-(--color-charcoal)',
  transparent: 'bg-transparent',
};

interface SectionProps {
  children: React.ReactNode;
  background?: Background;
  className?: string;
  id?: string;
  /** Skip default vertical padding — useful when section manages its own */
  noPadding?: boolean;
}

export function Section({
  children,
  background = 'ivory',
  className,
  id,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        bgClasses[background],
        !noPadding && 'py-16 sm:py-20 lg:py-28',
        className,
      )}
    >
      {children}
    </section>
  );
}
