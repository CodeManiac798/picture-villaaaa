import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getShootBySlug,
  getCuratedSpacesForShoot,
  SHOOT_SLUGS,
} from '@/lib/data/shoots';
import { SITE } from '@/lib/constants/site';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SpaceCard } from '@/components/ui/SpaceCard';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return SHOOT_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const shoot = getShootBySlug(category);
  if (!shoot) return {};

  return {
    title: `${shoot.name} Shoots — ${SITE.name}`,
    description: shoot.description,
    alternates: { canonical: `/shoots/${category}` },
  };
}

export default async function ShootCategoryPage({ params }: Props) {
  const { category } = await params;
  const shoot = getShootBySlug(category);
  if (!shoot) notFound();

  const spaces = getCuratedSpacesForShoot(shoot);
  const waMessage = `Hi! I'd like to plan a ${shoot.name.toLowerCase()} shoot at The Picture Villa. Could you share availability and pricing?`;

  return (
    <>
      {/* Hero — luminous, photography-first */}
      <section className="relative min-h-[78vh] flex flex-col justify-end overflow-hidden bg-(--color-cream)">
        {/*
         * IMAGE SLOT — replace with:
         * <Image src={`/images/shoots/${shoot.slug}-hero.jpg`} alt="" fill priority className="object-cover" />
         */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 95% 55% at 50% 0%, rgba(253,246,233,0.9), transparent 60%), linear-gradient(178deg, ${shoot.accent}59 0%, ${shoot.accent}96 55%, ${shoot.accent}c2 100%)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#171412]/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#171412]/62 via-[#171412]/18 to-transparent" aria-hidden="true" />

        <Container className="relative z-10 pb-20 sm:pb-24" style={{ paddingTop: 'var(--header-height)' }}>
          <Reveal>
            <p className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-(--color-ivory)/75">
              {shoot.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-display-2xl text-(--color-ivory) max-w-[16ch]">
              {shoot.headline}
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-(--color-cream) py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <Reveal className="lg:col-span-8">
              <p className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-snug text-(--color-charcoal) max-w-[24ch]">
                {shoot.name}
              </p>
              <p className="mt-6 max-w-[54ch] text-body-lg text-(--color-charcoal)/75 leading-relaxed">
                {shoot.intro}
              </p>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:text-right" delay={0.1}>
              <p className="font-display italic text-xl text-(--color-gold)">
                {spaces.length} spaces suited to this work
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Curated spaces */}
      <section className="bg-(--color-ivory) py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="text-label text-(--color-mist) mb-10 lg:mb-14">Recommended backdrops</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {spaces.map((space, i) => (
              <Reveal key={space.slug} y={32} delay={(i % 3) * 0.08}>
                <SpaceCard space={space} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Concierge CTA */}
      <section className="relative bg-(--color-cream) overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 115%, rgba(176,138,87,0.18), transparent 65%)' }}
          aria-hidden="true"
        />
        <Container className="relative z-10 py-24 sm:py-28 lg:py-32 text-center">
          <Reveal>
            <p className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-(--color-gold)">
              Private Bookings &middot; By Appointment
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-7 max-w-[18ch] font-display text-display-lg text-(--color-charcoal)">
              Tell us about your shoot.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[54px] px-11 rounded-full bg-(--color-charcoal) text-(--color-ivory) text-label tracking-[0.18em] uppercase transition-all duration-300 hover:bg-(--color-ink) hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(23,20,18,0.22)]"
              >
                Message the Concierge
              </a>
              <Link
                href="/spaces"
                className="group relative py-2 text-label tracking-[0.18em] uppercase text-(--color-charcoal) after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-(--color-gold)/50 after:transition-colors after:duration-300 hover:after:bg-(--color-gold)"
              >
                Browse all spaces
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
