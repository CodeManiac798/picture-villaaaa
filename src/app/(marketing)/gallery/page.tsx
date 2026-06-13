import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery — The Work',
  description:
    'A curated selection of photography and videography from The Picture Villa — fashion, pre-wedding, bridal and commercial shoots across 18 unique spaces.',
  alternates: { canonical: '/gallery' },
};

/*
 * PHASE 2 sections:
 * GalleryHero → FilterTabs (All / Pre-Wedding / Fashion / Commercial / Music Video)
 * → MasonryGrid with lightbox → InstagramFeedTeaser
 */
export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-(--header-height) bg-(--color-ivory)">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20">
        <p className="text-label text-(--color-mist) mb-4">Gallery</p>
        <h1 className="font-display text-display-xl text-(--color-charcoal)">The work.</h1>
        <p className="text-body text-(--color-mist) mt-4 max-w-lg">
          Fashion. Pre-wedding. Commercial. Music video. Every frame shot at The Picture Villa.
        </p>
        <p className="text-body-sm text-(--color-sandstone) mt-12">
          Gallery grid coming in Phase 2.
        </p>
      </div>
    </div>
  );
}
