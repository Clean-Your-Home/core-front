import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

export const GalleryPreview = () => {
  return (
    <section className='bg-muted/50 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl text-center'>
          <Typography
            className='text-3xl font-bold tracking-tight sm:text-4xl'
            variant='h2'
          >
            Галерея наших работ
          </Typography>
          <Typography className='mt-4' variant='lead'>
            Посмотрите фотографии до и после уборки, чтобы оценить качество
            нашей работы
          </Typography>
          <div className='mt-8'>
            <Button asChild>
              <Link href={ROUTES.GALLERY}>
                Смотреть все фото
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
