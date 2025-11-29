'use client';

import type { ReviewFormData } from '../../lib/schemas';
import type { Review } from '@/entities/profile/model/types';

import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { reviewFormSchema } from '../../lib/schemas';

interface EditReviewModalProperties {
  review: Review | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

export function EditReviewModal({
  review,
  isOpen,
  onClose,
  onSubmit,
}: EditReviewModalProperties) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: review?.rating ?? 5,
      text: review?.text ?? '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      form.reset();
    }
  };

  if (!review) {
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Редактирование отзыва</DialogTitle>
          <DialogDescription>
            Измените ваш отзыв о заказе {review.orderId}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Оценка</FormLabel>
                  <FormControl>
                    <div className='flex gap-1'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className='rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                          type='button'
                          onClick={() => {
                            field.onChange(star);
                          }}
                        >
                          <Star
                            className={cn(
                              'h-8 w-8 transition-colors',
                              star <= (field.value ?? 0)
                                ? 'fill-primary text-primary'
                                : 'fill-muted text-muted-foreground',
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваш отзыв</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none'
                      placeholder='Поделитесь вашим мнением о выполненной работе...'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-4'>
              <Button
                disabled={isSubmitting}
                type='button'
                variant='outline'
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
