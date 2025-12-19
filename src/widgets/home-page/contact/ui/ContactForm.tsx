'use client';

import type { ContactFormData } from '../lib/schemas';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { ENDPOINTS } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Typography } from '@/shared/ui/typography';
import { contactFormSchema } from '../lib/schemas';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      comment: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch(ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      toast.success('Заявка отправлена', {
        description: 'Мы свяжемся с вами в ближайшее время',
      });
      reset();
    } catch {
      toast.error('Ошибка отправки', {
        description: 'Пожалуйста, попробуйте еще раз',
      });
    }
  };

  return (
    <div className='rounded-lg border bg-card p-8 shadow-sm'>
      <Typography className='mb-6 text-xl font-semibold' variant='h3'>
        Заказать обратный звонок
      </Typography>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Ваше имя</Label>
          <Input id='name' placeholder='Иван Иванов' {...register('name')} />
          {errors.name && (
            <Typography className='text-destructive' variant='small'>
              {errors.name.message}
            </Typography>
          )}
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='phone'>Телефон</Label>
          <Input
            id='phone'
            placeholder='+7 (999) 999-99-99'
            type='tel'
            {...register('phone')}
          />
          {errors.phone && (
            <Typography className='text-destructive' variant='small'>
              {errors.phone.message}
            </Typography>
          )}
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='comment'>Комментарий</Label>
          <Textarea
            id='comment'
            placeholder='Укажите удобное время для звонка или другую информацию'
            {...register('comment')}
          />
        </div>

        <Button className='w-full' disabled={isSubmitting} type='submit'>
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </form>
    </div>
  );
};
