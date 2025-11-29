import type { Order, Review, UserProfile } from './types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: '1',
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Примерная, д. 10, кв. 42',
  loyaltyPoints: 350,
  nextLevelPoints: 500,
  discount: 5,
  level: 'Серебряный',
};

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '15.03.2023',
    time: '10:00 - 13:00',
    service: 'Генеральная уборка',
    status: 'Выполнен',
    price: '4500 ₽',
    reviewed: true,
    points: 45,
    address: 'г. Москва, ул. Примерная, д. 10, кв. 42',
    additionalServices: ['Мытье окон', 'Глажка белья'],
    cleanerName: 'Анна Петрова',
    cleanerRating: 4.8,
  },
  {
    id: 'ORD-002',
    date: '02.02.2023',
    time: '14:00 - 16:00',
    service: 'Мойка окон',
    status: 'Выполнен',
    price: '2000 ₽',
    reviewed: true,
    points: 20,
    address: 'г. Москва, ул. Примерная, д. 10, кв. 42',
    additionalServices: [],
    cleanerName: 'Сергей Иванов',
    cleanerRating: 4.9,
  },
  {
    id: 'ORD-003',
    date: '10.04.2023',
    time: '12:00 - 15:00',
    service: 'Уборка квартиры',
    status: 'В процессе',
    price: '2500 ₽',
    reviewed: false,
    points: 0,
    address: 'г. Москва, ул. Примерная, д. 10, кв. 42',
    additionalServices: ['Мытье холодильника'],
    cleanerName: 'Мария Сидорова',
    cleanerRating: 4.7,
  },
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    orderId: 'ORD-001',
    orderDate: '15.03.2023',
    service: 'Генеральная уборка',
    rating: 5,
    text: 'Отличный сервис! Все сделали быстро и качественно. Буду обращаться еще.',
    createdAt: '2023-03-15T14:00:00Z',
  },
  {
    id: 2,
    orderId: 'ORD-002',
    orderDate: '02.02.2023',
    service: 'Мойка окон',
    rating: 4,
    text: 'Хорошая работа, но немного опоздали. В целом доволен результатом.',
    createdAt: '2023-02-02T17:00:00Z',
  },
];
