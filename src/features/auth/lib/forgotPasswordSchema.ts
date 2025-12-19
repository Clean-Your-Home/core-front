import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
