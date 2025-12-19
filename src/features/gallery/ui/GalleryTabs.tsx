import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { categories } from '../model/galleryData';

interface GalleryTabsProperties {
  activeCategory: string;
  onChange: (value: string) => void;
}

export const GalleryTabs = ({
  activeCategory,
  onChange,
}: GalleryTabsProperties) => {
  return (
    <Tabs value={activeCategory} onValueChange={onChange}>
      <TabsList className='mb-8 grid grid-cols-2 gap-2 md:grid-cols-5'>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
