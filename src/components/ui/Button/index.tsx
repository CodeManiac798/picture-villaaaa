'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  asChild?: false;
}

const variantClasses: Record<Variant, string> = {
  primary: [
    'bg-(--color-charcoal) text-(--color-ivory)',
    'hover:bg-(--color-ink)',
    'border border-(--color-charcoal)',
  ].join(' '),
  secondary: [
    'bg-transparent text-(--color-charcoal)',
    'border border-(--color-charcoal)',
    'hover:bg-(--color-charcoal) hover:text-(--color-ivory)',
  ].join(' '),
  ghost: [
    'bg-transparent text-(--color-charcoal)',
    'hover:text-(--color-gold)',
    'underline-offset-4 hover:underline',
  ].join(' '),
  whatsapp: [
    'bg-[#25D366] text-white',
    'hover:bg-[#1ebe5d]',
    'border border-[#25D366]',
  ].join(' '),
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-[0.6875rem] tracking-[0.14em] px-5 py-2.5 min-h-[38px]',
  md: 'text-[0.6875rem] tracking-[0.16em] px-7 py-3.5 min-h-[46px]',
  lg: 'text-[0.75rem] tracking-[0.16em] px-9 py-4 min-h-[52px]',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2',
          'font-body font-medium uppercase',
          'transition-all duration-200',
          'cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Min touch target for mobile
          'min-w-[44px]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export { Button };
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
