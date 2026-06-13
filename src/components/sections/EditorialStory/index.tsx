import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/lib/constants/site';
import { GRAIN } from '@/lib/constants/textures';

/*
 * Beat 4 — why the villa. No longer a flat dark gradient: a cinematic
 * full-bleed photograph with a warm graded overlay — a film-poster beat.
 * Extra bottom padding receives the gallery plate overlap.
 */

const STATS = [
  { value: String(SITE.stats.spaces),               label: 'Built worlds' },
  { value: `0${SITE.stats.acres}`,                  label: 'Private acres' },
  { value: `’${String(SITE.established).slice(2)}`, label: 'On this ground since' },
] as const;

const CLIENTS = ['Nykaa', 'Spotify India', 'Paytm', "Pond's", 'Nestlé'] as const;

export function EditorialStory() {
  return (
    <section className="relative overflow-hidden bg-(--color-ink)">
      {/* Full-bleed cinematic photograph — breathing, never frozen */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-kenburns absolute -inset-[5%]">
          <Image
            src="/images/fashion/fashion7.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Warm graded overlay — keeps it cinematic and text-legible, never muddy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(20,12,8,0.92) 0%, rgba(20,12,8,0.78) 38%, rgba(26,16,10,0.45) 70%, rgba(40,24,14,0.35) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 12% 8%, rgba(176,138,87,0.18), transparent 60%)' }}
        />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
      </div>

      <Container className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-44 sm:pb-52 lg:pb-60">

        <Reveal>
          <p className="text-eyebrow text-(--color-gold-light)">Why The Picture Villa</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-heading text-balance mt-6 max-w-[18ch] text-(--color-ivory)">
            You&apos;ve already seen this place.{' '}
            <span className="accent-serif text-(--color-gold-light)">
              You just didn&apos;t know where.
            </span>
          </h2>
        </Reveal>

        {/* Story + stats */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-6 space-y-5">
            <Reveal delay={0.1}>
              <p className="text-body-lg text-(--color-ivory)/85 leading-relaxed max-w-[50ch]">
                This estate is the quiet constant behind campaign films, music
                videos and editorials seen by millions — the location crews
                don&apos;t talk about, and audiences always recognise.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body text-(--color-ivory)/65 leading-relaxed max-w-[50ch]">
                Every set is kept like a film stage — dressed, lit and reset
                between productions. You arrive, you shoot. The estate does the rest.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-3 gap-6">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.1}>
                  <p className="font-display text-4xl sm:text-5xl text-(--color-ivory)">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.6rem] tracking-[0.2em] uppercase text-(--color-sandstone)/80 leading-relaxed">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Credit roll */}
        <Reveal delay={0.2}>
          <div className="mt-14 lg:mt-20 border-t border-(--color-ivory)/15 pt-8">
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
              <p className="text-[0.625rem] tracking-[0.25em] uppercase text-(--color-sandstone)/70">
                Seen in work for
              </p>
              {CLIENTS.map((name) => (
                <span
                  key={name}
                  className="font-display text-lg sm:text-xl text-(--color-ivory)/80 transition-colors duration-300 hover:text-(--color-gold-light)"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
