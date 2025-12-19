import type { GalleryItem } from '../model/types';

import Image from 'next/image';

import { Card, CardContent } from '@/shared/ui/card';

interface GalleryCardProperties {
  item: GalleryItem;
  onClick: () => void;
}

export const GalleryCard = ({ item, onClick }: GalleryCardProperties) => {
  return (
    <Card
      className='cursor-pointer overflow-hidden transition-shadow hover:shadow-md'
      onClick={onClick}
    >
      <CardContent className='p-0'>
        <div className='grid grid-cols-2'>
          <div className='relative h-48 border-r'>
            <div className='absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white'>
              До
            </div>
            <Image
              fill
              alt={`${item.title} - до`}
              className='object-cover'
              src={item.before}
            />
          </div>
          <div className='relative h-48'>
            <div className='absolute right-2 top-2 rounded bg-primary/90 px-2 py-1 text-xs text-white'>
              После
            </div>
            <Image
              fill
              alt={`${item.title} - после`}
              className='object-cover'
              src={item.after}
            />
          </div>
        </div>
        <div className='p-4'>
          <h3 className='font-semibold'>{item.title}</h3>
          <p className='text-sm text-muted-foreground'>{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
