import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  address: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов'),
    newPassword: z
      .string()
      .min(6, 'Новый пароль должен содержать минимум 6 символов'),
    confirmPassword: z
      .string()
      .min(6, 'Подтверждение пароля должно содержать минимум 6 символов'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z
    .string()
    .min(10, 'Отзыв должен содержать минимум 10 символов')
    .max(500, 'Отзыв не должен превышать 500 символов'),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type PasswordFormData = z.infer<typeof passwordFormSchema>;
export type ReviewFormData = z.infer<typeof reviewFormSchema>;
