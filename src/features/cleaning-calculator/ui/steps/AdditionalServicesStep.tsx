import { ADDITIONAL_SERVICES_LIST } from '@/entities/cleaning/model/constants';
import { AdditionalServicesState } from '@/entities/cleaning/model/types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface AdditionalServicesStepProperties {
  servicesState: AdditionalServicesState;
  onServiceChange: (id: string, checked: boolean) => void;
  onQuantityChange: (id: string, qty: number) => void;
  displayPrice: number;
}

export const AdditionalServicesStep = ({
  servicesState,
  onServiceChange,
  onQuantityChange,
  displayPrice,
}: AdditionalServicesStepProperties) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Label className='text-lg'>Дополнительные услуги</Label>
        <div className='space-y-4'>
          {ADDITIONAL_SERVICES_LIST.map((service) => {
            const state = servicesState[service.id];
            return (
              <div
                key={service.id}
                className={cn(
                  'rounded-lg border p-4 transition-all',
                  state.selected
                    ? 'border-primary bg-primary/5'
                    : 'border-muted',
                )}
              >
                <div className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={state.selected}
                      onCheckedChange={(c) => onServiceChange(service.id, !!c)}
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className='flex cursor-pointer items-center font-medium'
                    >
                      <span className='mr-2 text-primary'>{service.icon}</span>
                      {service.name}
                    </Label>
                  </div>
                  <span className='text-muted-foreground'>
                    +{service.price} ₽/{service.unit}
                  </span>
                </div>

                {state.selected && (
                  <div className='mt-2 pl-7'>
                    <p className='mb-2 text-sm text-muted-foreground'>
                      {service.description}
                    </p>
                    <div className='flex items-center'>
                      <Label
                        htmlFor={`quantity-${service.id}`}
                        className='mr-2 text-sm'
                      >
                        Количество:
                      </Label>
                      <div className='flex items-center'>
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() =>
                            onQuantityChange(
                              service.id,
                              Math.max(1, state.quantity - 1),
                            )
                          }
                        >
                          -
                        </Button>
                        <Input
                          className='mx-2 h-8 w-16 text-center'
                          id={`quantity-${service.id}`}
                          min='1'
                          type='number'
                          value={state.quantity}
                          onChange={(event) =>
                            onQuantityChange(
                              service.id,
                              Math.max(
                                1,
                                Number.parseInt(event.target.value) || 1,
                              ),
                            )
                          }
                        />
                        <Button
                          className='h-8 w-8 p-0'
                          type='button'
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            onQuantityChange(service.id, state.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
