import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

/*
 * Beat 2 — the estate, felt emotionally. Warm champagne, a real plate that
 * rides up over the hero. Self-insertion, not a venue brochure.
 */
export function IntroStatement() {
  return (
    <section className="relative bg-(--color-cream)">
      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Statement */}
          <div className="lg:col-span-6 lg:pr-8">
            <Reveal>
              <p className="text-eyebrow text-(--color-gold)">The Estate</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-heading text-balance mt-5 text-(--color-ink) max-w-[20ch]">
                Step through the gate, and{' '}
                <span className="accent-serif text-(--color-gold)">the world changes.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[46ch] text-body-lg text-(--color-mist) leading-relaxed">
                Palace courts, flower tunnels, Mediterranean terraces — eighteen
                built worlds across three private acres, each made for one thing:
                making you look unforgettable.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="font-display text-3xl text-(--color-ink)">18</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.2em] uppercase text-(--color-mist)">Worlds</p>
                </div>
                <div className="h-10 w-px bg-(--color-sandstone)" aria-hidden="true" />
                <div>
                  <p className="font-display text-3xl text-(--color-ink)">03</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.2em] uppercase text-(--color-mist)">Private acres</p>
                </div>
                <div className="h-10 w-px bg-(--color-sandstone)" aria-hidden="true" />
                <div>
                  <p className="font-display text-3xl text-(--color-ink)">20</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.2em] uppercase text-(--color-mist)">Mins from the city</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Floating plate — rides up over the hero photograph */}
          <div className="lg:col-span-5 lg:col-start-8 relative z-20 lg:-mt-44">
            <Reveal y={44}>
              <figure className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-(--color-beige) shadow-[0_30px_70px_-28px_rgba(40,24,16,0.5)]">
                  <Image
                    src="/images/hero/pre wedding 2.jpeg"
                    alt="A couple sharing a quiet moment in the library at The Picture Villa"
                    fill
                    className="object-cover object-center transition-transform duration-[1200ms] ease-(--ease-luxury) group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 90vw, 38vw"
                  />
                  <div className="img-overlay" aria-hidden="true" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-4 text-[0.6rem] tracking-[0.22em] uppercase text-(--color-ivory)/80">
                    <span>The Library</span>
                    <span className="text-(--color-ivory)/55">14 / 18</span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
