'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { GRAIN } from '@/lib/constants/textures';
import { STORY_ARCHETYPES } from '@/lib/media/storyAssets';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';
import type { StoryArchetype } from '@/lib/media/types';

/*
 * "Choose Your Story" — psychological self-insertion.
 *
 * The question: "Which version of our story are we?"
 * These are NOT service categories. They are emotional archetypes.
 *
 * Layout: horizontal scroll-snap track. Cards are portrait film-frames,
 * not service tiles. Each card has the same living-frame treatment as
 * the hero (Ken-Burns + grain + vignette) so the visual language is unified.
 *
 * Mobile: cards visible 1.25 at a time, hints more to the right.
 * Desktop: 3 cards visible, overflow hinted.
 *
 * MEDIA SWAP: replace the `grade` gradient with a real <Image> or <video>
 * inside the MEDIA SLOT comment in each card. The layout is built to accept
 * it without any restructuring.
 */

function StoryCard({ archetype }: { archetype: StoryArchetype }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const expanded = isMobile || hovered;

  return (
    <motion.div
      className="relative flex-none overflow-hidden shadow-[0_28px_64px_-28px_rgba(40,24,16,0.48)] ring-1 ring-white/20"
      style={{
        width: 'clamp(230px, 30vw, 295px)',
        aspectRatio: '3 / 4',
        borderRadius: '28px 22px 26px 22px',
        scrollSnapAlign: 'start',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* ── MEDIA SLOT ─────────────────────────────────────────────────────────
          Real image renders when archetype.media.image?.src is set.
          Grade stays as a subtle warm tint over the photo. */}
      <motion.div
        className="absolute inset-0"
        animate={hovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {archetype.media.image?.src && (
          <Image
            src={archetype.media.image.src}
            alt={archetype.media.image.alt ?? ''}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 72vw, 30vw"
          />
        )}
        {/* Grade — full opacity as placeholder, subtle warm tint over real photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: archetype.grade, opacity: archetype.media.image?.src ? 0.14 : 1 }}
          aria-hidden="true"
        />
        {/* warm light-leak */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(55% 42% at 68% 12%, rgba(255,241,210,0.4), transparent 55%)' }}
          aria-hidden="true"
        />
        {/* grain */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
      </motion.div>

      {/* cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 110px 18px rgba(30,18,10,0.38)' }}
        aria-hidden="true"
      />

      {/* unified readability overlay — the benchmark system */}
      <div className="img-overlay" aria-hidden="true" />

      {/* archetype number — top right, very quiet */}
      <div className="absolute right-4 top-4 font-display text-[0.6rem] italic text-white/40">
        {archetype.number}
      </div>

      {/* bottom panel — name always, copy expands */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-eyebrow text-[0.5rem] text-white/60">{archetype.descriptor}</p>
        <p className="mt-1 text-sm font-medium leading-tight tracking-tight text-white">
          {archetype.name}
        </p>

        {/* emotional copy — always shown on mobile, reveals on desktop hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: expanded ? 1 : 0,
            height: expanded ? 'auto' : 0,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-2 font-display text-[0.8rem] italic leading-snug text-white/75">
            {archetype.emotionalCopy}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ChooseYourStory() {
  return (
    // Compressed beat — tighter than its neighbours so the page breathes in
    // before the categories and spaces open back up.
    <section className="relative overflow-hidden bg-(--color-ivory) py-14 sm:py-16 lg:py-20">

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-eyebrow text-(--color-gold)">Choose Your Story</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-heading text-balance mt-5 max-w-[20ch] text-(--color-ink)">
            Which version of your story{' '}
            <span className="accent-serif text-(--color-mist)">are you?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body mt-4 max-w-[42ch] text-(--color-mist)">
            Every story looks different here. Find yours.
          </p>
        </Reveal>
      </div>

      {/* Scroll track — CSS snap, no JS */}
      <Reveal delay={0.2} y={16}>
        <div
          className="mt-10 flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12 lg:gap-5"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {STORY_ARCHETYPES.map((archetype) => (
            <StoryCard key={archetype.id} archetype={archetype} />
          ))}

          {/* Right breathing room so last card doesn't hug the edge */}
          <div className="flex-none w-2" aria-hidden="true" />
        </div>
      </Reveal>

      {/* Scroll hint dots — mobile only */}
      <div className="mt-5 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
        {STORY_ARCHETYPES.map((a) => (
          <span key={a.id} className="h-px w-4 bg-(--color-sandstone) rounded-full" />
        ))}
      </div>
    </section>
  );
}
