import Link from 'next/link';

import { FOOTER_SERVICES } from '@/entities/company';
import { Typography } from '@/shared/ui/typography';

export const FooterServices = () => {
  return (
    <div>
      <Typography className='text-lg font-semibold' variant='h3'>
        Услуги
      </Typography>
      <ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
        {FOOTER_SERVICES.map((service) => (
          <li key={service.name}>
            <Link className='hover:text-primary' href={service.href}>
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
