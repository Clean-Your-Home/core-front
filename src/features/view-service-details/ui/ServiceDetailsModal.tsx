import Image from 'next/image';

import { Service } from '@/entities/service/model/types';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface ServiceDetailsModalProperties {
  service: Service | undefined;
  onClose: () => void;
  onOrderClick: () => void;
}

export const ServiceDetailsModal = ({
  service,
  onClose,
  onOrderClick,
}: ServiceDetailsModalProperties) => {
  if (!service) return;

  return (
    <Dialog open={!!service} onOpenChange={() => onClose()}>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{service.details.title}</DialogTitle>
          <DialogDescription>{service.details.description}</DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4 md:grid-cols-2'>
          <div>
            <div className='relative h-48 w-full overflow-hidden rounded-lg bg-muted'>
              {service.details.image ? (
                <Image
                  fill
                  alt={service.details.title}
                  className='object-cover'
                  src={service.details.image}
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-muted-foreground'>
                  Изображение недоступно
                </div>
              )}
            </div>

            <p className='mt-4 font-semibold'>
              Стоимость: {service.details.price}
            </p>

            <Button className='mt-4 w-full' onClick={onOrderClick}>
              Заказать услугу
            </Button>
          </div>

          <div>
            <h4 className='mb-2 font-semibold'>Что входит в услугу:</h4>
            <ul className='space-y-2'>
              {service.details.features.map((feature, index) => (
                <li key={index} className='flex items-start'>
                  <span className='mr-2 mt-1 h-2 w-2 rounded-full bg-primary' />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
