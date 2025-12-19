import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { CardContent, CardFooter } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { LoginFormData, loginSchema } from '../lib/loginSchema';

interface LoginFormProperties {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const LoginForm = ({ onSubmit, isSubmitting }: LoginFormProperties) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
        <div className='space-y-2'>
          <Label htmlFor='password'>Пароль</Label>
          <Input id='password' type='password' {...register('password')} />
          {errors.password && (
            <p className='text-sm text-destructive'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className='text-right text-sm'>
          <Link
            className='text-primary hover:underline'
            href={ROUTES.FORGOT_PASSWORD}
          >
            Забыли пароль?
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </CardFooter>
    </form>
  );
};
