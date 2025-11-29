import { Typography } from '@/shared/ui/typography';

export const ContactHeader = () => {
  return (
    <div className='mx-auto max-w-2xl text-center'>
      <Typography className='font-bold tracking-tight sm:text-4xl' variant='h2'>
        Свяжитесь с нами
      </Typography>
      <Typography className='mt-4' variant='lead'>
        Оставьте заявку, и мы перезвоним вам в ближайшее время
      </Typography>
    </div>
  );
};
