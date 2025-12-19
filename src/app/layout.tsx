import './reset.css';
import './globals.css';

import { Metadata } from 'next';

import { Toaster } from '@/shared/ui/sonner';
import { Footer, Header } from '@/widgets';

export const metadata: Metadata = {
  title: {
    default: 'Клининговая компания | Профессиональная уборка в [Город]',
    template: '%s | Клининг в [Город]',
  },
  description:
    'Профессиональная уборка квартир, домов, офисов и помещений после ремонта. Генеральная уборка, химчистка мебели, мойка окон. Выезд в день заказа. Гарантия качества и фиксированные цены.',
  keywords: [
    'уборка квартиры',
    'клининг [город]',
    'генеральная уборка',
    'уборка после ремонта',
    'химчистка дивана',
    'мойка окон',
    'клининговая компания',
    'профессиональная уборка',
    'поддерживающая уборка',
    'уборка офиса',
  ],
  authors: [{ name: 'Название вашей компании' }],
  creator: 'Название вашей компании',
  publisher: 'Название вашей компании',

  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://spotless-cleaning.ru',
    siteName: 'Spotless Cleaning',
    title: 'Профессиональная уборка квартир и офисов в Москве',
    description:
      'Быстро, качественно и недорого. Генеральная уборка, химчистка мебели, мойка окон. Рассчитайте стоимость онлайн за 1 минуту!',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
