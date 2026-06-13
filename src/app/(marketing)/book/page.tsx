import type { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Book a Visit — Schedule Your Walkthrough',
  description:
    "Book a walkthrough or enquire about availability at The Picture Villa. Message us on WhatsApp and we'll respond within the hour.",
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <>
      {/* Page header */}
      <Section background="charcoal" noPadding>
        <div
          className="min-h-[42vh] flex items-end pb-16 sm:pb-20"
          style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}
        >
          <Container>
            <p className="text-label text-(--color-sandstone)/40 mb-4">Private Access</p>
            <h1 className="font-display text-display-xl text-(--color-ivory)">
              Let&apos;s plan<br />your shoot.
            </h1>
            <p className="mt-4 text-body text-(--color-sandstone)/55 max-w-sm">
              Every shoot begins with a conversation. Reach us on WhatsApp — we&apos;ll take it from there.
            </p>
          </Container>
        </div>
      </Section>

      {/* Main content */}
      <Section background="ivory">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* WhatsApp — primary channel */}
            <div>
              <p className="text-label text-(--color-mist) mb-6">Primary — WhatsApp</p>
              <p className="font-display text-display-lg text-(--color-charcoal) mb-4 leading-tight">
                The fastest<br />way to reach us.
              </p>
              <p className="text-body text-(--color-mist) mb-8 max-w-sm leading-relaxed">
                Message us on WhatsApp with your vision, preferred dates, and the spaces you have in mind. We respond within the hour during business hours.
              </p>
              <WhatsAppCTA
                size="lg"
                label="Begin on WhatsApp"
                message="Hi! I'd like to plan a shoot at The Picture Villa. Can you help me get started?"
              />
            </div>

            {/* Direct contact */}
            <div>
              <p className="text-label text-(--color-mist) mb-6">Direct Contact</p>
              <p className="font-display text-display-lg text-(--color-charcoal) mb-8 leading-tight">
                Or reach us<br />directly.
              </p>

              <div className="space-y-7">
                <div>
                  <p className="text-label text-(--color-mist) mb-2">Phone</p>
                  <a
                    href={`tel:${SITE.contact.phone}`}
                    className="text-body text-(--color-charcoal) hover:text-(--color-gold) transition-colors duration-200"
                  >
                    {SITE.contact.phoneDisplay}
                  </a>
                </div>

                <div>
                  <p className="text-label text-(--color-mist) mb-2">Email</p>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="text-body text-(--color-charcoal) hover:text-(--color-gold) transition-colors duration-200"
                  >
                    {SITE.contact.email}
                  </a>
                </div>

                <div>
                  <p className="text-label text-(--color-mist) mb-2">Location</p>
                  <p className="text-body text-(--color-charcoal)">{SITE.location.address}</p>
                  <a
                    href={SITE.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-label text-(--color-gold) tracking-[0.14em] uppercase hover:text-(--color-gold-light) transition-colors duration-200"
                  >
                    Open in Maps
                    <svg viewBox="0 0 8 8" className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M1 7L7 1M7 1H3M7 1V5" />
                    </svg>
                  </a>
                </div>

                <div className="pt-5 border-t border-(--color-beige)">
                  <p className="text-body-sm text-(--color-mist) leading-relaxed">
                    Available for walkthroughs<br />Tuesday – Sunday, 10 am – 6 pm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
