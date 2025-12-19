'use client';

import type { ProfileTab } from '@/entities/profile';
import type { ReactNode } from 'react';

import { createContext, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface ProfileTabsContextType {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

const ProfileTabsContext = createContext<ProfileTabsContextType | undefined>(
  undefined,
);

interface ProfileTabsRootProperties {
  children: ReactNode;
  defaultValue?: ProfileTab;
}

export function ProfileTabs({
  children,
  defaultValue = 'profile',
}: ProfileTabsRootProperties) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(defaultValue);

  return (
    <ProfileTabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Tabs
        className='w-full'
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ProfileTab)}
      >
        {children}
      </Tabs>
    </ProfileTabsContext.Provider>
  );
}

export function ProfileTabsList() {
  return (
    <TabsList className='grid w-full grid-cols-4'>
      <TabsTrigger value='profile'>Профиль</TabsTrigger>
      <TabsTrigger value='orders'>Мои заказы</TabsTrigger>
      <TabsTrigger value='reviews'>Отзывы</TabsTrigger>
      <TabsTrigger value='loyalty'>Программа лояльности</TabsTrigger>
    </TabsList>
  );
}

interface ProfileTabsContentProperties {
  value: ProfileTab;
  children: ReactNode;
}

export function ProfileTabsContent({
  value,
  children,
}: ProfileTabsContentProperties) {
  return <TabsContent value={value}>{children}</TabsContent>;
}
