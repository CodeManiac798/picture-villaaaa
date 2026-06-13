import Link from 'next/link';
import { SITE } from '@/lib/constants/site';
import { NAV_CONFIG } from '@/lib/constants/navigation';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/ui/Divider';

export function Footer() {
  return (
    <footer className="bg-(--color-charcoal) text-(--color-sandstone)">
      <Container className="py-16 lg:py-20">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand block */}
          <div className="max-w-xs">
            <p className="font-display text-2xl text-(--color-ivory) tracking-widest uppercase mb-4">
              The Picture Villa
            </p>
            <p className="text-body-sm text-(--color-sandstone)/80 leading-relaxed">
              Delhi NCR&apos;s most distinctive photoshoot venue. 18 cinematic spaces across 3 acres in Bijwasan.
            </p>
          </div>

          {/* Nav + Contact */}
          <div className="flex flex-col sm:flex-row gap-12">
            {/* Nav */}
            <div>
              <p className="text-label text-(--color-sandstone)/50 mb-4">Navigate</p>
              <ul className="space-y-3">
                {[{ label: 'Home', href: '/', external: false }, ...NAV_CONFIG.primary, NAV_CONFIG.cta].map(
                  (item) => (
                    <li key={item.href}>
                      {'external' in item && item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body-sm text-(--color-sandstone)/80 hover:text-(--color-gold) transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-body-sm text-(--color-sandstone)/80 hover:text-(--color-gold) transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-label text-(--color-sandstone)/50 mb-4">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${SITE.contact.phone}`}
                    className="text-body-sm text-(--color-sandstone)/80 hover:text-(--color-gold) transition-colors"
                  >
                    {SITE.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="text-body-sm text-(--color-sandstone)/80 hover:text-(--color-gold) transition-colors"
                  >
                    {SITE.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-(--color-sandstone)/80 hover:text-(--color-gold) transition-colors"
                  >
                    {SITE.social.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Divider variant="gold" className="my-10 opacity-20" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-body-sm text-(--color-sandstone)/40">
            {SITE.location.address}
          </p>
          <p className="text-body-sm text-(--color-sandstone)/40">
            © {new Date().getFullYear()} The Picture Villa. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
