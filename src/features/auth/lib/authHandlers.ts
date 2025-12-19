import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ENDPOINTS, ROUTES } from '@/shared/config';
import { ForgotPasswordFormData } from './forgotPasswordSchema';
import { LoginFormData } from './loginSchema';
import { RegisterFormData } from './registerSchema';

export const useAuthHandlers = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      toast.success('Вход выполнен', {
        description: 'Добро пожаловать в личный кабинет',
      });
      router.push(ROUTES.PROFILE);
    } catch {
      toast.error('Ошибка входа', {
        description: 'Неверный email или пароль',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      toast.success('Регистрация выполнена', {
        description: 'Добро пожаловать в личный кабинет',
      });
      router.push(ROUTES.PROFILE);
    } catch {
      toast.error('Ошибка регистрации', {
        description: 'Не удалось создать аккаунт. Попробуйте еще раз.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await fetch(`/api/social-login?provider=${provider}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Social login failed');
      }

      toast.success('Вход выполнен', {
        description: `Вы вошли через ${provider}`,
      });
      router.push(ROUTES.PROFILE);
    } catch {
      toast.error('Ошибка входа', {
        description: `Не удалось войти через ${provider}`,
      });
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    try {
      //ENDPOINTS.FORGOT_PASSWORD
      const response = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Forgot password failed');
      }

      toast.success('Ссылка отправлена', {
        description: 'Проверьте ваш email для инструкций по сбросу пароля',
      });
      router.push(ROUTES.LOGIN);
    } catch {
      toast.error('Ошибка', {
        description: 'Не удалось отправить ссылку. Попробуйте еще раз.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleSocialLogin,
    handleForgotPassword,
    isSubmitting,
  };
};
