import type { GalleryItem } from '../model/types';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/ui/dialog';

interface GalleryModalProperties {
  item: GalleryItem | undefined;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const GalleryModal = ({
  item,
  currentIndex,
  totalItems,
  onClose,
  onPrevious,
  onNext,
}: GalleryModalProperties) => {
  if (!item) return;

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='p-0 sm:max-w-[750px]'>
        <div className='relative'>
          <div className='grid md:grid-cols-2'>
            <div className='relative h-64 border-r md:h-96'>
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
            <div className='relative h-64 md:h-96'>
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

          <div className='p-6'>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription className='mt-2'>
              {item.description}
            </DialogDescription>
          </div>

          <div className='flex justify-between border-t p-4'>
            <Button
              disabled={currentIndex === 0}
              variant='outline'
              onClick={onPrevious}
            >
              <ChevronLeft className='mr-2 h-4 w-4' />
              Предыдущее
            </Button>
            <Button
              disabled={currentIndex === totalItems - 1}
              variant='outline'
              onClick={onNext}
            >
              Следующее
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
