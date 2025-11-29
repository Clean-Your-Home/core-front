import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(11, 'Телефон должен содержать минимум 11 цифр'),
  comment: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
