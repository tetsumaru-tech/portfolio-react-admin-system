import { USER_FORM_LIMITS, USER_FORM_MIN_LENGTH } from './userFormConstants';

import { genderOptions, type Row } from '@/features/user/types';
/**
 * ユーザーフォームの行定義
 */
export const userFormRows: Row[] = [
  {
    key: 'lastName',
    label: '性',
    maxLength: USER_FORM_LIMITS.lastName,
    confirmValue: (data) => `${data.lastName} ${data.firstName}`,
  },
  {
    key: 'firstName',
    label: '名',
    maxLength: USER_FORM_LIMITS.firstName,
    showInConfirm: false,
  },
  {
    key: 'email',
    label: 'メール',
    maxLength: USER_FORM_LIMITS.email,
  },
  {
    key: 'gender',
    label: '性別',
    type: 'select',
    options: genderOptions,
  },
  {
    key: 'birthday',
    label: '誕生日',
    type: 'date',
  },
  {
    key: 'password',
    label: 'パスワード',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
    showInEdit: false,
    confirmValue: (data) => `${'*'.repeat(data.password?.length ?? 0)}`,
  },
  {
    key: 'passwordConfirmation',
    label: 'パスワード確認',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
    showInEdit: false,
    showInConfirm: false,
  },
];
