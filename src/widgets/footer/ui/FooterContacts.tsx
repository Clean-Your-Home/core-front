import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import { SOCIAL_LINKS } from '@/entities/company';
import { CONTACTS } from '@/shared/config/contacts';
import { Typography } from '@/shared/ui/typography';

export const FooterContacts = () => {
  return (
    <div>
      <Typography className='text-lg font-semibold' variant='h3'>
        Контакты
      </Typography>
      <ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
        <li className='flex items-center gap-2'>
          <Link
            className='flex items-center gap-2 hover:text-primary'
            href={CONTACTS.PHONE.href}
          >
            <Phone className='h-4 w-4' />
            <span>{CONTACTS.PHONE.display}</span>
          </Link>
        </li>
        <li className='flex items-center gap-2'>
          <Link
            className='flex items-center gap-2 hover:text-primary'
            href={CONTACTS.EMAIL.href}
          >
            <Mail className='h-4 w-4' />
            <span>{CONTACTS.EMAIL.address}</span>
          </Link>
        </li>
      </ul>

      <div className='mt-4 flex space-x-4'>
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              className='text-muted-foreground hover:text-primary'
              href={social.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              <Icon className='h-5 w-5' />
              <span className='sr-only'>{social.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
