import { ADVANTAGES, COMPANY_INFO } from '@/entities/company';
import { Typography } from '@/shared/ui/typography';
import { AdvantageCard } from './AdvantageCard';

export const AboutContent = () => {
  return (
    <div>
      <Typography className='mb-6' variant='h2'>
        О нас
      </Typography>
      <Typography className='mb-6 text-lg'>
        {COMPANY_INFO.description}
      </Typography>
      {COMPANY_INFO.values.map((value, index) => (
        <Typography key={index} className='mb-6 text-lg'>
          {value}
        </Typography>
      ))}

      <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
        {ADVANTAGES.map((advantage) => (
          <AdvantageCard key={advantage.id} advantage={advantage} />
        ))}
      </div>
    </div>
  );
};
