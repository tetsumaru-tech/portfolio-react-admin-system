import { getXsrToken } from '@/lib/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let csrfInitialized = false;

/**
 * CSRFトークンを確実に取得するための関数
 * XSRF-TOKENクッキーが存在しない場合、サーバーからCSRFクッキーをリクエストする
 */
export async function ensureCsrf(): Promise<void> {
  if (csrfInitialized) {
    return;
  }

  // If XSRF token cookie is not set, request CSRF cookie from server
  const xsrfToken = getXsrToken();
  if (xsrfToken) {
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });
    csrfInitialized = true;
  }
}
