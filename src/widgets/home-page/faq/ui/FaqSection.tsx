'use client';

import { FAQ_DATA } from '@/entities/faq';
import { Tabs } from '@/shared/ui/tabs';
import { Typography } from '@/shared/ui/typography';
import { FaqCategories } from './FaqCategories';
import { FaqContact } from './FaqContact';
import { FaqContent } from './FaqContent';

interface FaqSectionProperties {
  showAllCategories?: boolean;
  showContact?: boolean;
  showHeader?: boolean;
}

export const FaqSection = ({
  showAllCategories = true,
  showContact = true,
  showHeader = true,
}: FaqSectionProperties) => {
  return (
    <div className='container mx-auto py-12'>
      {showHeader && (
        <div className='mb-10 text-center'>
          <Typography
            className='font-bold tracking-tight sm:text-4xl'
            variant='h2'
          >
            Часто задаваемые вопросы
          </Typography>
          <Typography className='mt-4' variant='lead'>
            Ответы на популярные вопросы о наших услугах
          </Typography>
        </div>
      )}

      <Tabs defaultValue='general'>
        <FaqCategories
          categories={FAQ_DATA}
          showAllCategories={showAllCategories}
        />
        <FaqContent categories={FAQ_DATA} />
      </Tabs>

      {showContact && <FaqContact />}
    </div>
  );
};
