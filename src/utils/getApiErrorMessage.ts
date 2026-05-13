import { isApiError, getApiError } from './';

/**
 * APIエラーメッセージを取得します。
 * @param error - エラーオブジェクト
 * @returns エラーメッセージ
 */
export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const err = getApiError(error);
    return err ? err.message : '';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '予期しないエラーが発生しました';
}
