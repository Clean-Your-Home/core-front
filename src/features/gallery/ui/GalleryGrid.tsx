import type { GalleryItem } from '../model/types';

import { GalleryCard } from './GalleryCard';

interface GalleryGridProperties {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem, index: number) => void;
}

export const GalleryGrid = ({ items, onItemClick }: GalleryGridProperties) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item, index)}
        />
      ))}
    </div>
  );
};
