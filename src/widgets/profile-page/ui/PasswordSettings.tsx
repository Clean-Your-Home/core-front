'use client';

import type { PasswordFormData } from '../lib/schemas';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { passwordFormSchema } from '../lib/schemas';

interface PasswordSettingsProperties {
  onSubmit: (data: PasswordFormData) => Promise<void>;
  onSuccess: () => void;
}

export function PasswordSettings({
  onSubmit,
  onSuccess,
}: PasswordSettingsProperties) {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (data: PasswordFormData) => {
    try {
      await onSubmit(data);
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', { message: error.message });
      } else {
        form.setError('root', {
          message: 'Произошла ошибка при изменении пароля',
        });
      }
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Текущий пароль</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Сохранение...' : 'Сохранить пароль'}
        </Button>
      </form>
    </Form>
  );
}
