import type { ValidationErrors } from '@/types';

export class ApiError extends Error {
  status: number;
  errors: ValidationErrors;

  constructor(message: string, status: number, errors: ValidationErrors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
