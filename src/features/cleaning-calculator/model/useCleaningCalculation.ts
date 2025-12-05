import { useCallback, useEffect, useRef, useState } from 'react';

import {
  ADDITIONAL_SERVICES_LIST,
  BASE_PRICES,
  EXTRA_COSTS,
  FREQUENCY_COEFFICIENTS,
  URGENCY_COEFFICIENT,
} from '@/entities/cleaning/model/constants';
import {
  AdditionalServicesState,
  CleaningOrderSummary,
} from '@/entities/cleaning/model/types';
import { useDebounceValue } from '@/shared/lib/hooks/useDebounceValue';

export const useCleaningCalculation = () => {
  const [serviceType, setServiceType] = useState<string>('');
  const [area, setArea] = useState<number>(50);
  const [frequency, setFrequency] = useState<string>('Разовая');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const [noMop, setNoMop] = useState<boolean>(false);
  const [noVacuum, setNoVacuum] = useState<boolean>(false);
  const [hasPet, setHasPet] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [displayPrice, setDisplayPrice] = useState<number>(0);

  const debouncedArea = useDebounceValue(area, 100);

  const animationReference = useRef<number | null>(null);
  const previousPriceReference = useRef<number>(0);

  const [additionalServicesState, setAdditionalServicesState] =
    useState<AdditionalServicesState>(() => {
      const initialState: AdditionalServicesState = {};
      for (const service of ADDITIONAL_SERVICES_LIST) {
        initialState[service.id] = { selected: false, quantity: 1 };
      }
      return initialState;
    });

  const handleAdditionalServiceChange = useCallback(
    (serviceId: string, checked: boolean) => {
      setAdditionalServicesState((previous) => ({
        ...previous,
        [serviceId]: { ...previous[serviceId], selected: checked },
      }));
    },
    [],
  );

  const handleQuantityChange = useCallback(
    (serviceId: string, quantity: number) => {
      setAdditionalServicesState((previous) => ({
        ...previous,
        [serviceId]: { ...previous[serviceId], quantity },
      }));
    },
    [],
  );

  const calculatePrice = useCallback(() => {
    if (!serviceType) return 0;

    let price = (BASE_PRICES[serviceType] || 0) * debouncedArea;

    for (const [serviceId, state] of Object.entries(additionalServicesState)) {
      if (state.selected) {
        const service = ADDITIONAL_SERVICES_LIST.find(
          (s) => s.id === serviceId,
        );
        if (service) {
          price += service.price * state.quantity;
        }
      }
    }

    price *= FREQUENCY_COEFFICIENTS[frequency] || 1;
    if (isUrgent) price *= URGENCY_COEFFICIENT;

    if (noMop) price += EXTRA_COSTS.noMop;
    if (noVacuum) price += EXTRA_COSTS.noVacuum;
    if (hasPet) price += EXTRA_COSTS.hasPet;

    return Math.round(price);
  }, [
    serviceType,
    debouncedArea,
    additionalServicesState,
    frequency,
    isUrgent,
    noMop,
    noVacuum,
    hasPet,
  ]);

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [calculatePrice]);

  useEffect(() => {
    if (Math.abs(totalPrice - previousPriceReference.current) < 10) {
      setDisplayPrice(totalPrice);
      previousPriceReference.current = totalPrice;
      return;
    }

    if (animationReference.current)
      cancelAnimationFrame(animationReference.current);

    const startPrice = previousPriceReference.current;
    const endPrice = totalPrice;
    const duration = 300;
    const startTime = performance.now();

    const animatePrice = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentPrice = Math.round(
        startPrice + (endPrice - startPrice) * easeProgress,
      );
      setDisplayPrice(currentPrice);

      if (progress < 1) {
        animationReference.current = requestAnimationFrame(animatePrice);
      } else {
        previousPriceReference.current = endPrice;
      }
    };

    animationReference.current = requestAnimationFrame(animatePrice);
    return () => {
      if (animationReference.current)
        cancelAnimationFrame(animationReference.current);
    };
  }, [totalPrice]);

  const getOrderSummary = (): CleaningOrderSummary => {
    const additionalServices = [];

    for (const [id, service] of Object.entries(additionalServicesState)) {
      if (service.selected) {
        additionalServices.push({
          id,
          quantity: service.quantity,
        });
      }
    }

    return {
      serviceType,
      area,
      frequency,
      isUrgent,
      noMop,
      noVacuum,
      hasPet,
      additionalServices,
    };
  };

  return {
    serviceType,
    setServiceType,
    area,
    setArea,
    frequency,
    setFrequency,
    isUrgent,
    setIsUrgent,
    noMop,
    setNoMop,
    noVacuum,
    setNoVacuum,
    hasPet,
    setHasPet,
    additionalServicesState,
    displayPrice,
    handleAdditionalServiceChange,
    handleQuantityChange,
    getOrderSummary,
  };
};
