import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants/site';
import { NOTABLE_CLIENTS } from '@/lib/data/services';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'About — The Picture Villa',
  description: `Established in ${SITE.established}. Three private acres and 18 handcrafted cinematic spaces in Bijwasan, New Delhi — Delhi NCR's most distinctive photoshoot estate.`,
  alternates: { canonical: '/experience' },
};

const STATS = [
  { value: String(SITE.stats.spaces),               label: 'Handcrafted spaces' },
  { value: `0${SITE.stats.acres}`,                  label: 'Private acres' },
  { value: `’${String(SITE.established).slice(2)}`, label: 'On this ground since' },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero header */}
      <section className="relative min-h-[62vh] flex flex-col justify-end overflow-hidden bg-(--color-cream)">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 55% at 50% 0%, rgba(253,246,233,0.9), transparent 60%), linear-gradient(178deg, #E7D2B0 0%, #D4B488 55%, #A9855E 100%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#171412]/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#171412]/60 via-[#171412]/16 to-transparent" aria-hidden="true" />
        <Container className="relative z-10 pb-20 sm:pb-24" style={{ paddingTop: 'var(--header-height)' }}>
          <Reveal>
            <p className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-(--color-ivory)/75">
              About the Estate
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-display-2xl text-(--color-ivory) max-w-[15ch]">
              An estate built{' '}
              <em className="italic font-light">for the lens.</em>
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-(--color-cream) py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <h2 className="font-display text-display-lg text-(--color-charcoal) max-w-[20ch]">
                  Since {SITE.established}, in {SITE.location.area}.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-body-lg text-(--color-charcoal)/75 leading-relaxed max-w-[56ch]">
                  The Picture Villa began with a simple idea: that the best
                  locations shouldn&apos;t require a flight. Across three private
                  acres, we built eighteen distinct worlds — palace courts,
                  flower tunnels, Mediterranean arches, intimate interiors —
                  each designed, dressed and maintained for photography and film.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body text-(--color-mist) leading-relaxed max-w-[56ch]">
                  Every set is kept like a film stage and reset between
                  productions. The result is a single estate that moves from a
                  Rajput court to a Parisian kitchen in a few steps — twenty
                  minutes from the city, and entirely your own for the day.
                </p>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-4 lg:col-start-9" y={40}>
              <div className="relative aspect-[3/4] overflow-hidden bg-(--color-beige) shadow-[0_24px_60px_rgba(23,20,18,0.18)]">
                {/* IMAGE SLOT — <Image src="/images/about/estate.jpg" alt="" fill className="object-cover" /> */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 85% 55% at 50% 12%, rgba(253,246,233,0.85), transparent 60%), linear-gradient(175deg, #EAD8BB 0%, #D6BB92 55%, #B0895C 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-(--color-ivory) py-16 sm:py-20 lg:py-24 border-y border-(--color-beige)">
        <Container>
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-(--color-charcoal)">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.625rem] tracking-[0.2em] uppercase text-(--color-mist) leading-relaxed">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Clients */}
      <section className="bg-(--color-ivory) py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="text-label text-(--color-gold) mb-8">Trusted by</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5">
              {NOTABLE_CLIENTS.map((name) => (
                <span key={name} className="font-display text-2xl sm:text-3xl text-(--color-charcoal)/80">
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Location + CTA */}
      <section className="relative bg-(--color-cream) overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 115%, rgba(176,138,87,0.18), transparent 65%)' }}
          aria-hidden="true"
        />
        <Container className="relative z-10 py-24 sm:py-28 lg:py-32 text-center">
          <Reveal>
            <p className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-(--color-gold)">
              {SITE.location.area}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-7 max-w-[20ch] font-display text-display-lg text-(--color-charcoal)">
              Come see it in person.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-[40ch] text-body text-(--color-charcoal)/70 leading-relaxed">
              {SITE.location.address}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <Link
                href="/book"
                className="inline-flex items-center justify-center h-[54px] px-11 rounded-full bg-(--color-charcoal) text-(--color-ivory) text-label tracking-[0.18em] uppercase transition-all duration-300 hover:bg-(--color-ink) hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(23,20,18,0.22)]"
              >
                Book a Visit
              </Link>
              <a
                href={SITE.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-2 text-label tracking-[0.18em] uppercase text-(--color-charcoal) after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-(--color-gold)/50 after:transition-colors after:duration-300 hover:after:bg-(--color-gold)"
              >
                Open in Maps
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
