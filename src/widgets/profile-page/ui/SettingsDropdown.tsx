'use client';

import type { SettingsTab } from '@/entities/profile/model/types';

import { Bell, Info, Key, LogOut, Settings } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface SettingsDropdownProperties {
  onSettingsClick: (tab: SettingsTab) => void;
}

const handleLogout = () => {
  globalThis.location.href = '/api/auth/logout';
};

export function SettingsDropdown({
  onSettingsClick,
}: SettingsDropdownProperties) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm'>
          <Settings className='mr-2 h-4 w-4' />
          Настройки
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Настройки аккаунта</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSettingsClick('password')}>
          <Key className='mr-2 h-4 w-4' />
          <span>Сменить пароль</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSettingsClick('notifications')}>
          <Bell className='mr-2 h-4 w-4' />
          <span>Уведомления</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Info className='mr-2 h-4 w-4' />
          <span>Помощь и поддержка</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='text-destructive'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
