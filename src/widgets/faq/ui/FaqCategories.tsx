'use client';

import { FaqCategory } from '@/entities/faq';
import { TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface FaqCategoriesProperties {
  categories: FaqCategory[];
  showAllCategories?: boolean;
}

export const FaqCategories = ({
  categories,
  showAllCategories = true,
}: FaqCategoriesProperties) => {
  if (!showAllCategories) return;

  return (
    <TabsList className='mb-8 grid grid-cols-2 md:grid-cols-4'>
      {categories.map((category) => (
        <TabsTrigger key={category.id} value={category.id}>
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
