'use client';

import React from 'react';
import Link from 'next/link';

import { useAuthHandlers } from '@/features/auth/lib/authHandlers';
import { ForgotPasswordForm } from '@/features/auth/ui/ForgotPasswordForm';
import { ROUTES } from '@/shared/config/routes';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

const ForgotPasswordPage = () => {
  const { handleForgotPassword, isSubmitting } = useAuthHandlers();
  return (
    <div className='container py-12'>
      <div className='mx-auto max-w-md'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold'>Восстановление пароля</h1>
          <p className='mt-2 text-muted-foreground'>
            Введите email для восстановления доступа
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Восстановление пароля</CardTitle>
            <CardDescription>
              Мы отправим ссылку для сброса пароля на ваш email
            </CardDescription>
          </CardHeader>
          <ForgotPasswordForm
            isSubmitting={isSubmitting}
            onSubmit={handleForgotPassword}
          />
          <CardFooter className='justify-center'>
            <Link className='text-primary hover:underline' href={ROUTES.LOGIN}>
              Вернуться к входу
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
