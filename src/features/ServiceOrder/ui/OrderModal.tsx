'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent } from '@/shared/ui/dialog/dialog';
import { Input } from '@/shared/ui/input/input';
import { Textarea } from '@/shared/ui/textarea/textarea';
import { Typography } from '@/shared/ui/typography';

interface OrderModalProperties {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const OrderModal = ({
  isOpen,
  onClose,
  initialService,
}: OrderModalProperties) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState(
    initialService ? `Хочу заказать услугу: ${initialService}` : '',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: добавить логику отправки формы
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <Typography variant='h3'>Заказать услугу</Typography>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            required
            placeholder='Ваше имя'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            required
            placeholder='Телефон'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <Textarea
            placeholder='Сообщение'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button className='w-full' type='submit'>
            Отправить заявку
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
