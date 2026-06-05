const VITE_API_BASE_URL_WITH_API = import.meta.env.VITE_API_BASE_URL_WITH_API;

import { ApiError, ApiValidationError } from '@/utils';
import { getCookie } from '@/utils';

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
  const response = await fetch(`${VITE_API_BASE_URL_WITH_API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') ?? ''),
    },
    ...options,
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
