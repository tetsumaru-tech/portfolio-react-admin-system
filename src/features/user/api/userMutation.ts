import type { UserPasswordFormData } from '../types';

import { userApi } from '@/features/user/api';
import { userQueryKeys } from '@/features/user/constants';
import type {
  CreateUserRequest,
  UpdateUserRequest,
} from '@/features/user/schema';
import { useApiMutation } from '@/hooks';

/**
 * ユーザー作成用のミューテーションフック。
 * 新しいユーザーを作成し、'users' キャッシュを無効化します。
 */
export const useCreateUserMutation = () => {
  return useApiMutation({
    mutationFn: (data: CreateUserRequest) => userApi.createUser(data),
    successMessage: 'ユーザーを作成しました',
    invalidateKeys: [userQueryKeys.all],
  });
};

/**
 * ユーザー更新用のミューテーションフック。
 * 指定したユーザーIDのユーザー情報を更新し、'users' および該当ユーザーのキャッシュを無効化します。
 *
 * @param userId 更新対象のユーザーID
 */
export const useUpdateUserMutation = () => {
  return useApiMutation({
    mutationFn: (data: UpdateUserRequest) =>
      userApi.updateUser(Number(data.id), data),
    successMessage: 'ユーザーを更新しました',
    invalidateKeys: [userQueryKeys.all],
  });
};

/**
 * ユーザー削除用のミューテーションフック。
 * 指定したユーザーIDのユーザーを削除し、'users' キャッシュを無効化します。
 *
 * @param userId 削除対象のユーザーID
 */
export const useDeleteUserMutation = () => {
  return useApiMutation({
    mutationFn: (userId: number) => userApi.deleteUser(userId),
    successMessage: 'ユーザーを削除しました',
    invalidateKeys: [userQueryKeys.all],
  });
};

/**
 * パスワード更新用のミューテーションフック。
 * 指定したユーザーIDのパスワードを更新します。
 *
 * @param id 更新対象のユーザーID
 */
export function useUpdatePasswordMutation(id: number) {
  return useApiMutation({
    mutationFn: (data: UserPasswordFormData) =>
      userApi.updatePassword(id, data),
    successMessage: 'パスワードを変更しました',
  });
}
