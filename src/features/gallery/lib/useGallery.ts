'use client';

import type { GalleryItem } from '../model/types';

import { useState } from 'react';

import { galleryItems } from '../model/galleryData';

export const useGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Все');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems =
    activeCategory === 'Все'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openModal = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedItem(undefined);
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      const previousItem = filteredItems[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      setSelectedItem(previousItem);
    }
  };

  const goNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      const nextItem = filteredItems[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setSelectedItem(nextItem);
    }
  };

  return {
    activeCategory,
    setActiveCategory,
    filteredItems,
    selectedItem,
    currentIndex,
    openModal,
    closeModal,
    goPrevious,
    goNext,
  };
};
