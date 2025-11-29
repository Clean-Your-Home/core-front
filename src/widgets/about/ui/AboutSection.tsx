import { AboutContent } from './AboutContent';
import { AboutImage } from './AboutImage';

export const AboutSection = () => {
  return (
    <section className='bg-muted/50 py-16 md:py-24' id='about'>
      <div className='container mx-auto px-4'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </section>
  );
};
