import { ROUTES } from './routes';

export const COMPANY = {
  NAME: 'Spotless Cleaning',
  EMAIL: 'info@sablefur.ru',
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

export const NAVIGATION = {
  MENU: [
    { label: 'Главная', href: ROUTES.HOME },
    { label: 'Услуги', href: ROUTES.SERVICES },
    { label: 'О нас', href: ROUTES.ABOUT },
    { label: 'Галерея', href: ROUTES.GALLERY },
    { label: 'Блог', href: ROUTES.BLOG },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'Контакты', href: ROUTES.CONTACT },
  ],
};
