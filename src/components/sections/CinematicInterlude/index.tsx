'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GRAIN } from '@/lib/constants/textures';

/*
 * Beat 3.5 — the cinematic interlude. The emotional peak of the page.
 *
 * After three warm, bright beats the page hard-cuts to night: the illuminated
 * Raj Mahal at full viewport, a couple dwarfed by it. Almost no copy — the
 * image does the talking. The frame drifts on scroll (slow crane move) so it
 * feels filmed, not placed.
 *
 * This is deliberately the ONLY full-serif headline on the homepage.
 */
export function CinematicInterlude() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Slow vertical crane across the architecture while the section is on screen.
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.04]);

  return (
    <section ref={ref} className="relative h-[96svh] overflow-hidden bg-[#0B0805]">
      {/* Filmed frame — oversized so the crane move never shows an edge */}
      <motion.div
        className="absolute -inset-[8%]"
        style={reduce ? undefined : { y, scale }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero/raj-mahal.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Night grade — keeps the palace glowing, settles the edges into black */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(180deg, rgba(11,8,5,0.55) 0%, transparent 30%, transparent 62%, rgba(11,8,5,0.78) 100%)',
            'radial-gradient(90% 70% at 50% 45%, transparent 55%, rgba(11,8,5,0.45) 100%)',
          ].join(','),
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: GRAIN }} aria-hidden="true" />

      {/* The one line — settles into focus, then holds */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">
          <motion.p
            className="text-eyebrow text-(--color-gold-light)/90"
            initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-25%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Twenty minutes from Delhi
          </motion.p>
          <motion.h2
            className="mx-auto mt-6 max-w-[16ch] font-display text-balance text-4xl font-light italic leading-[1.12] text-(--color-ivory) sm:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 26, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-25%' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            And none of it feels real.
          </motion.h2>
        </div>
      </div>

      {/* Grounding caption — quiet, bottom-left */}
      <motion.p
        className="absolute bottom-6 left-5 z-10 text-[0.55rem] uppercase tracking-[0.28em] text-(--color-ivory)/45 sm:left-8 lg:left-12"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-25%' }}
        transition={{ duration: 1.4, delay: 0.8 }}
      >
        Raj Mahal — one of eighteen worlds
      </motion.p>

      {/* Lens vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 160px 30px rgba(0,0,0,0.45)' }}
        aria-hidden="true"
      />
    </section>
  );
}
