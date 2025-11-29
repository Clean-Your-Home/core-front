import Image from 'next/image';

export const AboutImage = () => {
  return (
    <div className='relative h-[400px] md:h-[500px]'>
      <Image
        fill
        alt='Наша команда'
        className='rounded-lg object-cover'
        src='/images/our_team.avif'
      />
    </div>
  );
};
