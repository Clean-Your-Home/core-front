'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка');
      }

      toast.success('Вы успешно подписаны!', {
        description: 'Спасибо за интерес к нашим новостям!',
      });
      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubscribe };
};
