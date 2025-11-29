'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProperties = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...properties }: ToasterProperties) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      richColors
      className='toaster group'
      theme={theme as ToasterProperties['theme']}
      {...properties}
    />
  );
};
