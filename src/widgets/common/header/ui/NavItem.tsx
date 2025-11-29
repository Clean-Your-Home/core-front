'use client';

import Link from 'next/link';

import { NavItem as NavItemType } from '@/entities/navigation';
import { cn } from '@/shared/lib/utils';

interface NavItemProperties {
  item: NavItemType;
  pathname: string;
  onNavigation: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

export const NavItem = ({
  item,
  pathname,
  onNavigation,
}: NavItemProperties) => {
  const isActive = !item.href.includes('#') && pathname === item.href;

  return (
    <Link
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-muted-foreground',
      )}
      href={item.href}
      onClick={(event) => onNavigation(event, item.href)}
    >
      {item.name}
    </Link>
  );
};
