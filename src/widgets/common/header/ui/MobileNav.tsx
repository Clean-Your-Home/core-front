import { Menu } from 'lucide-react';
import Link from 'next/link';

import { NAVIGATION } from '@/entities/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { NavItem } from './NavItem';

interface MobileNavProperties {
  pathname: string;
  onNavigation: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

export const MobileNav = ({ pathname, onNavigation }: MobileNavProperties) => {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button size='icon' variant='outline'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <div className='flex flex-col gap-6 py-6'>
          <Link className='flex items-center space-x-2' href={ROUTES.HOME}>
            <span className='text-xl font-bold text-primary'>
              Spotless Cleaning
            </span>
          </Link>
          <nav className='mt-2 flex flex-col gap-4'>
            {NAVIGATION.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                pathname={pathname}
                onNavigation={onNavigation}
              />
            ))}
          </nav>
          <div className='flex flex-col gap-2'>
            <Button asChild>
              <Link href={ROUTES.CALCULATOR}>Заказать уборку</Link>
            </Button>
            <Link href={ROUTES.LOGIN}>
              <Button className='w-full' variant='outline'>
                Личный кабинет
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
