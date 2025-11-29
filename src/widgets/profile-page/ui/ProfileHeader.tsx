'use client';

import { SettingsDropdown } from './SettingsDropdown';

interface ProfileHeaderProperties {
  onSettingsClick: (tab: 'password' | 'notifications') => void;
}

export function ProfileHeader({ onSettingsClick }: ProfileHeaderProperties) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Личный кабинет</h1>
        <p className='mt-2 text-muted-foreground'>
          Управление вашим профилем, заказами и настройками
        </p>
      </div>
      <SettingsDropdown onSettingsClick={onSettingsClick} />
    </div>
  );
}
