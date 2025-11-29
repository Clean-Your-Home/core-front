'use client';

import { User } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { useHeader } from '../lib/useHeader';
import { useNavigation } from '../lib/useNavigation';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Header = () => {
  const { pathname, handleProfileClick } = useHeader();
  const { handleNavigation } = useNavigation();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Link href={ROUTES.HOME} className='flex items-center space-x-2'>
            <span className='whitespace-nowrap text-xl font-bold text-primary'>
              Spotless Cleaning
            </span>
          </Link>
        </div>

        <DesktopNav pathname={pathname} onNavigation={handleNavigation} />

        <div className='flex items-center gap-4'>
          <Button asChild variant='default' className='hidden md:inline-flex'>
            <Link href={ROUTES.CALCULATOR}>Заказать уборку</Link>
          </Button>

          <Link
            href={ROUTES.LOGIN}
            className='hidden md:inline-flex'
            onClick={handleProfileClick}
          >
            <Button variant='outline' size='icon'>
              <User className='h-5 w-5' />
              <span className='sr-only'>Личный кабинет</span>
            </Button>
          </Link>

          <MobileNav pathname={pathname} onNavigation={handleNavigation} />
        </div>
      </div>
    </header>
  );
};
