'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Typography } from '@/shared/ui/typography';
import { useNewsletter } from '../lib/useNewsletter';

export const FooterNewsletter = () => {
  const { isSubmitting, handleSubscribe } = useNewsletter();

  return (
    <div>
      <Typography className='text-lg font-semibold' variant='h3'>
        Подписка на новости
      </Typography>
      <Typography className='mt-4 text-muted-foreground' variant='small'>
        Подпишитесь на нашу рассылку, чтобы получать новости и специальные
        предложения.
      </Typography>

      <form className='mt-4 flex flex-col gap-2' onSubmit={handleSubscribe}>
        <Input
          required
          className='w-full'
          disabled={isSubmitting}
          name='email'
          placeholder='Ваш email'
          type='email'
        />
        <Button className='w-full' disabled={isSubmitting} type='submit'>
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isSubmitting ? 'Подписка...' : 'Подписаться'}
        </Button>
      </form>
    </div>
  );
};
