import { useState } from 'react';
import { toast } from 'sonner';

export const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;

      // TODO: Добавить логику подписки
      // eslint-disable-next-line no-console
      console.log('Subscribing email:', email);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Подписка оформлена', {
        description:
          'Теперь вы будете получать наши новости и специальные предложения',
      });

      event.currentTarget.reset();
    } catch {
      toast.error('Ошибка подписки', {
        description: 'Пожалуйста, попробуйте еще раз',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubscribe,
  };
};
