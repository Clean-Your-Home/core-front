import { COMPANY_INFO } from '@/entities/company';
import { Typography } from '@/shared/ui/typography';

export const FooterAbout = () => {
  return (
    <div>
      <Typography className='text-lg font-semibold' variant='h3'>
        {COMPANY_INFO.name}
      </Typography>
      <Typography className='mt-4 text-muted-foreground' variant='small'>
        {COMPANY_INFO.description}
      </Typography>
    </div>
  );
};
