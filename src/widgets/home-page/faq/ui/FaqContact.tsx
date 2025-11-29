import { CONTACTS } from '@/shared/config/contacts';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

export const FaqContact = () => {
  return (
    <div className='mt-12 rounded-lg bg-muted p-6 text-center'>
      <Typography className='mb-2' variant='h3'>
        Не нашли ответ на свой вопрос?
      </Typography>
      <Typography className='mb-4' variant='muted'>
        Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
      </Typography>
      <div className='flex flex-col justify-center gap-4 sm:flex-row'>
        <Button asChild>
          <a href={CONTACTS.PHONE.href}>Позвонить</a>
        </Button>
        <Button asChild variant='outline'>
          <a href={CONTACTS.EMAIL.href}>Написать</a>
        </Button>
      </div>
    </div>
  );
};
