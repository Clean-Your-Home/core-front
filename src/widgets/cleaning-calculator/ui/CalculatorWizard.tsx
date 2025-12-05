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
];

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
      case 0:
        return !!calc.serviceType;
      case 1:
        return calc.area >= 10;
      case 2:
        return !!calc.frequency;
      default:
        return true;
    }
  }, [currentStep, calc.serviceType, calc.area, calc.frequency]);

  const progressPercentage = (currentStep / STEPS_INFO.length) * 1.2 * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceTypeStep
            selectedType={calc.serviceType}
            onSelect={calc.setServiceType}
            displayPrice={calc.displayPrice}
          />
        );
      case 1:
        return (
          <AreaStep
            area={calc.area}
            onAreaChange={calc.setArea}
            displayPrice={calc.displayPrice}
          />
        );
      case 2:
        return (
          <FrequencyStep
            frequency={calc.frequency}
            onFrequencyChange={calc.setFrequency}
            isUrgent={calc.isUrgent}
            onUrgentChange={calc.setIsUrgent}
            displayPrice={calc.displayPrice}
          />
        );
      case 3:
        return (
          <AdditionalOptionsStep
            noMop={calc.noMop}
            setNoMop={calc.setNoMop}
            noVacuum={calc.noVacuum}
            setNoVacuum={calc.setNoVacuum}
            hasPet={calc.hasPet}
            setHasPet={calc.setHasPet}
            displayPrice={calc.displayPrice}
          />
        );
      case 4:
        return (
          <AdditionalServicesStep
            servicesState={calc.additionalServicesState}
            onServiceChange={calc.handleAdditionalServiceChange}
            onQuantityChange={calc.handleQuantityChange}
            displayPrice={calc.displayPrice}
          />
        );
      case 5:
        return (
          <SummaryStep
            summary={calc.getOrderSummary()}
            displayPrice={calc.displayPrice}
          />
        );
      default:
        return null;
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
            <Progress value={progressPercentage} className='h-2' />
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>{renderStepContent()}</CardContent>

        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Назад
          </Button>

          {currentStep === STEPS_INFO.length - 1 ? (
            <Button
              onClick={() => setIsOrderModalOpen(true)}
              disabled={!calc.serviceType}
            >
              Заказать уборку
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!canProceed}>
              Далее
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          )}
        </CardFooter>
      </Card>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialService={calc.serviceType}
        fromCalculator={true}
        calculatorOptions={{
          noMop: calc.noMop,
          noVacuum: calc.noVacuum,
          hasPet: calc.hasPet,
        }}
        orderSummary={calc.getOrderSummary()}
      />
    </div>
  );
};
