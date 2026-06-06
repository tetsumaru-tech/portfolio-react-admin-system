import { authMapper } from '@/features/auth/api';
import type {
  LoginRequest,
  LoginResponse,
  AuthUser,
} from '@/features/auth/types';
import { apiFetch } from '@/lib/api';

export const authApi = {
  /**
   * ログインAPI
   * @param request ログインリクエスト
   * @returns 認証されたユーザー情報
   */
  async login(request: LoginRequest): Promise<AuthUser> {
    const response = await apiFetch<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    return authMapper.fromResponse(response.user);
  },

  /**
   * ログアウトAPI
   * @returns ログアウト処理が完了したことを示すPromise
   */
  async logout(): Promise<void> {
    await apiFetch('/logout', {
      method: 'POST',
    });
  },
};
