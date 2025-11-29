import { CONTACTS } from '@/shared/config/contacts';
import { ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: CONTACTS.PHONE.display,
  email: CONTACTS.EMAIL.address,
  workingHours: {
    weekdays: 'Пн-Пт: 9:00 - 20:00',
    weekends: 'Сб-Вс: 10:00 - 18:00',
  },
} as const;
