import {
  type FieldValues,
  type Path,
  type UseFormSetError,
} from 'react-hook-form';

import { type ValidationErrors } from '@/types';

/**
 * サーバーから返されたエラーをreact-hook-formのsetError関数に適用します
 *
 * @template T - フォームフィールドの値の型
 * @param errors - サーバーから返されたバリデーションエラーオブジェクト
 * @param setError - react-hook-formのsetError関数
 *
 * @example
 * const { setError } = useForm();
 * const errors = { email: ['Invalid email'], password: ['Too short'] };
 * applyServerErrors(errors, setError);
 */
export function applyServerErrors<T extends FieldValues>(
  errors: ValidationErrors,
  setError: UseFormSetError<T>,
) {
  if (!errors) {
    return;
  }

  Object.entries(errors).forEach(([key, messages]) => {
    setError(key as Path<T>, {
      type: 'server',
      message: Array.isArray(messages) ? messages[0] : String(messages),
    });
  });
}
