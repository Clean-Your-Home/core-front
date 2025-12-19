'use client';

import type { SettingsTab } from '@/entities/profile/model/types';

import { Bell, Info, Key, LogOut, Settings } from 'lucide-react';

import { ENDPOINTS } from '@/shared/config/api';
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
  // TODO:
  globalThis.location.href = ENDPOINTS.LOGOUT;
};

export function SettingsDropdown({
  onSettingsClick,
}: SettingsDropdownProperties) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='outline'>
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
        <DropdownMenuItem className='text-destructive' onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
