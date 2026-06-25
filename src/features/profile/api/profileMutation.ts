import { profileApi } from '@/features/profile/api';
import { profileQueryKeys } from '@/features/profile/constants';
import type {
  UpdateProfileInput,
  UpdateProfilePasswordInput,
} from '@/features/profile/types';
import { useApiMutation } from '@/hooks';

/**
 * プロフィール更新用のミューテーションフック。
 *
 * @param userId 更新対象のユーザーID
 */
export const useUpdateProfileMutation = () => {
  return useApiMutation({
    mutationFn: (data: UpdateProfileInput) => profileApi.updateProfile(data),
    successMessage: 'プロフィールを更新しました',
    invalidateKeys: [profileQueryKeys.me],
  });
};

/**
 * パスワード更新用のミューテーションフック。
 * 指定したユーザーIDのパスワードを更新します。
 *
 * @param id 更新対象のユーザーID
 */
export function useUpdateProfilePasswordMutation() {
  return useApiMutation({
    mutationFn: (data: UpdateProfilePasswordInput) =>
      profileApi.updatePassword(data),
    successMessage: 'パスワードを変更しました',
  });
}
