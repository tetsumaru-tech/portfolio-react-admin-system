import {
  type Path,
  type UseFormSetError,
  type FieldValues,
} from 'react-hook-form';

import { type ValidationErrors } from '@/types';

export function applyServerErrors<T extends FieldValues>(
  errors: ValidationErrors,
  setError: UseFormSetError<T>,
) {
  Object.entries(errors).forEach(([key, messages]) => {
    setError(key as Path<T>, {
      type: 'server',
      message: Array.isArray(messages) ? messages[0] : String(messages),
    });
  });
}
