'use client';

import { useState } from 'react';

import { SERVICES } from '@/entities/service';
import { Typography } from '@/shared/ui/typography';
import { ServiceCard } from './ServiceCard';
import { ServiceModal } from './ServiceModal';

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES)[0] | null
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className='py-8 md:py-16' id='services'>
      <div className='container mx-auto'>
        <div className='mx-auto max-w-2xl text-center'>
          <Typography
            className='text-3xl font-bold tracking-tight sm:text-4xl'
            variant='h2'
          >
            Наши услуги
          </Typography>
          <Typography className='mt-4' variant='lead'>
            Мы предлагаем широкий спектр клининговых услуг для дома и офиса
          </Typography>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              service={service}
              onServiceClick={(service) => {
                setSelectedService(service);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          service={selectedService}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(undefined);
          }}
        />
      )}
    </section>
  );
}
