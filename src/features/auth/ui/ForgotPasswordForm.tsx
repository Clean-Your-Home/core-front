import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { CardContent, CardFooter } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../lib/forgotPasswordSchema';

interface ForgotPasswordFormProperties {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const ForgotPasswordForm = ({
  onSubmit,
  isSubmitting,
}: ForgotPasswordFormProperties) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            placeholder='ivan@example.com'
            type='email'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-sm text-destructive'>{errors.email.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Отправка...' : 'Отправить ссылку'}
        </Button>
      </CardFooter>
    </form>
  );
};
