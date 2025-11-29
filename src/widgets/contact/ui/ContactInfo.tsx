import { CONTACT_INFO } from '@/entities/contact';
import { CONTACTS } from '@/shared/config/contacts';
import { Typography } from '@/shared/ui/typography';

export const ContactInfo = () => {
  return (
    <div className='rounded-lg border bg-card p-8 shadow-sm'>
      <Typography className='mb-6 text-xl font-semibold' variant='h3'>
        Контактная информация
      </Typography>

      <div className='space-y-4'>
        <div>
          <Typography className='font-medium' variant='small'>
            Телефон:
          </Typography>
          <Typography variant='muted'>
            <a href={CONTACTS.PHONE.href}>{CONTACT_INFO.phone}</a>
          </Typography>
        </div>

        <div>
          <Typography className='font-medium' variant='small'>
            Email:
          </Typography>
          <Typography variant='muted'>
            <a href={CONTACTS.EMAIL.href}>{CONTACT_INFO.email}</a>
          </Typography>
        </div>

        <div>
          <Typography className='font-medium' variant='small'>
            Режим работы:
          </Typography>
          <Typography variant='muted'>
            {CONTACT_INFO.workingHours.weekdays}
          </Typography>
          <Typography variant='muted'>
            {CONTACT_INFO.workingHours.weekends}
          </Typography>
        </div>
      </div>
    </div>
  );
};
