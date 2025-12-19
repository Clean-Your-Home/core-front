'use client';

import type {
  ProfileFormData,
  UserProfile,
} from '@/entities/profile/model/types';

import { User } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useProfileForm } from '../../lib/useProfile';

interface ProfileTabProperties {
  profile: UserProfile;
  onUpdateProfile: (data: ProfileFormData) => Promise<void>;
}

export function ProfileTab({ profile, onUpdateProfile }: ProfileTabProperties) {
  const { form, handleSubmit, hasChanges, isSubmitting } = useProfileForm({
    initialData: profile,
    onSubmit: onUpdateProfile,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Личные данные</CardTitle>
        <CardDescription>
          Управление вашими персональными данными
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-6'>
            <div className='flex flex-col items-center gap-6 sm:flex-row'>
              <div className='flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-muted'>
                <User className='h-12 w-12 text-muted-foreground' />
              </div>
              <div className='text-center sm:text-left'>
                <h3 className='text-lg font-semibold'>{profile.name}</h3>
                <p className='text-muted-foreground'>{profile.email}</p>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {profile.level} уровень • Скидка {profile.discount}%
                </p>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} type='email' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} type='tel' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button disabled={!hasChanges || isSubmitting} type='submit'>
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
