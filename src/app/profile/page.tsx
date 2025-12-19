'use client';

import type {
  Order,
  ProfileFormData,
  Review,
  UserProfile,
} from '@/entities/profile/model/types';
import type { ReviewFormData } from '@/widgets/profile-page/lib/schemas';

import { useState } from 'react';
import { toast } from 'sonner';

import {
  DEFAULT_USER_PROFILE,
  SAMPLE_ORDERS,
  SAMPLE_REVIEWS,
} from '@/entities/profile/model/constants';
import { ProfileLayout } from '@/widgets/profile-page/ui/ProfileLayout';

const handleUpdatePassword = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Пароль обновлен');
  } catch {
    toast.error('Ошибка обновления пароля');
  }
};

const handleUpdateNotifications = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Настройки уведомлений обновлены');
  } catch {
    toast.error('Ошибка обновления уведомлений');
  }
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [orders] = useState<readonly Order[]>(SAMPLE_ORDERS);
  const [reviews, setReviews] = useState<readonly Review[]>(SAMPLE_REVIEWS);

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile((previous) => ({ ...previous, ...data }));
      toast.success('Профиль обновлен');
    } catch {
      toast.error('Ошибка обновления профиля');
    }
  };

  const handleEditReview = async (
    reviewId: number,
    data: Partial<ReviewFormData>,
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReviews((previous) =>
        previous.map((r) => (r.id === reviewId ? { ...r, ...data } : r)),
      );
      toast.success('Отзыв обновлен');
    } catch {
      toast.error('Ошибка обновления отзыва');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReviews((previous) => previous.filter((r) => r.id !== reviewId));
      toast.success('Отзыв удален');
    } catch {
      toast.error('Ошибка удаления отзыва');
    }
  };

  return (
    <ProfileLayout
      orders={orders}
      profile={profile}
      reviews={reviews}
      onDeleteReview={handleDeleteReview}
      onEditReview={handleEditReview}
      onUpdateNotifications={handleUpdateNotifications}
      onUpdatePassword={handleUpdatePassword}
      onUpdateProfile={handleUpdateProfile}
    />
  );
};

export default ProfilePage;
