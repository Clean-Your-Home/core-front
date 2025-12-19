'use client';

import {
  GalleryGrid,
  GalleryModal,
  GalleryTabs,
  useGallery,
} from '@/features/gallery/';

const GalleryPage = () => {
  const {
    activeCategory,
    filteredItems,
    selectedItem,
    currentIndex,
    setActiveCategory,
    openModal,
    closeModal,
    goPrevious,
    goNext,
  } = useGallery();

  return (
    <div className='container mx-auto py-12'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-10 text-center'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Галерея до и после
          </h1>
          <p className='mt-4 text-lg text-muted-foreground'>
            Фотографии наших работ до и после уборки
          </p>
        </div>

        <GalleryTabs
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <GalleryGrid items={filteredItems} onItemClick={openModal} />
        <GalleryModal
          currentIndex={currentIndex}
          item={selectedItem}
          totalItems={filteredItems.length}
          onClose={closeModal}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      </div>
    </div>
  );
};

export default GalleryPage;
