import { Typography } from '@/shared/ui/typography';

export const BlogHeader = () => {
  return (
    <div className='mx-auto max-w-2xl text-center'>
      <Typography
        className='text-3xl font-bold tracking-tight sm:text-4xl'
        variant='h2'
      >
        Наш блог
      </Typography>
      <Typography className='mt-4' variant='lead'>
        Полезные статьи и советы по уборке и уходу за домом
      </Typography>
    </div>
  );
};
