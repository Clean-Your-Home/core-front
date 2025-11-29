import { Advantage } from '@/entities/company';
import { Typography } from '@/shared/ui/typography';

interface AdvantageCardProperties {
  advantage: Advantage;
}

export const AdvantageCard = ({ advantage }: AdvantageCardProperties) => {
  const Icon = advantage.icon;

  return (
    <div className='flex flex-col items-center text-center'>
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
        <Icon className='h-8 w-8' />
      </div>
      <Typography className='mb-2 text-xl font-semibold' variant='h3'>
        {advantage.title}
      </Typography>
      <Typography variant='muted'>{advantage.description}</Typography>
    </div>
  );
};
