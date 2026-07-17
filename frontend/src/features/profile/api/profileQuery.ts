import { useQuery } from '@tanstack/react-query';

import { profileApi } from '@/features/profile/api';

/**
 * プロフィールを取得する React Query フック
 * @returns profileApi.get を実行する useQuery の結果
 */
export function useProfileQuery() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.get,
  });
}
