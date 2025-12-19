'use client';

import React from 'react';

import { useAuthHandlers } from '@/features/auth/lib/authHandlers';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { SocialLoginButtons } from '@/features/auth/ui/SocialLoginButtons';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const LoginPage = () => {
  const { handleLogin, handleRegister, handleSocialLogin, isSubmitting } =
    useAuthHandlers();

  return (
    <div className='container mx-auto py-12'>
      <div className='mx-auto max-w-md'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold'>Личный кабинет</h1>
          <p className='mt-2 text-muted-foreground'>
            Войдите в свой аккаунт или зарегистрируйтесь
          </p>
        </div>

        <Tabs className='w-full' defaultValue='login'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='login'>Вход</TabsTrigger>
            <TabsTrigger value='register'>Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value='login'>
            <Card>
              <CardHeader>
                <CardTitle>Вход в аккаунт</CardTitle>
                <CardDescription>
                  Введите свои данные для входа в личный кабинет
                </CardDescription>
              </CardHeader>
              <LoginForm isSubmitting={isSubmitting} onSubmit={handleLogin} />
            </Card>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Или войдите через
                  </span>
                </div>
              </div>
              <SocialLoginButtons onSocialLogin={handleSocialLogin} />
            </div>
          </TabsContent>

          <TabsContent value='register'>
            <Card>
              <CardHeader>
                <CardTitle>Создание аккаунта</CardTitle>
                <CardDescription>
                  Заполните форму для регистрации в системе
                </CardDescription>
              </CardHeader>
              <RegisterForm
                isSubmitting={isSubmitting}
                onSubmit={handleRegister}
              />
            </Card>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Или зарегистрируйтесь через
                  </span>
                </div>
              </div>
              <SocialLoginButtons onSocialLogin={handleSocialLogin} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
