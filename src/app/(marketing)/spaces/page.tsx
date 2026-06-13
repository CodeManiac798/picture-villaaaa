import type { Metadata } from 'next';
import { SPACES } from '@/lib/data/spaces';
import { SITE } from '@/lib/constants/site';
import { Container } from '@/components/layout/Container';
import { SpacesGrid } from '@/components/sections/SpacesGrid';

export const metadata: Metadata = {
  title: `Spaces — ${SITE.stats.spaces} Cinematic Backdrops`,
  description:
    'Explore 18 distinct shoot spaces at The Picture Villa — palatial Indian settings, international-inspired rooms, garden terraces and intimate interiors across 3 acres in Delhi NCR.',
  alternates: { canonical: '/spaces' },
};

export default function SpacesPage() {
  return (
    <div className="bg-(--color-ivory)">

      {/* Page header */}
      <div
        className="border-b border-(--color-beige)"
        style={{ paddingTop: 'calc(var(--header-height) + 3.5rem)' }}
      >
        <Container className="pb-14 sm:pb-16">
          <p className="text-label text-(--color-mist) mb-4">Our Spaces</p>
          <h1 className="font-display text-display-xl text-(--color-charcoal)">
            {SPACES.length} cinematic<br className="hidden sm:block" /> backdrops.
          </h1>
          <p className="mt-4 text-body text-(--color-mist) max-w-lg">
            From palatial Indian settings to intimate European-inspired rooms — every space designed for exceptional photography.
          </p>
        </Container>
      </div>

      {/* Filterable grid */}
      <Container className="py-14 sm:py-16 lg:py-20">
        <SpacesGrid spaces={SPACES} />
      </Container>
    </div>
  );
}
