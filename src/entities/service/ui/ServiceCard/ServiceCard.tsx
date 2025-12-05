import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Service } from '../../model/types';

interface ServiceCardProperties {
  service: Service;
  index: number;
  onDetailsClick: (service: Service) => void;
}

export const ServiceCard = ({
  service,
  index,
  onDetailsClick,
}: ServiceCardProperties) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all duration-500',
        'animate-fade-in-up translate-y-10 opacity-0',
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
        <service.icon className='h-6 w-6' />
      </div>
      <h3 className='mb-2 text-xl font-semibold'>{service.title}</h3>
      <p className='mb-6 flex-1 text-muted-foreground'>{service.description}</p>
      <Button
        className='mt-auto'
        variant='outline'
        onClick={() => onDetailsClick(service)}
      >
        Подробнее
      </Button>
    </div>
  );
};
