'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Service, ServiceCard, SERVICES } from '@/entities/service';
import { OrderModal } from '@/features/create-order/ui/OrderModal/OrderModal';
import { ServiceDetailsModal } from '@/features/view-service-details/ui/ServiceDetailsModal';

const ServicesSectionContent = () => {
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [serviceToOrder, setServiceToOrder] = useState<string | undefined>();

  const searchParameters = useSearchParams();

  useEffect(() => {
    const serviceParameter = searchParameters.get('service');
    if (!serviceParameter) return;

    const service = SERVICES.find((s) => s.serviceId === serviceParameter);
    if (!service) return;

    const timer = setTimeout(() => {
      setSelectedService(service);

      document
        .querySelector('services')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParameters]);

  const onOrderClick = () => {
    setServiceToOrder(selectedService?.title);
    setSelectedService(undefined);
    setIsOrderModalOpen(true);
  };

  return (
    <section className='py-16 md:py-24' id='services'>
      <div className='container'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Наши услуги
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Мы предлагаем широкий спектр клининговых услуг для дома и офиса
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              service={service}
              onDetailsClick={setSelectedService}
            />
          ))}
        </div>
      </div>

      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(undefined)}
        onOrderClick={onOrderClick}
      />

      <OrderModal
        initialService={serviceToOrder}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  );
};

export const ServicesSection = () => {
  return (
    <Suspense
      fallback={<div className='py-24 text-center'>Загрузка услуг...</div>}
    >
      <ServicesSectionContent />
    </Suspense>
  );
};
