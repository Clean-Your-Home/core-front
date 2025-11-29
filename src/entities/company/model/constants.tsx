import { Advantage, CompanyInfo } from './types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'Spotless Cleaning',
  yearsExperience: 5,
  description:
    'Мы работаем на рынке клининговых услуг уже 5 лет и заботимся о каждом клиенте. Наша команда состоит из профессионалов, которые любят свою работу и стремятся сделать ваш дом или офис идеально чистым.',
  values: [
    'Мы используем только профессиональное оборудование и экологически чистые моющие средства, которые безопасны для вас, ваших детей и домашних животных.',
  ],
};

export const ADVANTAGES: Advantage[] = [
  {
    id: 1,
    title: 'Быстро',
    description: 'Мы ценим ваше время и выполняем работу в кратчайшие сроки',
    icon: (properties) => (
      <svg
        fill='none'
        stroke='currentColor'
        strokeWidth={1.5}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        {...properties}
      >
        <path
          d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Качественно',
    description: 'Мы гарантируем высокое качество всех выполняемых работ',
    icon: (properties) => (
      <svg
        fill='none'
        stroke='currentColor'
        strokeWidth={1.5}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        {...properties}
      >
        <path
          d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Экологично',
    description:
      'Мы используем только безопасные и экологичные средства для уборки',
    icon: (properties) => (
      <svg
        fill='none'
        stroke='currentColor'
        strokeWidth={1.5}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        {...properties}
      >
        <path
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];
