import type { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroStatement } from '@/components/sections/IntroStatement';
import { ChooseYourStory } from '@/components/sections/ChooseYourStory';
import { ShootCategories } from '@/components/sections/ShootCategories';
import { SpacesPreview } from '@/components/sections/SpacesPreview';
import { CinematicInterlude } from '@/components/sections/CinematicInterlude';
import { EditorialStory } from '@/components/sections/EditorialStory';
import { StoriesFromVilla } from '@/components/sections/StoriesFromVilla';
import { GalleryMoments } from '@/components/sections/GalleryMoments';
import { ConciergeCTA } from '@/components/sections/ConciergeCTA';

export const metadata: Metadata = {
  title: `${SITE.name} — Luxury Photoshoot Venue in Delhi NCR`,
  alternates: { canonical: '/' },
};

/*
 * Homepage arc (V2 — media-ready preparation phase):
 *
 *   hero          → emotional arrival
 *   intro         → estate context       [V1 style — to be updated when media arrives]
 *   choose-story  → self-insertion        [NEW skeleton]
 *   categories    → shoot types           [V1 style — to be updated]
 *   spaces        → the backdrops         [V1 style — to be updated]
 *   interlude     → the emotional peak: full-bleed night palace, near-silent
 *   editorial     → why villa             [V1 style — to be updated]
 *   stories       → social proof          [NEW skeleton]
 *   gallery       → visual proof          [V1 style — to be updated]
 *   cta           → concierge close       [V1 style — to be updated]
 *
 * V1 sections will be individually upgraded to the V2.5 visual language
 * once real media arrives.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStatement />
      <ChooseYourStory />
      <ShootCategories />
      <SpacesPreview />
      <CinematicInterlude />
      <EditorialStory />
      <StoriesFromVilla />
      <GalleryMoments />
      <ConciergeCTA />
    </>
  );
}
