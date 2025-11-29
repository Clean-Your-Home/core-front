import Image from 'next/image';

export const HeroBackground = () => (
  <div className='absolute inset-0'>
    <Image
      fill
      priority
      alt='Профессиональная уборка'
      className='object-cover brightness-[0.7]'
      src='/images/cleaner.avif'
    />
  </div>
);
