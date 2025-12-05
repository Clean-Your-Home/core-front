'use client';

import { CalendarIcon, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { CleaningOrderSummary } from '@/entities/cleaning/model/types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import {
  dateRequiredServices,
  servicesList,
  timeSlots,
} from '../../model/constants';
import { OrderFormValues, OrderSchema } from '../../model/order-schema';

export interface OrderModalProperties {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;

  fromCalculator?: boolean;
  calculatorOptions?: {
    noMop?: boolean;
    noVacuum?: boolean;
    hasPet?: boolean;
  };
  orderSummary?: CleaningOrderSummary;
}

type OrderFormInput = {
  name: string;
  phone: string;
  address: string;
  service: string;
  comment?: string;
  date?: Date;
  timeSlot?: string;
  noMop?: boolean;
  noVacuum?: boolean;
  hasPet?: boolean;
};

const getInitialService = (
  initialService: string | undefined,
  orderSummary: CleaningOrderSummary | undefined,
): string => {
  if (initialService) return initialService;
  if (orderSummary?.serviceType) return orderSummary.serviceType;
  return servicesList[0]; // Default service
};

const getDefaultValues = (
  defaultService: string,
  calculatorOptions: OrderModalProperties['calculatorOptions'],
): OrderFormValues => ({
  name: '',
  phone: '',
  address: '',
  comment: '',
  service: defaultService,
  date: undefined,
  timeSlot: '',
  noMop: calculatorOptions?.noMop ?? false,
  noVacuum: calculatorOptions?.noVacuum ?? false,
  hasPet: calculatorOptions?.hasPet ?? false,
});

export const OrderModal = ({
  isOpen,
  onClose,
  initialService,
  fromCalculator = false,
  calculatorOptions = {},
  orderSummary,
}: OrderModalProperties) => {
  const router = useRouter();

  const defaultService = getInitialService(initialService, orderSummary);

  const initialDefaultValues = getDefaultValues(
    defaultService,
    calculatorOptions,
  );

  const form = useForm<OrderFormInput>({
    resolver: zodResolver(OrderSchema),
    mode: 'onBlur',
    defaultValues: initialDefaultValues as OrderFormInput,
  });

  const selectedService = useWatch({ control: form.control, name: 'service' });
  const isDateRequired = dateRequiredServices.includes(selectedService);
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (isOpen) {
      const resetValues = getDefaultValues(
        defaultService,
        calculatorOptions,
      ) as OrderFormInput;
      form.reset(resetValues);
    }
  }, [isOpen, initialService, calculatorOptions, defaultService, form]);

  const onSubmit: SubmitHandler<OrderFormInput> = (data) => {
    const validatedData = data as OrderFormValues;

    const submitPromise = new Promise<{ success: boolean; service: string }>(
      (resolve, reject) => {
        // eslint-disable-next-line no-console
        console.log('Order submitted:', validatedData);

        const finalData = {
          ...validatedData,
          date: validatedData.date
            ? format(validatedData.date, 'yyyy-MM-dd')
            : undefined,
          orderSummary: orderSummary ?? undefined,
        };

        setTimeout(() => {
          try {
            localStorage.setItem('pendingOrder', JSON.stringify(finalData));
            resolve({ success: true, service: validatedData.service });
          } catch (error) {
            reject(error);
          }
        }, 1500);
      },
    );

    toast.promise(submitPromise, {
      loading: 'Отправка заказа...',
      success: (result) => {
        onClose();
        router.push('/payment');
        return `Заказ на "${result.service}" принят! Перенаправляем к оплате.`;
      },
      error: 'Ошибка при оформлении заказа. Пожалуйста, проверьте данные.',
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-[450px]'>
          <DialogHeader>
            <DialogTitle>Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами для уточнения деталей
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className='grid gap-4 py-2'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя</FormLabel>
                    <FormControl>
                      <Input placeholder='Иван Иванов' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='+7 (999) 123-45-67'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='г. Москва, ул. Примерная, д. 10, кв. 42'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!fromCalculator && (
                <FormField
                  control={form.control}
                  name='service'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Выберите услугу</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите услугу' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {servicesList.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isDateRequired && (
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Дата уборки</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                              variant={'outline'}
                            >
                              <CalendarIcon className='mr-2 h-4 w-4' />
                              {field.value && isValid(field.value)
                                ? format(field.value, 'd MMMM yyyy', {
                                    locale: ru,
                                  })
                                : 'Выберите дату'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='start' className='w-auto p-0'>
                          <Calendar
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              const maxDate = addDays(today, 30);
                              return date < today || date > maxDate;
                            }}
                            locale={ru}
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isDateRequired && (
                <FormField
                  control={form.control}
                  name='timeSlot'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Время уборки</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите время' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              <div className='flex items-center'>
                                <Clock className='mr-2 h-4 w-4' />
                                <span>{slot}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!fromCalculator && (
                <div className='mt-2 grid gap-2'>
                  <FormLabel>Дополнительные опции</FormLabel>
                  <div className='space-y-2 pt-1'>
                    <FormField
                      control={form.control}
                      name='noMop'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel>У меня нет швабры, ведра</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='noVacuum'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel>У меня нет пылесоса</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='hasPet'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel>У меня есть собака/кошка</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комментарий</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Укажите дополнительную информацию'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className='mt-4 w-full'
                disabled={isSubmitting}
                type='submit'
              >
                {isSubmitting ? 'Отправка...' : 'Перейти к оплате'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
