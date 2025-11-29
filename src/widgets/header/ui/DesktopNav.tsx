import { NAVIGATION } from '@/entities/navigation';
import { NavItem } from './NavItem';

interface DesktopNavProperties {
  pathname: string;
  onNavigation: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

export const DesktopNav = ({
  pathname,
  onNavigation,
}: DesktopNavProperties) => {
  return (
    <nav className='hidden gap-6 md:flex'>
      {NAVIGATION.map((item) => (
        <NavItem
          key={item.name}
          item={item}
          pathname={pathname}
          onNavigation={onNavigation}
        />
      ))}
    </nav>
  );
};
