'use client';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';
import Image from 'next/image';
import Link from 'next/link';

import { useScrollIntoView } from '@/shared/hooks';

export const HeroSection = () => {
  const { ref, trigger } = useScrollIntoView<HTMLElement>({
    immediately: false,
    behavior: 'smooth',
    block: 'start',
  });

  const handleLearnMoreClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const servicesElement = document.querySelector(
      '#services',
    ) as HTMLElement | null;
    if (servicesElement && ref.current) {
      ref.current = servicesElement;
      trigger();
    }
  };

  return (
    <section className='relative'>
      <div className='absolute inset-0'>
        <Image
          fill
          priority
          alt='Профессиональная уборка'
          className='object-cover brightness-[0.7]'
          src='/images/cleaner.avif'
        />
      </div>
      <div className='container relative z-10 px-6 py-20 text-white md:py-32 lg:py-40'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Профессиональный клининг для вашего дома и офиса
        </h1>
        <p className='mt-6 text-xl text-white/90'>
          Мы делаем уборку быстро, качественно и с заботой о вашем комфорте
        </p>
        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href={ROUTES.CALCULATOR}>Рассчитать стоимость</Link>
          </Button>
          <Button
            className='border-white/20 bg-white/10 text-white hover:bg-white/20'
            size='lg'
            onClick={handleLearnMoreClick}
          >
            Узнать больше
          </Button>
        </div>
      </div>
    </section>
  );
};
