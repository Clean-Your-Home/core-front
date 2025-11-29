import { ROUTES } from '@/shared/config/routes';
import { NavItem } from './types';

const HOME_SECTIONS = {
  SERVICES: `${ROUTES.HOME}#services`,
  ABOUT: `${ROUTES.HOME}#about`,
  CONTACTS: `${ROUTES.HOME}#contacts`,
} as const;

export const NAVIGATION: NavItem[] = [
  { name: 'Главная', href: ROUTES.HOME, type: 'page' },
  { name: 'Услуги', href: HOME_SECTIONS.SERVICES, type: 'section' },
  { name: 'О нас', href: HOME_SECTIONS.ABOUT, type: 'section' },
  { name: 'Галерея', href: ROUTES.GALLERY, type: 'page' },
  { name: 'Блог', href: ROUTES.BLOG, type: 'page' },
  { name: 'Контакты', href: HOME_SECTIONS.CONTACTS, type: 'section' },
] as const;
