'use client';

import { FaqCategory } from '@/entities/faq';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { TabsContent } from '@/shared/ui/tabs';
import { Typography } from '@/shared/ui/typography';

interface FaqContentProperties {
  categories: FaqCategory[];
}

export const FaqContent = ({ categories }: FaqContentProperties) => {
  return (
    <>
      {categories.map((category) => (
        <TabsContent key={category.id} className='mt-0' value={category.id}>
          <Accordion collapsible className='w-full' type='single'>
            {category.questions.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className='text-left'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <Typography variant='muted'>{item.answer}</Typography>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </>
  );
};
