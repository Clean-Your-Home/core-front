import { Check } from 'lucide-react';

import { ADDITIONAL_SERVICES_LIST } from '@/entities/cleaning/model/constants';
import { CleaningOrderSummary } from '@/entities/cleaning/model/types';

interface SummaryStepProperties {
  summary: CleaningOrderSummary;
  displayPrice: number;
}

export const SummaryStep = ({
  summary,
  displayPrice,
}: SummaryStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Итоговый расчет</h3>
        <div className='space-y-4 rounded-lg bg-muted/30 p-6'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <p className='text-sm text-muted-foreground'>Тип уборки</p>
              <p className='font-medium'>{summary.serviceType}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Площадь</p>
              <p className='font-medium'>{summary.area} м²</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Частота</p>
              <p className='font-medium'>{summary.frequency}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Срочность</p>
              <p className='font-medium'>
                {summary.isUrgent ? 'Срочный заказ' : 'Обычный заказ'}
              </p>
            </div>
          </div>

          {(summary.noMop || summary.noVacuum || summary.hasPet) && (
            <div className='mt-4 border-t pt-4'>
              <p className='mb-2 text-sm text-muted-foreground'>
                Дополнительные опции
              </p>
              <ul className='space-y-1'>
                {summary.noMop && (
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-primary' /> У меня нет
                    швабры, ведра (+300 ₽)
                  </li>
                )}
                {summary.noVacuum && (
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-primary' /> У меня нет
                    пылесоса (+500 ₽)
                  </li>
                )}
                {summary.hasPet && (
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-primary' /> У меня есть
                    собака/кошка (+300 ₽)
                  </li>
                )}
              </ul>
            </div>
          )}

          {summary.additionalServices.length > 0 && (
            <div className='mt-4 border-t pt-4'>
              <p className='mb-2 text-sm text-muted-foreground'>
                Дополнительные услуги
              </p>
              <ul className='space-y-1'>
                {summary.additionalServices.map((item) => {
                  const info = ADDITIONAL_SERVICES_LIST.find(
                    (s) => s.id === item.id,
                  );
                  if (!info) return;
                  return (
                    <li key={item.id} className='flex items-center'>
                      <Check className='mr-2 h-4 w-4 text-primary' />
                      {info.name} - {item.quantity} {info.unit}
                      (+{info.price * item.quantity} ₽)
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className='mt-6 flex items-center justify-between border-t pt-4'>
            <span className='text-lg font-medium'>Итоговая стоимость:</span>
            <span className='text-2xl font-bold text-primary'>
              {displayPrice} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
