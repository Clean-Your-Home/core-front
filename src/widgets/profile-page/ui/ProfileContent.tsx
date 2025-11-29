'use client';

import type { ReviewFormData } from '../lib/schemas';
import type {
  Order,
  ProfileFormData,
  Review,
  UserProfile,
} from '@/entities/profile/model/types';

import {
  ProfileTabs,
  ProfileTabsContent,
  ProfileTabsList,
} from './ProfileTabs';
import { LoyaltyTab } from './tabs/LoyaltyTab';
import { OrdersTab } from './tabs/OrdersTab';
import { ProfileTab } from './tabs/ProfileTab';
import { ReviewsTab } from './tabs/ReviewsTab';

interface ProfileContentProperties {
  profile: UserProfile;
  orders: readonly Order[];
  reviews: readonly Review[];
  onUpdateProfile: (data: ProfileFormData) => Promise<void>;
  onEditReview: (
    reviewId: number,
    data: Partial<ReviewFormData>,
  ) => Promise<void>;
  onDeleteReview: (reviewId: number) => Promise<void>;
}

export function ProfileContent(properties: ProfileContentProperties) {
  return (
    <ProfileTabs>
      <ProfileTabsList />
      <ProfileTabsContent value='profile'>
        <ProfileTab {...properties} />
      </ProfileTabsContent>
      <ProfileTabsContent value='orders'>
        <OrdersTab orders={properties.orders} />
      </ProfileTabsContent>
      <ProfileTabsContent value='reviews'>
        <ReviewsTab
          reviews={properties.reviews}
          onEditReview={properties.onEditReview}
          onDeleteReview={properties.onDeleteReview}
        />
      </ProfileTabsContent>
      <ProfileTabsContent value='loyalty'>
        <LoyaltyTab profile={properties.profile} orders={properties.orders} />
      </ProfileTabsContent>
    </ProfileTabs>
  );
}
