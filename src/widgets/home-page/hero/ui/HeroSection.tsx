'use client';

import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

export const HeroSection = () => {
  return (
    <section className='relative'>
      <HeroBackground />
      <HeroContent />
    </section>
  );
};
