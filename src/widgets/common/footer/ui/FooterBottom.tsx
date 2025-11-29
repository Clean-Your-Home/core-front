import { COMPANY_INFO } from '@/entities/company';
import { Typography } from '@/shared/ui/typography';

export const FooterBottom = () => {
  return (
    <div className='mt-10 border-t pt-6 text-center'>
      <Typography className='text-muted-foreground' variant='small'>
        © {COMPANY_INFO.year} {COMPANY_INFO.name}. Все права защищены.
      </Typography>
    </div>
  );
};
