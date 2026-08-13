import { ApiError } from '@/utils';

/**
 * エラーがApiErrorかどうかをチェックします。
 * @param error - チェックするエラー
 * @returns ApiErrorの場合true
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * エラーからApiErrorを取得します。
 * ApiValidationErrorはApiErrorを継承しているため、あわせて返ります。
 * @param error - 取得するエラー
 * @returns ApiErrorまたはnull
 */
export function getApiError(error: unknown): ApiError | null {
  return isApiError(error) ? error : null;
}
