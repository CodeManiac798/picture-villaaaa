import Image from 'next/image';
import Link from 'next/link';
import { SHOOT_CATEGORIES } from '@/lib/data/shoots';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

/*
 * Shoot categories — clients arrive wanting an aesthetic, not a room.
 * Three large editorial covers with real media, offset rhythm, alive hover.
 */
export function ShootCategories() {
  return (
    <section className="bg-(--color-cream) py-20 sm:py-24 lg:py-28 overflow-hidden">
      <Container>

        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <Reveal>
            <p className="text-eyebrow text-(--color-gold)">What you&apos;ll create here</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-heading text-balance mt-5 text-(--color-ink)">
              One estate.{' '}
              <span className="accent-serif text-(--color-mist)">Every kind of shoot.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-body text-(--color-mist) leading-relaxed">
              From the first frame of a love story to a national campaign —
              the spaces adapt to the work.
            </p>
          </Reveal>
        </div>

        {/* Category covers — offset rhythm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {SHOOT_CATEGORIES.map((cat, i) => (
            <Reveal
              key={cat.slug}
              y={40}
              delay={i * 0.1}
              className={i === 1 ? 'lg:mt-12' : i === 2 ? 'lg:mt-24' : undefined}
            >
              <Link href={`/shoots/${cat.slug}`} className="group block" aria-label={cat.name}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-(--color-beige) shadow-[0_22px_54px_-24px_rgba(40,24,16,0.45)]">
                  <Image
                    src={cat.cover}
                    alt={cat.coverAlt}
                    fill
                    className="object-cover object-center transition-transform duration-[1200ms] ease-(--ease-luxury) group-hover:scale-[1.07]"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw"
                  />
                  {/* warm grade tint to unify tones */}
                  <div
                    className="absolute inset-0 mix-blend-soft-light opacity-40"
                    style={{ background: `linear-gradient(168deg, ${cat.accent}00 0%, ${cat.accent}cc 100%)` }}
                    aria-hidden="true"
                  />
                  <div className="img-overlay" aria-hidden="true" />

                  {/* Identity */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-[0.625rem] tracking-[0.25em] uppercase text-(--color-gold-light)">
                      {cat.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl text-(--color-ivory) transition-transform duration-500 ease-(--ease-luxury) group-hover:-translate-y-0.5">
                      {cat.name}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-3 text-[0.625rem] tracking-[0.22em] uppercase text-(--color-ivory)/85">
                      Explore
                      <span className="h-px w-7 bg-(--color-ivory)/60 transition-all duration-500 ease-(--ease-luxury) group-hover:w-12 group-hover:bg-(--color-gold-light)" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
