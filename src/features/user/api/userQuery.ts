import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import { userApi } from '@/features/user/api';
import type { UserSearchCondition } from '@/features/user/types';

/**
 * 指定された検索条件に基づいてユーザーを取得します。
 *
 * @param condition - ユーザーを検索するための条件。
 * @param page - 取得するページ番号（0から始まる）。
 * @param pageSize - 1ページあたりのユーザー数。
 * @returns ユーザー一覧のクエリ結果。
 */
export const useUsersQuery = (
  condition: UserSearchCondition,
  page: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ['users', condition, page, pageSize],
    queryFn: () => userApi.getList(condition, page, pageSize),
    placeholderData: keepPreviousData,
  });
};

/**
 * 指定したユーザーIDに基づいてユーザー詳細を取得します。
 *
 * @param userId - 取得するユーザーのID。
 * @returns ユーザー詳細のクエリ結果。
 */
export const useUserDetailQuery = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.fetchUser(userId),
    enabled: !!userId,
  });
};
