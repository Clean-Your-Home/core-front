import type { ProfileFormData } from './schemas';
import type { UserProfile } from '@/entities/profile/model/types';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { profileFormSchema } from './schemas';

interface UseProfileFormOptions {
  initialData: UserProfile;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

export function useProfileForm({
  initialData,
  onSubmit,
}: UseProfileFormOptions) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      address: initialData.address,
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (data) => await onSubmit(data));

  return {
    form,
    handleSubmit,
    hasChanges: form.formState.isDirty,
    isSubmitting: form.formState.isSubmitting,
  };
}
