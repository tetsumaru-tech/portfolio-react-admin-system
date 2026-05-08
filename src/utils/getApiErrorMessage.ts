import { isApiError, getApiError } from './';

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
