import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';

interface AreaStepProperties {
  area: number;
  onAreaChange: (value: number) => void;
  displayPrice: number;
}

export const AreaStep = ({
  area,
  onAreaChange,
  displayPrice,
}: AreaStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <Label className='text-lg' htmlFor='area'>
            Укажите площадь помещения
          </Label>
          <span className='text-xl font-semibold text-primary'>{area} м²</span>
        </div>
        <Slider
          className='py-4'
          id='area'
          max={300}
          min={10}
          step={5}
          value={[area]}
          onValueChange={(vals) => onAreaChange(vals[0])}
        />
        <div className='flex justify-between text-xs text-muted-foreground'>
          <span>10 м²</span>
          <span>300 м²</span>
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
