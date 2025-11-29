'use client';

import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

import { Service } from '@/entities/service';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

interface ServiceCardProperties {
  service: Service;
  index: number;
  onServiceClick: (service: Service) => void;
}

export const ServiceCard = memo(function ServiceCard({
  service,
  onServiceClick,
}: ServiceCardProperties) {
  const handleClick = () => {
    onServiceClick(service);
  };

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-md',
      )}
    >
      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
        <service.icon className='h-6 w-6' />
      </div>
      <Typography className='mb-2 text-xl font-semibold' variant='h3'>
        {service.title}
      </Typography>
      <Typography className='mb-6 flex-1' variant='muted'>
        {service.description}
      </Typography>
      <Button
        className='group mt-auto bg-transparent'
        variant='outline'
        onClick={handleClick}
      >
        Подробнее
        <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
      </Button>
    </div>
  );
});
