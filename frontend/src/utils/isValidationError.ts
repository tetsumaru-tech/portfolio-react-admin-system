import { ApiValidationError } from './ApiValidationError';

/**
 * エラーがApiValidationErrorかどうかをチェックします。
 */
export function isValidationError(error: unknown): error is ApiValidationError {
  return error instanceof ApiValidationError;
}
