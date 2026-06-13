const VITE_API_BASE_URL_WITH_API = import.meta.env.VITE_API_BASE_URL_WITH_API;

import { ensureCsrf } from '@/features/auth/api';
import { getXsrToken } from '@/features/auth/api';
import { ApiError, ApiValidationError } from '@/utils';

/**
 * APIリクエストを送信するための関数
 * @param path APIエンドポイントのパス
 * @param options リクエストオプション
 * @returns APIレスポンスデータ
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const method = options?.method ?? 'GET';
  if (method !== 'GET') {
    await ensureCsrf();
  }
  const response = await fetch(`${VITE_API_BASE_URL_WITH_API}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getXsrToken(),
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 422) {
      throw new ApiValidationError(
        errorData.message,
        response.status,
        errorData.errors,
      );
    }

    throw new ApiError(
      errorData.message || 'エラーが発生しました',
      response.status,
      errorData.errors,
    );
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json();
}
