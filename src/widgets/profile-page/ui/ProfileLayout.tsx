'use client';

import type { ReviewFormData } from '../lib/schemas';
import type {
  NotificationSettings,
  Order,
  PasswordFormData,
  ProfileFormData,
  Review,
  UserProfile,
} from '@/entities/profile/model/types';

import { useState } from 'react';

import { ProfileContent } from './ProfileContent';
import { ProfileHeader } from './ProfileHeader';
import { SettingsModal } from './SettingsModal';

interface ProfileLayoutProperties {
  profile: UserProfile;
  orders: readonly Order[];
  reviews: readonly Review[];
  onUpdateProfile: (data: ProfileFormData) => Promise<void>;
  onUpdatePassword: (data: PasswordFormData) => Promise<void>;
  onUpdateNotifications: (settings: NotificationSettings) => Promise<void>;
  onEditReview: (
    reviewId: number,
    data: Partial<ReviewFormData>,
  ) => Promise<void>;
  onDeleteReview: (reviewId: number) => Promise<void>;
}

export function ProfileLayout(properties: ProfileLayoutProperties) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    'password' | 'notifications'
  >('password');

  return (
    <div className='container mx-auto py-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <ProfileHeader
          onSettingsClick={(tab) => {
            setActiveSettingsTab(tab);
            setIsSettingsOpen(true);
          }}
        />
        <ProfileContent {...properties} />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTab={activeSettingsTab}
        onUpdatePassword={properties.onUpdatePassword}
        onUpdateNotifications={properties.onUpdateNotifications}
      />
    </div>
  );
}
