import { Zap } from 'lucide-react';

import {
  FREQUENCY_COEFFICIENTS,
  FREQUENCY_ICONS,
} from '@/entities/cleaning/model/constants';
import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

interface FrequencyStepProperties {
  frequency: string;
  onFrequencyChange: (value: string) => void;
  isUrgent: boolean;
  onUrgentChange: (checked: boolean) => void;
  displayPrice: number;
}

export const FrequencyStep = ({
  frequency,
  onFrequencyChange,
  isUrgent,
  onUrgentChange,
  displayPrice,
}: FrequencyStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label className='text-lg'>Выберите частоту уборки</Label>
        <RadioGroup
          className='grid grid-cols-1 gap-4 md:grid-cols-2'
          value={frequency}
          onValueChange={onFrequencyChange}
        >
          {Object.keys(FREQUENCY_COEFFICIENTS).map((freq) => (
            <div
              key={freq}
              className={cn(
                'flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-all',
                frequency === freq
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/30',
              )}
              onClick={() => onFrequencyChange(freq)}
            >
              <RadioGroupItem value={freq} id={`freq-${freq}`} />
              <Label
                className='flex w-full cursor-pointer items-center'
                htmlFor={`freq-${freq}`}
              >
                <span className='mr-2'>{FREQUENCY_ICONS[freq]}</span>
                {freq}
                {freq !== 'Разовая' && (
                  <span className='ml-2 text-sm text-muted-foreground'>
                    (скидка{' '}
                    {Math.round((1 - FREQUENCY_COEFFICIENTS[freq]) * 100)}%)
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className='mt-6'>
          <div
            className={cn(
              'flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-all',
              isUrgent
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-primary/30',
            )}
            onClick={() => onUrgentChange(!isUrgent)}
          >
            <Checkbox
              checked={isUrgent}
              id='urgent'
              onCheckedChange={(c) => onUrgentChange(!!c)}
            />
            <Label
              className='flex cursor-pointer items-center'
              htmlFor='urgent'
            >
              <Zap className='mr-2 h-4 w-4 text-yellow-500' />
              Срочный заказ (+50% к стоимости)
            </Label>
          </div>
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
