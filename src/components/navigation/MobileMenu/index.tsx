'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLockBodyScroll } from '@/lib/hooks/useLockBodyScroll';
import { NAV_CONFIG } from '@/lib/constants/navigation';
import { SITE } from '@/lib/constants/site';
import { menuSlide, backdropFade, staggerContainer, fadeInUp } from '@/lib/animations/variants';
import { buildBookingWhatsAppUrl } from '@/lib/utils/whatsapp';

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  useLockBodyScroll(true);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={backdropFade}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-40 bg-(--color-ink)/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        variants={menuSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed right-0 top-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-(--color-ivory) flex flex-col"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-(--color-beige)">
          <span className="font-display text-[0.9375rem] tracking-[0.2em] uppercase text-(--color-charcoal)">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-(--color-charcoal) hover:text-(--color-gold) transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col px-7 py-8 flex-1 gap-0"
          aria-label="Mobile primary navigation"
        >
          <motion.div variants={fadeInUp}>
            <Link
              href="/"
              onClick={onClose}
              className="block text-label text-(--color-mist) py-4 border-b border-(--color-beige) hover:text-(--color-charcoal) transition-colors duration-200"
            >
              Home
            </Link>
          </motion.div>

          {NAV_CONFIG.primary.map((item) => (
            <motion.div key={item.href} variants={fadeInUp}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block text-label text-(--color-charcoal) py-4 border-b border-(--color-beige) hover:text-(--color-gold) transition-colors duration-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.div variants={fadeInUp}>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between text-label text-(--color-mist) py-4 hover:text-(--color-gold) transition-colors duration-200"
            >
              Instagram
              <svg viewBox="0 0 8 8" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M1 7L7 1M7 1H3M7 1V5" />
              </svg>
            </a>
          </motion.div>
        </motion.nav>

        {/* CTAs */}
        <div className="px-7 pb-10 pt-6 flex flex-col gap-3 border-t border-(--color-beige)">
          <Link
            href={NAV_CONFIG.cta.href}
            onClick={onClose}
            className="flex items-center justify-center h-12 rounded-full bg-(--color-charcoal) text-(--color-ivory) text-label tracking-[0.18em] uppercase hover:bg-(--color-ink) transition-colors duration-200"
          >
            Book a Visit
          </Link>
          <a
            href={buildBookingWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 h-12 rounded-full border border-(--color-sandstone) text-(--color-charcoal) text-label tracking-[0.18em] uppercase hover:border-(--color-charcoal) transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </>
  );
}
