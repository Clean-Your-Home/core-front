'use client';

import type { NotificationSettings as NotificationSettingsType } from '@/entities/profile/model/types';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

interface NotificationSettingsProperties {
  onSubmit: (settings: NotificationSettingsType) => Promise<void>;
  onSuccess: () => void;
}

export function NotificationSettings({
  onSubmit,
  onSuccess,
}: NotificationSettingsProperties) {
  const [settings, setSettings] = useState<NotificationSettingsType>({
    emailNotifications: true,
    smsNotifications: true,
    promotionalEmails: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (key: keyof NotificationSettingsType) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(settings);
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='email-notifications'>Email-уведомления</Label>
            <p className='text-sm text-muted-foreground'>
              Получать уведомления о заказах на email
            </p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            id='email-notifications'
            onCheckedChange={() => handleToggle('emailNotifications')}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='sms-notifications'>SMS-уведомления</Label>
            <p className='text-sm text-muted-foreground'>
              Получать уведомления о заказах по SMS
            </p>
          </div>
          <Switch
            checked={settings.smsNotifications}
            id='sms-notifications'
            onCheckedChange={() => handleToggle('smsNotifications')}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='promotional-emails'>Рекламные рассылки</Label>
            <p className='text-sm text-muted-foreground'>
              Получать информацию об акциях и специальных предложениях
            </p>
          </div>
          <Switch
            checked={settings.promotionalEmails}
            id='promotional-emails'
            onCheckedChange={() => handleToggle('promotionalEmails')}
          />
        </div>
      </div>

      <Button disabled={isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? 'Сохранение...' : 'Сохранить настройки'}
      </Button>
    </div>
  );
}
