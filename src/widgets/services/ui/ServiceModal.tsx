'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

import { Service } from '@/entities/service';
import { Badge } from '@/shared/ui/badge/badge';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent } from '@/shared/ui/dialog/dialog';
import { Typography } from '@/shared/ui/typography';

interface ServiceModalProperties {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: () => void;
}

export const ServiceModal = ({
  service,
  isOpen,
  onClose,
  onOrderClick,
}: ServiceModalProperties) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='p-6 sm:max-w-[450px]'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Typography className='text-xl font-bold' variant='h3'>
              {service.details.title}
            </Typography>
            <Badge className='bg-primary'>{service.details.price}</Badge>
          </div>

          <Typography className='text-muted-foreground' variant='small'>
            {service.details.description}
          </Typography>

          <div>
            <Typography className='mb-2 font-medium' variant='small'>
              Что входит в услугу:
            </Typography>
            <ul className='grid grid-cols-1 gap-2'>
              {service.details.features.map((feature, index) => (
                <li key={index} className='flex items-start text-sm'>
                  <Check className='mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary' />
                  <Typography variant='small'>{feature}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex gap-2 pt-2'>
            <Button className='flex-1' onClick={onOrderClick}>
              Заказать
            </Button>
            <Button asChild className='flex-1 bg-transparent' variant='outline'>
              <Link href='/calculator'>Рассчитать</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
