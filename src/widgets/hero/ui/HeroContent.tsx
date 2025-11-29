import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

export const HeroContent = () => {
  return (
    <div className='container relative z-10 px-6 py-20 text-white md:py-32 lg:py-40'>
      <Typography variant='h1'>
        Профессиональный клининг для вашего дома и офиса
      </Typography>
      <Typography className='mt-6 text-white/90' variant='lead'>
        Мы делаем уборку быстро, качественно и с заботой о вашем комфорте
      </Typography>
      <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
        <Button asChild size='lg'>
          <Link href={ROUTES.CALCULATOR}>Рассчитать стоимость</Link>
        </Button>
        <Button
          className='border-white/20 bg-white/10 text-white hover:bg-white/20'
          size='lg'
          onClick={() =>
            document
              .querySelector('services')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Узнать больше
        </Button>
      </div>
    </div>
  );
};
