import * as z from 'zod';

import { dateRequiredServices } from './constants';

const phoneRegex = /^(\+7|8)[\s(]?\d{3}[\s)]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const OrderSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Имя должно содержать не менее 2 символов' }),
    phone: z
      .string()
      .regex(phoneRegex, { message: 'Некорректный формат телефона' }),
    address: z.string().min(5, { message: 'Укажите полный адрес' }),
    service: z.string().min(1, { message: 'Выберите услугу' }),
    comment: z.string().optional(),

    date: z.date().optional(),
    timeSlot: z.string().optional(),

    noMop: z.boolean().default(false),
    noVacuum: z.boolean().default(false),
    hasPet: z.boolean().default(false),
  })
  .superRefine((data, context) => {
    const isDateRequired = dateRequiredServices.includes(data.service);

    if (isDateRequired) {
      if (!data.date) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Пожалуйста, выберите дату уборки',
          path: ['date'],
        });
      }
      if (!data.timeSlot) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Пожалуйста, выберите время уборки',
          path: ['timeSlot'],
        });
      }
    }
  });

export type OrderFormValues = z.infer<typeof OrderSchema>;
