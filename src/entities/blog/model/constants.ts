import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Как быстро убрать квартиру перед приходом гостей',
    excerpt:
      'Узнайте, как за 30 минут привести квартиру в порядок, если гости уже на пороге.',
    date: '15.03.2025',
    image: '/placeholder.svg?height=200&width=400',
    slug: 'how-to-clean-apartment-quickly',
  },
  {
    id: 2,
    title:
      'Топ-5 средств для уборки кухни, которые должны быть у каждой хозяйки',
    excerpt:
      'Рассказываем о самых эффективных средствах для уборки кухни, которые сделают процесс быстрым и приятным.',
    date: '02.02.2025',
    image: '/placeholder.svg?height=200&width=400',
    slug: 'top-5-kitchen-cleaning-products',
  },
  {
    id: 3,
    title: 'Как правильно ухаживать за мебелью из разных материалов',
    excerpt:
      'Советы по уходу за деревянной, кожаной и тканевой мебелью, чтобы она служила вам долгие годы.',
    date: '10.01.2025',
    image: '/placeholder.svg?height=200&width=400',
    slug: 'furniture-care-tips',
  },
] as const;
