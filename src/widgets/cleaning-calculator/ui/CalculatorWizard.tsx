'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import {
  AdditionalOptionsStep,
  AdditionalServicesStep,
  AreaStep,
  FrequencyStep,
  ServiceTypeStep,
  SummaryStep,
  useCleaningCalculation,
} from '@/features/cleaning-calculator';
import { OrderModal } from '@/features/create-order/ui/OrderModal/OrderModal';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

const STEPS_INFO = [
  {
    title: 'Тип уборки',
    description: 'Выберите тип услуги для расчета стоимости',
  },
  {
    title: 'Площадь',
    description: 'Укажите площадь помещения для более точного расчета',
  },
  { title: 'Частота', description: 'Выберите частоту уборки и срочность' },
  {
    title: 'Доп. опции',
    description: 'Укажите дополнительные опции, если необходимо',
  },
  {
    title: 'Доп. услуги',
    description: 'Выберите дополнительные услуги, если необходимо',
  },
  { title: 'Итог', description: 'Проверьте итоговый расчет и оформите заказ' },
] as const;

export const CalculatorWizard = () => {
  const calc = useCleaningCalculation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep((previous) => Math.min(previous + 1, STEPS_INFO.length - 1));
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
  }, []);

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0: {
        return !!calc.serviceType;
      }
      case 1: {
        return calc.area >= 10;
      }
      case 2: {
        return !!calc.frequency;
      }
      default: {
        return true;
      }
    }
  }, [currentStep, calc.serviceType, calc.area, calc.frequency]);

  const progressPercentage = (currentStep / STEPS_INFO.length) * 1.2 * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: {
        return (
          <ServiceTypeStep
            displayPrice={calc.displayPrice}
            selectedType={calc.serviceType}
            onSelect={calc.setServiceType}
          />
        );
      }
      case 1: {
        return (
          <AreaStep
            area={calc.area}
            displayPrice={calc.displayPrice}
            onAreaChange={calc.setArea}
          />
        );
      }
      case 2: {
        return (
          <FrequencyStep
            displayPrice={calc.displayPrice}
            frequency={calc.frequency}
            isUrgent={calc.isUrgent}
            onFrequencyChange={calc.setFrequency}
            onUrgentChange={calc.setIsUrgent}
          />
        );
      }
      case 3: {
        return (
          <AdditionalOptionsStep
            displayPrice={calc.displayPrice}
            hasPet={calc.hasPet}
            noMop={calc.noMop}
            noVacuum={calc.noVacuum}
            setHasPet={calc.setHasPet}
            setNoMop={calc.setNoMop}
            setNoVacuum={calc.setNoVacuum}
          />
        );
      }
      case 4: {
        return (
          <AdditionalServicesStep
            displayPrice={calc.displayPrice}
            servicesState={calc.additionalServicesState}
            onQuantityChange={calc.handleQuantityChange}
            onServiceChange={calc.handleAdditionalServiceChange}
          />
        );
      }
      case 5: {
        return (
          <SummaryStep
            displayPrice={calc.displayPrice}
            summary={calc.getOrderSummary()}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className='mx-auto max-w-3xl'>
      <Card className='border-2 transition-all duration-300'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Шаг {currentStep + 1}: {STEPS_INFO[currentStep].title}
          </CardTitle>
          <CardDescription>
            {STEPS_INFO[currentStep].description}
          </CardDescription>
          <div className='mt-4'>
            <div className='mb-2 flex justify-between text-xs text-muted-foreground'>
              {STEPS_INFO.map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'transition-colors',
                    index <= currentStep ? 'text-primary' : '',
                  )}
                >
                  {index + 1}
                </span>
              ))}
            </div>
            <Progress className='h-2' value={progressPercentage} />
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>{renderStepContent()}</CardContent>

        <CardFooter className='flex justify-between'>
          <Button
            disabled={currentStep === 0}
            variant='outline'
            onClick={previousStep}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Назад
          </Button>

          {currentStep === STEPS_INFO.length - 1 ? (
            <Button
              disabled={!calc.serviceType}
              onClick={() => setIsOrderModalOpen(true)}
            >
              Заказать уборку
            </Button>
          ) : (
            <Button disabled={!canProceed} onClick={nextStep}>
              Далее
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          )}
        </CardFooter>
      </Card>

      <OrderModal
        calculatorOptions={{
          hasPet: calc.hasPet,
          noMop: calc.noMop,
          noVacuum: calc.noVacuum,
        }}
        fromCalculator={true}
        initialService={calc.serviceType}
        isOpen={isOrderModalOpen}
        orderSummary={calc.getOrderSummary()}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
};
