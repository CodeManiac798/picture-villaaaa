'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NAV_CONFIG } from '@/lib/constants/navigation';
import { SITE } from '@/lib/constants/site';
import { cn } from '@/lib/utils/cn';
import { MobileMenu } from '@/components/navigation/MobileMenu';

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Warm glass on scroll + hide on scroll-down / reveal on scroll-up.
  // The hero sits on a light warm wash, so nav text stays dark throughout.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > last && y > 140);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const concealed = hidden && !menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,border-color] duration-500',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled ? 'glass-warm border-b border-(--color-beige)/70' : 'border-b border-transparent',
          concealed ? '-translate-y-full' : 'translate-y-0',
        )}
        style={{ height: 'var(--header-height)' }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left — brand + primary nav as one evenly-spaced unit, so the
              gap after the logo matches the gaps between nav links. */}
          <div className="flex items-center gap-8 xl:gap-11">
            {/* Logo */}
            <Link
              href="/"
              className="whitespace-nowrap font-display text-[1.0625rem] uppercase tracking-[0.3em] text-(--color-charcoal) transition-colors duration-300 hover:text-(--color-gold)"
              aria-label="The Picture Villa — home"
            >
              The Picture Villa
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 lg:flex xl:gap-11" aria-label="Primary navigation">
              {NAV_CONFIG.primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-label tracking-[0.2em] text-(--color-charcoal) transition-colors duration-300 hover:text-(--color-gold)',
                    'after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-(--color-gold)',
                    'after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-(--ease-luxury)',
                    'hover:after:origin-left hover:after:scale-x-100',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop right cluster — Instagram + CTA */}
          <div className="hidden items-center gap-7 lg:flex">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Picture Villa on Instagram"
              className="text-(--color-charcoal) transition-colors duration-300 hover:text-(--color-gold)"
            >
              <InstagramGlyph className="h-[18px] w-[18px]" />
            </a>
            <Link
              href={NAV_CONFIG.cta.href}
              className="hover-lift inline-flex h-10 items-center justify-center rounded-full bg-(--color-ink) px-7 text-label uppercase tracking-[0.18em] text-(--color-ivory)"
            >
              {NAV_CONFIG.cta.label}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="-mr-2 flex flex-col justify-center gap-[5px] p-2 text-(--color-charcoal) lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={cn('block h-px w-6 origin-center bg-current transition-all duration-300', menuOpen && 'translate-y-[7px] rotate-45')} />
            <span className={cn('block h-px w-4 bg-current transition-all duration-300', menuOpen && 'w-0 opacity-0')} />
            <span className={cn('block h-px w-6 origin-center bg-current transition-all duration-300', menuOpen && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
