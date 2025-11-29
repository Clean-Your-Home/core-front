import type { ReviewFormData } from './schemas';
import type { Review } from '@/entities/profile/model/types';

import { useState } from 'react';

export function useReviews(
  reviews: readonly Review[],
  onEdit: (id: number, data: Partial<ReviewFormData>) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
) {
  const [localReviews, setLocalReviews] = useState<readonly Review[]>(reviews);
  const [selectedReview, setSelectedReview] = useState<Review | undefined>();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setIsEditOpen(true);
  };

  const handleDelete = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteOpen(true);
  };

  const handleEditSubmit = async (data: ReviewFormData) => {
    if (selectedReview) await onEdit(selectedReview.id, data);
    setIsEditOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedReview) await onDelete(selectedReview.id);
    setIsDeleteOpen(false);
  };

  return {
    reviews: localReviews,
    selectedReview,
    isEditOpen,
    isDeleteOpen,
    setIsEditOpen,
    setIsDeleteOpen,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteConfirm,
    setLocalReviews, // TODO: нужен ли?
  };
}
