import type { GalleryItem } from './types';

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'Квартиры',
    title: 'Кухня до и после генеральной уборки',
    before: '/images/gallery/kitchen_before.avif',
    after: '/images/gallery/kitchen_after.avif',
    description:
      'Генеральная уборка кухни: удаление жира, налёта и загрязнений с поверхностей',
  },
  {
    id: 2,
    category: 'Квартиры',
    title: 'Ванная комната до и после глубокой очистки',
    before: '/images/gallery/bathroom-after.avif',
    after: '/images/gallery/deep-cleaning.avif',
    description:
      'Глубокая очистка сантехники, удаление известкового налёта и плесени',
  },
  {
    id: 3,
    category: 'Квартиры',
    title: 'Гостиная до и после комплексной уборки',
    before: '/images/gallery/living_room-before.avif',
    after: '/images/gallery/living_room-after.avif',
    description:
      'Уборка пыли, чистка мягкой мебели и пола, восстановление свежести',
  },
  {
    id: 4,
    category: 'Офисы',
    title: 'Офисное помещение после ремонта',
    before: '/images/gallery/office-cleaning.avif',
    after: '/images/gallery/office-after.avif',
    description:
      'Генеральная уборка офиса после ремонта: удаление строительной пыли и мусора',
  },
  {
    id: 5,
    category: 'Офисы',
    title: 'Переговорная комната до и после уборки',
    before: '/images/gallery/meeting_room-before.avif',
    after: '/images/gallery/meeting_room-after.avif',
    description:
      'Комплексная уборка с дезинфекцией поверхностей и чисткой ковролина',
  },
  {
    id: 6,
    category: 'Мебель',
    title: 'Диван до и после химчистки',
    before: '/images/gallery/sofa-before.avif',
    after: '/images/gallery/furniture-carpet-cleaning.avif',
    description:
      'Профессиональная химчистка мягкой мебели с удалением пятен и запахов',
  },
  {
    id: 7,
    category: 'Мебель',
    title: 'Ковер до и после глубокой чистки',
    before: '/images/gallery/carpet-before.avif',
    after: '/images/gallery/carpet-after.avif',
    description:
      'Глубокая химчистка ковра с восстановлением цвета и удалением загрязнений',
  },
  {
    id: 8,
    category: 'Окна',
    title: 'Окна до и после профессиональной мойки',
    before: '/images/gallery/window-cleaning.avif',
    after: '/images/gallery/window-after.avif',
    description: 'Мойка окон с удалением сложных загрязнений, разводов и пыли',
  },
  {
    id: 9,
    category: 'Квартиры',
    title: 'Поддерживающая уборка квартиры',
    before: '/images/gallery/supportive-cleaning.avif',
    after: '/images/gallery/office-cleaning.avif',
    description:
      'Регулярная поддерживающая уборка для поддержания идеального порядка',
  },
];

export const categories = [
  'Все',
  'Квартиры',
  'Офисы',
  'Мебель',
  'Окна',
] as const;
