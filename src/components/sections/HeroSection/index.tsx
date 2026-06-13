'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { blurRise, heroStagger } from '@/lib/animations/variants';
import { GRAIN } from '@/lib/constants/textures';

/*
 * HERO V2.5 (frozen) — "an expensive wedding film opening."
 *
 * Media-first (≈66/34). One large near-bleed cinematic frame dominates while
 * two smaller frames overlap it, hand-placed: off-axis rotation, irregular
 * corner radii, and a slow independent sway/bob so they feel like printed
 * memories breathing — not a geometric grid of UI cards. Each frame is a LIVING
 * window: Ken-Burns drift + golden-hour grade + light-leak + vignette + grain.
 * Drop real shoot media into the marked MEDIA SLOTs. Pre-wedding leads (70%).
 *
 * FROZEN until real media arrives — composition/copy are final; only the
 * gradient standins inside each MEDIA SLOT are meant to be replaced.
 */

const SHOOT_TYPES = [
  'Pre-Wedding',
  'Fashion & Editorial',
  'Music Videos',
  'Brand Campaigns',
  'Maternity',
  'Ad Films',
  'Creator Stories',
];

interface Frame {
  /** responsive position + size classes */
  box: string;
  /** irregular, hand-cut corners */
  radius: string;
  z: string;
  depth: number;
  /** off-axis resting tilt + sway travel */
  rotate: number;
  sway: number;
  bob: number;
  swayDur: number;
  delay: number;
  kenburns: { scale: number[]; x: number[]; y: number[] };
  grade: string;
  eyebrow: string;
  caption: string;
  live?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const FRAMES: Frame[] = [
  // DOMINANT — pre-wedding, large, bleeds off the right edge, gently tilted.
  {
    box: 'inset-x-2 top-0 bottom-10 lg:inset-x-auto lg:right-0 lg:top-0 lg:bottom-[4%] lg:w-[82%]',
    radius: '40px 30px 36px 30px',
    z: 'z-[1]',
    depth: 0.4,
    rotate: -1.6,
    sway: 0.5,
    bob: 6,
    swayDur: 9,
    delay: 0.85,
    kenburns: { scale: [1, 1.12], x: [0, -10], y: [0, 6] },
    grade: 'linear-gradient(158deg,#F5DBCF 0%,#E4AA90 36%,#C67F64 66%,#8E5742 100%)',
    eyebrow: 'Pre-Wedding · Golden Hour',
    caption: 'Just the two of you',
    live: true,
    imageSrc: '/images/hero/pre wedding.jpg',
    imageAlt: 'Couple in intimate embrace between ornate columns at The Picture Villa',
  },
  // EDITORIAL — overlaps the lower-left, dropped at an angle like a print.
  {
    box: 'left-1 bottom-0 w-[38%] lg:left-[-3%] lg:bottom-[10%] lg:w-[42%] aspect-[4/5]',
    radius: '22px 30px 20px 28px',
    z: 'z-[3]',
    depth: 1.6,
    rotate: -6.5,
    sway: 1.1,
    bob: 11,
    swayDur: 7.5,
    delay: 1.1,
    kenburns: { scale: [1, 1.14], x: [0, 8], y: [0, -6] },
    grade: 'linear-gradient(158deg,#F2E3C8 0%,#DBBD85 54%,#AA834C 100%)',
    eyebrow: 'Fashion',
    caption: 'Editorial light',
    imageSrc: '/images/hero/fashion 1.jpg',
    imageAlt: 'Fashion editorial shoot at The Picture Villa',
  },
  // CINEMATIC — small peek tucked above, desktop only, keeps the collage airy.
  {
    box: 'hidden lg:block lg:left-[13%] lg:top-[3%] lg:w-[26%] aspect-[4/5]',
    radius: '26px 18px 24px 22px',
    z: 'z-[2]',
    depth: 2.2,
    rotate: 4.5,
    sway: 1.3,
    bob: 13,
    swayDur: 8.5,
    delay: 1.25,
    kenburns: { scale: [1, 1.16], x: [0, -8], y: [0, 8] },
    grade: 'linear-gradient(158deg,#E8CDB6 0%,#B27F64 55%,#5E4233 100%)',
    eyebrow: 'Cinematic',
    caption: 'Films at the villa',
    imageSrc: '/images/hero/colonade.jpeg',
    imageAlt: 'The Moroccan colonnade facade of The Picture Villa illuminated at dusk',
  },
];

function CinematicFrame({
  frame,
  sx,
  sy,
  reduce,
}: {
  frame: Frame;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean | null;
}) {
  const tx = useTransform(sx, (v) => v * frame.depth * 22);
  const ty = useTransform(sy, (v) => v * frame.depth * 22);

  return (
    // Outer: cursor parallax + one-shot entrance (positioning only).
    <motion.div
      className={`absolute ${frame.box} ${frame.z}`}
      style={{ x: reduce ? 0 : tx, y: reduce ? 0 : ty }}
      initial={reduce ? false : { opacity: 0, scale: 0.96, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: frame.delay }}
    >
      {/* Inner: the physical photo — rests off-axis and sways/bobs, so it reads
          as hand-placed and alive rather than geometric. */}
      <motion.div
        className="relative h-full w-full overflow-hidden ring-1 ring-white/25 shadow-[0_46px_94px_-34px_rgba(40,24,16,0.62)]"
        style={{ borderRadius: frame.radius }}
        initial={{ rotate: frame.rotate }}
        animate={
          reduce
            ? undefined
            : { rotate: [frame.rotate, frame.rotate + frame.sway], y: [0, -frame.bob] }
        }
        transition={{ duration: frame.swayDur, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      >
        {/* ── MEDIA SLOT ───────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: frame.kenburns.scale, x: frame.kenburns.x, y: frame.kenburns.y }}
          transition={{ duration: 26, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        >
          {/* Real image — renders when imageSrc is set; grade acts as loading state beneath */}
          {frame.imageSrc && (
            <Image
              src={frame.imageSrc}
              alt={frame.imageAlt ?? ''}
              fill
              className="object-cover object-center"
              priority={!!frame.live}
              sizes="(max-width: 1024px) 95vw, 60vw"
            />
          )}
          {/* Grade — full opacity as placeholder with no image; subtle warm tint over real photo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: frame.grade, opacity: frame.imageSrc ? 0.12 : 1 }}
            aria-hidden="true"
          />
          {/* Warm light-leak — atmospheric, stays over both placeholder and real photo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(62% 50% at 72% 10%, rgba(255,241,214,0.38), transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
        </motion.div>

        {/* cinematic vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: 'inset 0 0 130px 24px rgba(40,24,16,0.36)' }}
          aria-hidden="true"
        />

        {/* caption — emotional, restrained */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-4 sm:p-5">
          <div className="flex items-center gap-2">
            {frame.live && (
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#F2C879]"
                animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
            )}
            <p className="text-eyebrow text-[0.5rem] text-white/75">{frame.eyebrow}</p>
          </div>
          <p className="mt-0.5 font-display text-base italic leading-tight text-white sm:text-lg">
            {frame.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(mvY, { stiffness: 55, damping: 18, mass: 0.6 });

  // Departure parallax — scrolling away reads as a slow camera move, not a cut.
  // Media recedes slower than the scroll; copy lifts away and dissolves first.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  function handlePointer(e: React.PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointer}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Living golden-hour wash — warm, never dark. Scales AND drifts laterally
          so the ambient light feels like late-afternoon sun crawling, not a loop. */}
      <motion.div
        className="absolute -inset-[4%]"
        aria-hidden="true"
        animate={reduce ? undefined : { scale: [1, 1.05], x: [0, -14], y: [0, 8] }}
        transition={{ duration: 32, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(120% 90% at 82% 4%, rgba(245,225,197,0.95), transparent 55%)',
              'radial-gradient(95% 75% at 6% 104%, rgba(231,213,188,0.85), transparent 60%)',
              'linear-gradient(180deg, #FBF7F0 0%, #F4EADB 48%, #EBDCC5 100%)',
            ].join(','),
          }}
        />
      </motion.div>

      {/* Drifting godray */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-sweep absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-2xl" />
      </div>

      {/* Page grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: GRAIN }}
        aria-hidden="true"
      />

      {/* ── MAIN: text + media ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 pt-[var(--header-height)] sm:px-8 lg:grid-cols-[34%_66%] lg:gap-6 lg:px-12">

        {/* MEDIA ZONE — dominant, first on mobile, taller for grandeur */}
        <motion.div
          className="relative order-1 h-[55vh] w-full sm:h-[60vh] lg:order-2 lg:-mr-12 lg:h-[86vh]"
          style={{ y: reduce ? 0 : mediaY }}
        >
          {FRAMES.map((frame, i) => (
            <CinematicFrame key={i} frame={frame} sx={sx} sy={sy} reduce={reduce} />
          ))}
        </motion.div>

        {/* TEXT ZONE — compact, supporting (media leads the eye) */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="order-2 w-full pb-8 lg:order-1 lg:pb-0"
          style={reduce ? undefined : { y: copyY, opacity: copyFade }}
        >
          <motion.p variants={blurRise} className="text-eyebrow text-(--color-gold)">
            A Cinematic Estate · Twenty Minutes from Delhi
          </motion.p>

          <motion.h1
            variants={blurRise}
            className="text-hero text-balance mt-7 max-w-[14ch] text-(--color-ink)"
          >
            Your story deserves a{' '}
            <span className="accent-serif text-(--color-gold)">world of its own.</span>
          </motion.h1>

          <motion.p
            variants={blurRise}
            className="text-body-lg mt-7 max-w-[34ch] text-(--color-mist)"
          >
            Eighteen built worlds where the light is already perfect — and every
            frame looks like a film.
          </motion.p>

          <motion.div
            variants={blurRise}
            className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          >
            <Link
              href="/spaces"
              className="hover-lift inline-flex w-full sm:w-auto h-[54px] items-center justify-center gap-2.5 rounded-full bg-(--color-ink) px-9 text-label uppercase tracking-[0.18em] text-(--color-ivory)"
            >
              Explore The Villa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/book"
              className="group relative py-2 text-label uppercase tracking-[0.18em] text-(--color-ink) after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-(--color-ink)/40 after:transition-colors after:duration-300 hover:after:bg-(--color-ink)"
            >
              Book a Visit
            </Link>
          </motion.div>

          <motion.p
            variants={blurRise}
            className="mt-8 text-[0.72rem] tracking-[0.04em] text-(--color-mist)"
          >
            Trusted by 1,200+ couples, creators &amp; brands.
          </motion.p>
        </motion.div>
      </div>

      {/* Shoot-type marquee — alive rhythm */}
      <div className="relative z-10 overflow-hidden border-t border-(--color-ink)/10">
        <div className="flex w-max animate-marquee py-4">
          {[...SHOOT_TYPES, ...SHOOT_TYPES].map((type, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="text-eyebrow px-6 text-(--color-mist)">{type}</span>
              <span className="h-1 w-1 rounded-full bg-(--color-gold)/70" />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-24 right-5 z-10 hidden flex-col items-center gap-2 sm:right-8 sm:flex lg:right-12">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-(--color-mist) [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-(--color-mist)/40"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Cinematic edge vignette — frames the whole hero like a lens */}
      <div
        className="pointer-events-none absolute inset-0 z-[11]"
        style={{ boxShadow: 'inset 0 0 180px 40px rgba(78,52,33,0.12)' }}
        aria-hidden="true"
      />
    </section>
  );
}
