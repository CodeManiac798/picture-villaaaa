'use client';

import { useState } from 'react';
import type { Space, SpaceCategory } from '@/types/space';
import { SpaceCard } from '@/components/ui/SpaceCard';
import { cn } from '@/lib/utils/cn';

type FilterValue = 'all' | SpaceCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all',           label: 'All' },
  { value: 'palatial',      label: 'Palatial' },
  { value: 'international', label: 'International' },
  { value: 'natural',       label: 'Natural' },
  { value: 'social',        label: 'Social' },
  { value: 'intimate',      label: 'Intimate' },
];

interface SpacesGridProps {
  spaces: Space[];
}

export function SpacesGrid({ spaces }: SpacesGridProps) {
  const [active, setActive] = useState<FilterValue>('all');

  const filtered = active === 'all'
    ? spaces
    : spaces.filter((s) => s.category === active);

  return (
    <div>
      {/* Category filter */}
      <div
        className="flex flex-wrap gap-x-6 gap-y-3 mb-12 lg:mb-14"
        role="tablist"
        aria-label="Filter spaces by category"
      >
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={active === value}
            onClick={() => setActive(value)}
            className={cn(
              'text-label tracking-[0.16em] uppercase pb-1 transition-all duration-200',
              'border-b',
              active === value
                ? 'text-(--color-charcoal) border-(--color-charcoal)'
                : 'text-(--color-mist) border-transparent hover:text-(--color-charcoal) hover:border-(--color-beige)',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {filtered.map((space) => (
          <SpaceCard key={space.slug} space={space} />
        ))}
      </div>
    </div>
  );
}
