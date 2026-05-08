import { ApiError } from '@/utils';

export function isApiError(error: unknown): boolean {
  return error instanceof ApiError;
}

export function getApiError(error: unknown): ApiError | null {
  if (error instanceof ApiError) {
    return error;
  }
  return null;
}
