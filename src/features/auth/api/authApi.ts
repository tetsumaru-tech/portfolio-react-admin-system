import { authMapper } from '@/features/auth/api';
import type {
  LoginRequest,
  LoginResponse,
  AuthUser,
} from '@/features/auth/types';
import { apiFetch } from '@/lib/api';
import { getCookie } from '@/utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * CSRFトークンを確実に取得するための関数
 * XSRF-TOKENクッキーが存在しない場合、サーバーからCSRFクッキーをリクエストする
 */
async function ensureCsrf(): Promise<void> {
  // If XSRF token cookie is not set, request CSRF cookie from server
  if (!getCookie('XSRF-TOKEN')) {
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });
  }
}

export const authApi = {
  /**
   * ログインAPI
   * @param request ログインリクエスト
   * @returns 認証されたユーザー情報
   */
  async login(request: LoginRequest): Promise<AuthUser> {
    await ensureCsrf();
    const response = await apiFetch<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(request),
      credentials: 'include',
    });
    return authMapper.fromResponse(response.user);
  },

  /**
   * ログアウトAPI
   * @returns ログアウト処理が完了したことを示すPromise
   */
  async logout(): Promise<void> {
    await ensureCsrf();
    await apiFetch('/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },
};
