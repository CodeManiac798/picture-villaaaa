import Link from 'next/link';
import { SPACES } from '@/lib/data/spaces';
import { SpaceCard } from '@/components/ui/SpaceCard';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

/*
 * Beat 3 — signature spaces. The bright reveal after two dark beats.
 * Asymmetric editorial composition: four large plates, no uniform grid.
 */

const pick = (slug: string) => SPACES.find((s) => s.slug === slug)!;

const rajMahal   = pick('raj-mahal');
const colonnade  = pick('the-colonnade');
const library    = pick('the-library');
const oldEnglish = pick('old-english-sit-out-area');
const rusticCafe = pick('rustic-cafe-and-bar');

export function SpacesPreview() {
  return (
    <section className="bg-(--color-ivory) py-20 sm:py-24 lg:py-28 overflow-hidden">
      <Container>

        {/* Row A — header beside the hero plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-7 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-5 lg:pb-6">
            <Reveal>
              <p className="text-eyebrow text-(--color-gold)">Eighteen Worlds, One Estate</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-heading text-balance mt-5 text-(--color-ink)">
                A different world,{' '}
                <span className="accent-serif text-(--color-mist)">every few steps.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-[40ch] text-body text-(--color-mist) leading-relaxed">
                A Rajput palace. A Moroccan courtyard. A library, a café, an English
                garden — each one staged, lit and waiting for you to walk in.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" y={36}>
            <SpaceCard space={rajMahal} aspect="wide" size="lg" />
          </Reveal>
        </div>

        {/* Row B — two portraits, gently offset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-5 lg:gap-x-7 mb-12 lg:mb-16">
          <Reveal className="lg:col-span-6" y={36}>
            <SpaceCard space={library} aspect="portrait" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:mt-16" y={36} delay={0.1}>
            <SpaceCard space={colonnade} aspect="portrait" />
          </Reveal>
        </div>

        {/* Row C — closing plate with the CTA set against it */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-7 items-end">
          <Reveal className="lg:col-span-7 lg:order-last" y={36}>
            <SpaceCard space={oldEnglish} aspect="wide" size="lg" />
          </Reveal>
          <div className="lg:col-span-5 lg:pb-6">
            <Reveal className="mb-6 lg:hidden">
              <SpaceCard space={rusticCafe} aspect="landscape" />
            </Reveal>
            <Reveal>
              <p className="font-display italic text-xl text-(--color-mist)">
                — and {SPACES.length - 4} more worlds beyond these.
              </p>
              <Link
                href="/spaces"
                className="hover-lift mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-(--color-ink) px-8 text-label tracking-[0.18em] uppercase text-(--color-ivory)"
              >
                Explore all {SPACES.length} spaces
                <span
                  className="h-px w-8 bg-(--color-gold-light) transition-all duration-500 ease-(--ease-luxury) group-hover:w-12"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
