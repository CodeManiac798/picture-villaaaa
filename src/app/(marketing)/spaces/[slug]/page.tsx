import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSpaceBySlug, SPACE_SLUGS } from '@/lib/data/spaces';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SPACE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) return {};

  return {
    title: `${space.name} — ${space.tagline}`,
    description: space.description,
    openGraph: {
      images: [{
        url: space.coverImage.src,
        width: space.coverImage.width,
        height: space.coverImage.height,
        alt: space.coverImage.alt,
      }],
    },
    alternates: { canonical: `/spaces/${slug}` },
  };
}

/*
 * PHASE 2 sections:
 * SpaceHero → SpaceDetails → SpaceGallery (lightbox) → SpaceCTA → RelatedSpaces
 */
export default async function SpacePage({ params }: Props) {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) notFound();

  return (
    <div className="min-h-screen pt-(--header-height) bg-(--color-ivory)">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20">
        <p className="text-label text-(--color-mist) mb-3">
          {space.category.charAt(0).toUpperCase() + space.category.slice(1)}
        </p>
        <h1 className="font-display text-display-xl text-(--color-charcoal)">{space.name}</h1>
        <p className="text-body-lg text-(--color-mist) mt-4 max-w-xl">{space.atmosphere}</p>
        <p className="text-body text-(--color-charcoal)/80 mt-6 max-w-xl">{space.description}</p>
        <p className="text-body-sm text-(--color-sandstone) mt-12">
          Full space detail page coming in Phase 2.
        </p>
      </div>
    </div>
  );
}
