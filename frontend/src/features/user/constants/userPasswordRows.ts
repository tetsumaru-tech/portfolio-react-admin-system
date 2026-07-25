import { USER_FORM_MIN_LENGTH } from './userFormConstants';

import { type UpdatePasswordRow } from '@/features/user/types';
/**
 * ユーザーフォームの行定義
 */
export const userPasswordRows: UpdatePasswordRow[] = [
  {
    key: 'password',
    label: 'パスワード',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
    required: true,
    confirmValue: (data) => `${'*'.repeat(data.password?.length ?? 0)}`,
  },
  {
    key: 'passwordConfirmation',
    label: 'パスワード確認',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
  },
] satisfies UpdatePasswordRow[];
