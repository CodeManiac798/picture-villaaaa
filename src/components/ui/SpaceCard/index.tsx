import Image from 'next/image';
import Link from 'next/link';
import type { Space, SpaceCategory } from '@/types/space';
import { cn } from '@/lib/utils/cn';

type Aspect = 'portrait' | 'landscape' | 'wide';
type Size = 'base' | 'lg';

const aspectClasses: Record<Aspect, string> = {
  portrait:  'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide:      'aspect-[16/11]',
};

interface SpaceCardProps {
  space: Space;
  className?: string;
  aspect?: Aspect;
  size?: Size;
}

// Category fallback accent when space has no accentColor
const categoryAccent: Record<SpaceCategory, string> = {
  palatial:      '#C9A96E',
  international: '#8A9BB0',
  natural:       '#7A9B72',
  social:        '#C4806A',
  intimate:      '#8A7A72',
};

const categoryLabel: Record<SpaceCategory, string> = {
  palatial:      'Palatial',
  international: 'International',
  natural:       'Natural',
  social:        'Social',
  intimate:      'Intimate',
};

export function SpaceCard({ space, className, aspect = 'portrait', size = 'base' }: SpaceCardProps) {
  const accent = space.accentColor ?? categoryAccent[space.category];

  return (
    <Link
      href={`/spaces/${space.slug}`}
      className={cn('group block', className)}
      aria-label={`${space.name} — ${space.tagline}`}
    >
      {/* Image plate */}
      <div className={cn('relative overflow-hidden rounded-[var(--radius-card)] bg-(--color-beige) shadow-[0_20px_50px_-24px_rgba(40,24,16,0.4)]', aspectClasses[aspect])}>
        {space.coverReady ? (
          <>
            <Image
              src={space.coverImage.src}
              alt={space.coverImage.alt}
              fill
              className="object-cover object-center transition-transform duration-[1600ms] ease-(--ease-luxury) group-hover:scale-[1.06] group-hover:-translate-y-[1.5%]"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 40vw"
            />
            {/* Resting warm grade — lifts on hover so the space "wakes up" in true color */}
            <div
              className="absolute inset-0 bg-(--color-champagne) mix-blend-soft-light opacity-50 transition-opacity duration-[900ms] ease-(--ease-luxury) group-hover:opacity-0"
              aria-hidden="true"
            />
          </>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-[1100ms] ease-(--ease-luxury) group-hover:scale-[1.05]"
            style={{
              background: `radial-gradient(ellipse 90% 60% at 50% 10%, rgba(253,246,233,0.8) 0%, transparent 60%), linear-gradient(170deg, ${accent}33 0%, ${accent}5c 60%, ${accent}8a 100%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Caption scrim — benchmark readability tones, deepens on hover */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#120c08]/82 via-[#120c08]/32 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

        {/* Name over the image — rises slightly on hover */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div className="transition-transform duration-500 ease-(--ease-luxury) group-hover:-translate-y-0.5">
              <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-(--color-ivory)/65">
                {categoryLabel[space.category]}
              </p>
              <h3 className={cn(
                'mt-1.5 font-display leading-snug text-(--color-ivory)',
                size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-[1.375rem]',
              )}>
                {space.name}
              </h3>
            </div>
            <span className="shrink-0 font-display italic text-sm text-(--color-ivory)/55" aria-hidden="true">
              {String(space.order).padStart(2, '0')}
            </span>
          </div>

          {/* Reveal line — draws in on hover */}
          <span className="mt-3 flex items-center gap-3 text-[0.55rem] uppercase tracking-[0.22em] text-(--color-ivory)/0 transition-colors duration-500 group-hover:text-(--color-ivory)/80">
            View Space
            <span className="h-px w-0 bg-(--color-gold-light) transition-all duration-500 ease-(--ease-luxury) group-hover:w-10" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
