import { USER_FORM_LIMITS } from './userFormLimits';

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
];
