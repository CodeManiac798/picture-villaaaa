import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { GRAIN } from '@/lib/constants/textures';
import { STORIES_GALLERY } from '@/lib/media/galleryAssets';
import { SITE } from '@/lib/constants/site';
import type { GalleryItem } from '@/lib/media/types';

/*
 * "Stories From The Villa" — curated social proof gallery.
 *
 * This is NOT an Instagram embed. Every cell is hand-picked and
 * intentionally composed in a premium editorial grid.
 *
 * Layout: pseudo-masonry CSS Grid with explicit grid-area placement.
 * Each item has a `span` value ('tall' | 'wide' | 'square') that maps to
 * a CSS grid-row/col-span variant for visual rhythm. On mobile: 2-col grid.
 *
 * Hover: CSS group-hover reveals a translucent warm overlay + caption chip.
 * No JS hover state — keeps this section lightweight.
 *
 * MEDIA SWAP: replace the gradient placeholder inside each MEDIA SLOT with
 * <Image src={item.image?.src} ... fill className="img-cover" />
 * All hover logic, grid placement, and spacing survive unchanged.
 */

/* Warm gradient standins per category — tonally distinct, all premium warm. */
const CATEGORY_GRADES: Record<GalleryItem['category'], string> = {
  prewedding: 'linear-gradient(165deg, #F5DBCF 0%, #E4AA90 42%, #B06A52 78%, #6E3A2A 100%)',
  fashion:    'linear-gradient(165deg, #EDE5D6 0%, #C5AF88 45%, #7D5F3E 80%, #3E2E1C 100%)',
  cinematic:  'linear-gradient(165deg, #E5D0BC 0%, #B07850 48%, #5C3626 80%, #2A1810 100%)',
  bts:        'linear-gradient(165deg, #F2E8D6 0%, #D6BC8A 48%, #A88245 80%, #5C4420 100%)',
  space:      'linear-gradient(165deg, #F0E5D5 0%, #D8C2A0 45%, #A08264 78%, #5A4030 100%)',
};

function GalleryCell({ item, index }: { item: GalleryItem; index: number }) {
  const aspectClass = item.span === 'tall' ? 'aspect-[3/4]' : item.span === 'wide' ? 'aspect-[16/9]' : 'aspect-square';

  return (
    <Reveal delay={index * 0.05} y={14} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
      <div className="group relative overflow-hidden rounded-[var(--radius-card)]">
        <div className={`relative w-full overflow-hidden ${aspectClass}`}>
          {/* ── MEDIA SLOT ───────────────────────────────────────────────────────
              Real image is rendered when item.image?.src is present. */}
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
            {item.image?.src ? (
              <Image
                src={item.image.src}
                alt={item.image.alt ?? ''}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: CATEGORY_GRADES[item.category] }} aria-hidden="true" />
            )}
            {/* grain */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
          </div>

          {/* warm overlay on hover */}
          <div className="absolute inset-0 bg-(--color-ink)/0 transition-colors duration-500 group-hover:bg-(--color-ink)/25" aria-hidden="true" />

          {/* caption chip — slides up on hover */}
          {item.caption && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
              <div className="bg-gradient-to-t from-[#120c08]/82 via-[#120c08]/32 to-transparent p-4 pt-10">
                <p className="text-eyebrow text-[0.5rem] text-white/75">{item.caption}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function StoriesFromVilla() {
  return (
    <section className="relative bg-(--color-ivory) py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="text-eyebrow text-(--color-gold)">Stories From The Villa</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-heading text-balance mt-4 max-w-[18ch] text-(--color-ink)">
                Real moments,{' '}
                <span className="accent-serif text-(--color-mist)">real people.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 pb-1 text-label uppercase tracking-[0.18em] text-(--color-mist) hover:text-(--color-ink) transition-colors duration-300"
            >
              See More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Masonry — true CSS columns so cards pack gaplessly at every width */}
        <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
          {STORIES_GALLERY.map((item, i) => (
            <GalleryCell key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Instagram CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
            <p className="text-body text-(--color-mist)">
              More stories every week on Instagram.
            </p>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift inline-flex h-11 items-center justify-center gap-2 rounded-full border border-(--color-sandstone) px-7 text-label uppercase tracking-[0.18em] text-(--color-charcoal) transition-colors duration-300 hover:border-(--color-charcoal)"
            >
              {SITE.social.instagramHandle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
