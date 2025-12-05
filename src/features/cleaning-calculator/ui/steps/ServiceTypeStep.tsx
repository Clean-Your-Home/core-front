import {
  BASE_PRICES,
  SERVICE_ICONS,
} from '@/entities/cleaning/model/constants';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';

interface ServiceTypeStepProperties {
  selectedType: string;
  onSelect: (type: string) => void;
  displayPrice: number;
}

export const ServiceTypeStep = ({
  selectedType,
  onSelect,
  displayPrice,
}: ServiceTypeStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label className='text-lg'>Выберите тип уборки</Label>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
          {Object.keys(BASE_PRICES).map((service) => (
            <div
              key={service}
              className={cn(
                'flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all duration-300',
                selectedType === service
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-muted hover:border-primary/50',
              )}
              onClick={() => onSelect(service)}
            >
              <div className='mb-2 text-primary'>{SERVICE_ICONS[service]}</div>
              {service}
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 flex items-center justify-between border-t pt-4'>
        <span className='text-lg font-medium'>Текущая стоимость:</span>
        <span className='text-2xl font-bold text-primary'>
          {displayPrice} ₽
        </span>
      </div>
    </div>
  );
};
