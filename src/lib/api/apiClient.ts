const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { ApiError } from '@/utils';

/**
 *
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(
      errorData.message || 'エラーが発生しました',
      response.status,
      errorData.errors,
    );
  }

  return response.json();
}
