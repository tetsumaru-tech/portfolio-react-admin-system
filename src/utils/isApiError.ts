import { ApiError, ApiValidationError } from '@/utils';

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
export function getApiError(
  error: unknown,
): ApiError | ApiValidationError | null {
  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof ApiValidationError) {
    return error;
  }
  return null;
}
