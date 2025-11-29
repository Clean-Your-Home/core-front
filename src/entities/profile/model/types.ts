import { StatusVariant } from '@/shared/ui/badge/variants';

export interface UserProfile {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  nextLevelPoints: number;
  discount: number;
  level: 'Базовый' | 'Серебряный' | 'Золотой' | 'Платиновый';
}

export interface Order {
  readonly id: string;
  date: string;
  time: string;
  service: string;
  status: OrderStatus;
  price: string;
  reviewed: boolean;
  points: number;
  address: string;
  additionalServices: readonly string[];
  cleanerName: string;
  cleanerRating: number;
}

export interface Review {
  readonly id: number;
  orderId: string;
  orderDate: string;
  service: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  promotionalEmails: boolean;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type ProfileTab = 'profile' | 'orders' | 'reviews' | 'loyalty';
export type SettingsTab = 'password' | 'notifications';

export type OrderStatus =
  | 'Выполнен'
  | 'В процессе'
  | 'Отменен'
  | 'Ожидает подтверждения';

export const STATUS_VARIANTS: Record<OrderStatus, StatusVariant> = {
  Выполнен: 'default',
  'В процессе': 'secondary',
  Отменен: 'destructive',
  'Ожидает подтверждения': 'outline',
} as const;
