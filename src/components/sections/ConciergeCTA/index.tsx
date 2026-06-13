import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/lib/constants/site';
import { buildBookingWhatsAppUrl } from '@/lib/utils/whatsapp';

/*
 * Beat 6 — concierge close. A dreamy golden-hour photograph washed in warm
 * champagne so it glows behind the invitation. Private hospitality voice.
 */
export function ConciergeCTA() {
  return (
    <section className="relative overflow-hidden bg-(--color-cream)">
      {/* Immersive warm background — alive, drifting like a held memory */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-kenburns absolute -inset-[5%]">
          <Image
            src="/images/prewedding/pre wedding 3.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Champagne wash — lighter at centre so the moment reads through, never dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(237,229,216,0.68) 0%, rgba(237,229,216,0.86) 55%, rgba(237,229,216,0.94) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 118%, rgba(176,138,87,0.22), transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-32 sm:py-36 lg:py-48 text-center">
        <Reveal>
          <p className="text-eyebrow text-(--color-gold)">
            Private Bookings &middot; By Appointment
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-heading mt-7 text-(--color-ink)">
            Your story could begin{' '}
            <span className="accent-serif text-(--color-gold)">here.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-7 h-px w-16 bg-(--color-gold)/60" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-[40ch] text-body-lg text-(--color-ink)/75 leading-relaxed">
            One production at a time. Tell us what you&apos;re making —
            we&apos;ll open the gates.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <a
              href={buildBookingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift inline-flex items-center justify-center h-[54px] px-11 rounded-full bg-(--color-ink) text-(--color-ivory) text-label tracking-[0.18em] uppercase"
            >
              Message the Concierge
            </a>
            <Link
              href="/book"
              className="group relative py-2 text-label tracking-[0.18em] uppercase text-(--color-ink) after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-(--color-gold)/50 after:transition-colors after:duration-300 hover:after:bg-(--color-gold)"
            >
              Book a Visit
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-14 text-[0.625rem] tracking-[0.25em] uppercase text-(--color-ink)/50">
            {SITE.contact.phoneDisplay} &middot; {SITE.location.area}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
