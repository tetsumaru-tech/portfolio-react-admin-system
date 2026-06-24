import { profileApi } from '@/features/profile/api';
import { profileQueryKeys } from '@/features/profile/constants';
import type { UpdateProfileRequest } from '@/features/profile/schema';
import { useApiMutation } from '@/hooks';

/**
 * プロフィール更新用のミューテーションフック。
 *
 * @param userId 更新対象のユーザーID
 */
export const useUpdatePasswordMutation = () => {
  return useApiMutation({
    mutationFn: (data: UpdateProfileRequest) => profileApi.updateProfile(data),
    successMessage: 'プロフィールを更新しました',
    invalidateKeys: [profileQueryKeys.me],
  });
};
