'use client';

import type {
  NotificationSettings as NotificationSettingsType,
  PasswordFormData,
  SettingsTab,
} from '@/entities/profile/model/types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { NotificationSettings } from './NotificationSettings';
import { PasswordSettings } from './PasswordSettings';

interface SettingsModalProperties {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SettingsTab;
  onUpdatePassword: (data: PasswordFormData) => Promise<void>;
  onUpdateNotifications: (settings: NotificationSettingsType) => Promise<void>;
}

export function SettingsModal({
  isOpen,
  onClose,
  activeTab,
  onUpdatePassword,
  onUpdateNotifications,
}: SettingsModalProperties) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Настройки аккаунта</DialogTitle>
          <DialogDescription>
            Управление настройками безопасности и уведомлений
          </DialogDescription>
        </DialogHeader>

        <Tabs className='w-full' defaultValue={activeTab}>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='password'>Безопасность</TabsTrigger>
            <TabsTrigger value='notifications'>Уведомления</TabsTrigger>
          </TabsList>

          <TabsContent value='password'>
            <PasswordSettings onSubmit={onUpdatePassword} onSuccess={onClose} />
          </TabsContent>

          <TabsContent value='notifications'>
            <NotificationSettings
              onSubmit={onUpdateNotifications}
              onSuccess={onClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
