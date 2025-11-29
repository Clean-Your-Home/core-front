'use client';

import type { Order } from '@/entities/profile/model/types';

import { Star, User } from 'lucide-react';

import { STATUS_VARIANTS } from '@/entities/profile/model/types';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface OrderDetailsModalProperties {
  order: Order | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProperties) {
  if (!order) {
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Детали заказа #{order.id}</DialogTitle>
          <DialogDescription>Подробная информация о заказе</DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Услуга</h4>
              <p className='text-sm'>{order.service}</p>
            </div>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Статус</h4>
              <Badge variant={STATUS_VARIANTS[order.status]}>
                {order.status}
              </Badge>
            </div>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Дата</h4>
              <p className='text-sm'>{order.date}</p>
            </div>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Время</h4>
              <p className='text-sm'>{order.time}</p>
            </div>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Стоимость</h4>
              <p className='text-sm font-semibold'>{order.price}</p>
            </div>
            <div>
              <h4 className='mb-1 text-sm font-medium'>Начислено баллов</h4>
              <p className='text-sm'>{order.points}</p>
            </div>
          </div>

          <div>
            <h4 className='mb-1 text-sm font-medium'>Адрес</h4>
            <p className='text-sm'>{order.address}</p>
          </div>

          <div>
            <h4 className='mb-1 text-sm font-medium'>Дополнительные услуги</h4>
            {order.additionalServices.length > 0 ? (
              <ul className='list-disc space-y-1 pl-5 text-sm'>
                {order.additionalServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            ) : (
              <p className='text-sm text-muted-foreground'>
                Нет дополнительных услуг
              </p>
            )}
          </div>

          <div className='border-t pt-4'>
            <h4 className='mb-3 text-sm font-medium'>Исполнитель</h4>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                <User className='h-5 w-5 text-muted-foreground' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>{order.cleanerName}</p>
                <div className='flex items-center gap-1'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-3 w-3',
                          star <= Math.floor(order.cleanerRating)
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted-foreground',
                        )}
                      />
                    ))}
                  </div>
                  <span className='ml-1 text-xs text-muted-foreground'>
                    {order.cleanerRating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          {order.status === 'Выполнен' && !order.reviewed && (
            <Button>Оставить отзыв</Button>
          )}
          <Button variant='outline' onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
