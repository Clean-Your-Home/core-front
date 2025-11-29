import type { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { typographyVariants } from './variants';

export interface TypographyProperties
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProperties>(
  ({ className, variant, asChild = false, as, ...properties }, reference) => {
    const Comp = (
      asChild ? Slot : as || getDefaultElement(variant)
    ) as React.ElementType;

    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        {...properties}
        ref={reference}
      />
    );
  },
);

const getDefaultElement = (
  variant: TypographyProperties['variant'],
): keyof React.JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1': {
      return 'h1';
    }
    case 'h2': {
      return 'h2';
    }
    case 'h3': {
      return 'h3';
    }
    case 'h4': {
      return 'h4';
    }
    case 'blockquote': {
      return 'blockquote';
    }
    case 'list': {
      return 'ul';
    }
    case 'inline-code': {
      return 'code';
    }
    case 'lead': {
      return 'p';
    }
    case 'large': {
      return 'div';
    }
    case 'small': {
      return 'small';
    }
    case 'muted': {
      return 'p';
    }
    default: {
      return 'p';
    }
  }
};

Typography.displayName = 'Typography';
