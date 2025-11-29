import { useState } from 'react';
import { usePathname } from 'next/navigation';

const handleProfileClick = () => {
  // TODO: добавить реализацию с middleware
};
export const useHeader = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const pathname = usePathname();

  return {
    isOrderModalOpen,
    setIsOrderModalOpen,
    pathname,
    handleProfileClick,
  };
};
