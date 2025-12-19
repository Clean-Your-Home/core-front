import { Facebook, LogIn, Mail } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/ui/button';

interface SocialLoginButtonsProperties {
  onSocialLogin: (provider: string) => Promise<void>;
}

export const SocialLoginButtons = ({
  onSocialLogin,
}: SocialLoginButtonsProperties) => {
  return (
    <div className='mt-6 grid grid-cols-3 gap-4'>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => onSocialLogin('Google')}
      >
        <Mail className='mr-2 h-4 w-4' />
        Google
      </Button>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => onSocialLogin('Facebook')}
      >
        <Facebook className='mr-2 h-4 w-4' />
        Facebook
      </Button>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => onSocialLogin('VK')}
      >
        <LogIn className='mr-2 h-4 w-4' />
        VK
      </Button>
    </div>
  );
};
