import { Metadata } from 'next';

import { CalculatorWizard } from '@/widgets/cleaning-calculator';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости уборки',
  description:
    'Рассчитайте точную стоимость уборки квартиры или дома онлайн за 1 минуту.',
};

const CalculatorPage = () => {
  return (
    <div className='container mx-auto py-12'>
      <div className='mb-10 text-center'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Калькулятор стоимости услуг
        </h1>
        <p className='mt-4 text-lg text-muted-foreground'>
          Рассчитайте примерную стоимость уборки, указав параметры
        </p>
      </div>

      <CalculatorWizard />
    </div>
  );
};

export default CalculatorPage;
