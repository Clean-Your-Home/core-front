import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { CardContent, CardFooter } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { RegisterFormData, registerSchema } from '../lib/registerSchema';

interface RegisterFormProperties {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const RegisterForm = ({
  onSubmit,
  isSubmitting,
}: RegisterFormProperties) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Имя</Label>
          <Input id='name' placeholder='Иван Иванов' {...register('name')} />
          {errors.name && (
            <p className='text-sm text-destructive'>{errors.name.message}</p>
          )}
        </div>
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
          <Label htmlFor='phone'>Телефон</Label>
          <Input
            id='phone'
            placeholder='+7 (999) 123-45-67'
            type='tel'
            {...register('phone')}
          />
          {errors.phone && (
            <p className='text-sm text-destructive'>{errors.phone.message}</p>
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
        <div className='space-y-2'>
          <Label htmlFor='passwordConfirm'>Подтверждение пароля</Label>
          <Input
            id='passwordConfirm'
            type='password'
            {...register('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <p className='text-sm text-destructive'>
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </CardFooter>
    </form>
  );
};
