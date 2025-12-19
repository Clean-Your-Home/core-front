'use client';

import type { ReviewFormData } from '../../lib/schemas';
import type { Review } from '@/entities/profile/model/types';

import { Star } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { useReviews } from '../../lib/useReviews';
import { DeleteReviewModal } from '../modals/DeleteReviewModal';
import { EditReviewModal } from '../modals/EditReviewModal';

interface ReviewsTabProperties {
  reviews: readonly Review[];
  onEditReview: (
    reviewId: number,
    data: Partial<ReviewFormData>,
  ) => Promise<void>;
  onDeleteReview: (reviewId: number) => Promise<void>;
}

export function ReviewsTab({
  reviews,
  onEditReview,
  onDeleteReview,
}: ReviewsTabProperties) {
  const {
    isEditOpen,
    isDeleteOpen,
    selectedReview,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteConfirm,
    setIsEditOpen,
    setIsDeleteOpen,
  } = useReviews(reviews, onEditReview, onDeleteReview);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Мои отзывы</CardTitle>
          <CardDescription>
            Управление вашими отзывами о выполненных заказах
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {reviews.map((review) => (
              <div
                key={review.id}
                className='border-b pb-6 last:border-0 last:pb-0'
              >
                <div className='mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold'>{review.service}</h3>
                    <p className='text-sm text-muted-foreground'>
                      Заказ {review.orderId} от {review.orderDate}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-5 w-5',
                          star <= review.rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted-foreground',
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className='leading-relaxed text-muted-foreground'>
                  {review.text}
                </p>
                <div className='mt-4 flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      handleEdit(review);
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      handleDelete(review);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className='py-12 text-center'>
                <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted'>
                  <Star className='h-10 w-10 text-muted-foreground' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>
                  У вас пока нет отзывов
                </h3>
                <p className='mx-auto max-w-md text-muted-foreground'>
                  После выполнения заказа вы сможете оставить отзыв о нашей
                  работе и помочь другим клиентам
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditReviewModal
        isOpen={isEditOpen}
        review={selectedReview}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
      />
      <DeleteReviewModal
        isOpen={isDeleteOpen}
        review={selectedReview}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
