import { usePathname, useRouter } from 'next/navigation';

export const useNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.includes('#') && pathname !== '/') {
      event.preventDefault();

      const [path, hash] = href.split('#');

      router.push(`${path}${hash ? `#${hash}` : ''}`);
    }
  };

  return {
    handleNavigation,
  };
};
