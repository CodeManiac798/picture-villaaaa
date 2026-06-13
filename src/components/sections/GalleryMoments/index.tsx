import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/lib/constants/site';

/*
 * Beat 5 — gallery moments. Real film stills, not a grid.
 * The wide plate rides up over the story section's cinematic close.
 */

interface PlateProps {
  className?: string;
  caption: string;
  meta: string;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

function Plate({ className, caption, meta, src, alt, sizes }: PlateProps) {
  return (
    <figure className={className}>
      <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-(--color-beige) shadow-[0_24px_60px_-26px_rgba(40,24,16,0.5)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-[1300ms] ease-(--ease-luxury) group-hover:scale-[1.06]"
          sizes={sizes}
        />
        <div className="img-overlay" aria-hidden="true" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-5 sm:p-6">
          <span className="text-[0.625rem] tracking-[0.25em] uppercase text-(--color-ivory)/80">{caption}</span>
          <span className="text-[0.625rem] tracking-[0.25em] uppercase text-(--color-ivory)/50">{meta}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function GalleryMoments() {
  return (
    <section className="bg-(--color-cream) pb-20 sm:pb-24 lg:pb-28">

      {/* Hero plate — near full-bleed, overlapping the story section above */}
      <div className="relative z-10 -mt-24 sm:-mt-32 lg:-mt-40 px-3 sm:px-6">
        <Reveal y={40}>
          <Plate
            className="h-[52vh] sm:h-[64vh]"
            caption="The Colonnade — Moroccan Courtyard"
            meta="Dusk"
            src="/images/spaces/The collonade.jpeg"
            alt="The Moroccan-pink colonnade courtyard at The Picture Villa, lit at dusk"
            sizes="100vw"
          />
        </Reveal>
      </div>

      {/* Editorial row — offset plates around a statement */}
      <Container className="mt-12 sm:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-6 items-center">

          <Reveal className="lg:col-span-4" y={36}>
            <Plate
              className="aspect-[3/4]"
              caption="The Glass House"
              meta="First light"
              src="/images/prewedding/pre wedding 4.jpg"
              alt="A couple framed in the glass-house doorway at The Picture Villa"
              sizes="(max-width: 1024px) 90vw, 30vw"
            />
          </Reveal>

          <div className="lg:col-span-4 lg:px-6">
            <Reveal delay={0.1}>
              <p className="text-eyebrow text-(--color-gold)">The Work</p>
              <p className="mt-5 text-heading text-balance text-(--color-ink)">
                Nothing here is borrowed.{' '}
                <span className="accent-serif text-(--color-mist)">Everything is kept.</span>
              </p>
              <p className="mt-5 text-body text-(--color-mist) leading-relaxed">
                Every space is built, dressed and maintained on the estate — so every
                frame feels like a destination shoot, twenty minutes from the city.
              </p>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-4 text-label tracking-[0.2em] uppercase text-(--color-charcoal)"
              >
                Recent work — {SITE.social.instagramHandle}
                <span
                  className="h-px w-10 bg-(--color-charcoal) transition-all duration-500 ease-(--ease-luxury) group-hover:w-16 group-hover:bg-(--color-gold)"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-4 lg:mt-16" y={36} delay={0.15}>
            <Plate
              className="aspect-[4/5]"
              caption="Santorini Steps"
              meta="Golden hour"
              src="/images/prewedding/pre wed 5.jpg"
              alt="A couple laughing together on whitewashed steps at The Picture Villa"
              sizes="(max-width: 1024px) 90vw, 30vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
