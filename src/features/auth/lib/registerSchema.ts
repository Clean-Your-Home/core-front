import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Имя должно быть не менее 2 символов' }),
    email: z.string().email({ message: 'Неверный формат email' }),
    phone: z.string().min(10, { message: 'Неверный формат телефона' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
