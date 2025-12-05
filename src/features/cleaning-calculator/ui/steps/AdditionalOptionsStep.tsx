import { Brush as Broom, Cat, Dog, AirVent as Vacuum } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

interface AdditionalOptionsStepProperties {
  noMop: boolean;
  setNoMop: (v: boolean) => void;
  noVacuum: boolean;
  setNoVacuum: (v: boolean) => void;
  hasPet: boolean;
  setHasPet: (v: boolean) => void;
  displayPrice: number;
}

export const AdditionalOptionsStep = ({
  noMop,
  setNoMop,
  noVacuum,
  setNoVacuum,
  hasPet,
  setHasPet,
  displayPrice,
}: AdditionalOptionsStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label className='text-lg'>Дополнительные опции</Label>
        <div className='grid grid-cols-1 gap-4'>
          <OptionItem
            checked={noMop}
            icon={<Broom className='mr-2 h-4 w-4' />}
            id='no-mop'
            label='У меня нет швабры, ведра (+300 ₽)'
            onChange={setNoMop}
          />
          <OptionItem
            checked={noVacuum}
            icon={<Vacuum className='mr-2 h-4 w-4' />}
            id='no-vacuum'
            label='У меня нет пылесоса (+500 ₽)'
            onChange={setNoVacuum}
          />
          <OptionItem
            checked={hasPet}
            icon={
              <div className='mr-2 flex'>
                <Dog className='h-4 w-4' />
                <Cat className='ml-1 h-4 w-4' />
              </div>
            }
            id='has-pet'
            label='У меня есть собака/кошка (+300 ₽)'
            onChange={setHasPet}
          />
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

const OptionItem = ({ checked, onChange, icon, label, id }: any) => (
  <div
    className={cn(
      'flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-all',
      checked
        ? 'border-primary bg-primary/5'
        : 'border-muted hover:border-primary/30',
    )}
    onClick={() => onChange(!checked)}
  >
    <Checkbox
      checked={checked}
      id={id}
      onCheckedChange={(c) => onChange(!!c)}
    />
    <Label className='flex cursor-pointer items-center' htmlFor={id}>
      {icon}
      {label}
    </Label>
  </div>
);
