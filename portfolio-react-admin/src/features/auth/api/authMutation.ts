import { authApi } from '@/features/auth/api';
import { useAuth } from '@/features/auth/hooks';
import { useApiMutation } from '@/hooks';

/**
 * ログイン用のミューテーションを返します。
 * @param onSucess - ログイン成功時に呼び出されるコールバック
 * @returns ログインミューテーションの結果
 */
export function useLoginMutation() {
  const { setUser } = useAuth();

  return useApiMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      setUser(user);
    },
  });
}
