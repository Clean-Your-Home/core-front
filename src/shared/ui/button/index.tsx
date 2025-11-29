import type { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from './variants';

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ className, variant, size, asChild = false, ...properties }, reference) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={reference}
        className={cn(buttonVariants({ variant, size, className }))}
        {...properties}
      />
    );
  },
);
Button.displayName = 'Button';
