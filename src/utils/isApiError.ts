import { ApiError } from '@/utils';

/**
 * エラーがApiErrorかどうかをチェックします。
 * @param error - チェックするエラー
 * @returns ApiErrorの場合true
 */
export function isApiError(error: unknown): boolean {
  return error instanceof ApiError;
}

/**
 * エラーからApiErrorを取得します。
 * @param error - 取得するエラー
 * @returns ApiErrorまたはnull
 */
export function getApiError(error: unknown): ApiError | null {
  if (error instanceof ApiError) {
    return error;
  }
  return null;
}
