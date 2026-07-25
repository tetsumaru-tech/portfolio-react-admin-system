import { USER_FORM_LIMITS, USER_FORM_MIN_LENGTH } from './userFormConstants';

import { genderOptions, type Row } from '@/features/user/types';

/**
 * ユーザーフォームの行定義
 */
export const userFormRows: Row[] = [
  {
    key: 'lastName',
    label: '性',
    dispLabel: '氏名',
    maxLength: USER_FORM_LIMITS.lastName,
    required: true,
    showValue: (data) => `${data.lastName} ${data.firstName}`,
    confirmValue: (data) => `${data.lastName} ${data.firstName}`,
  },
  {
    key: 'firstName',
    label: '名',
    maxLength: USER_FORM_LIMITS.firstName,
    required: true,
    showInDetail: false,
    showInConfirm: false,
  },
  {
    key: 'email',
    label: 'メール',
    maxLength: USER_FORM_LIMITS.email,
    required: true,
  },
  {
    key: 'gender',
    label: '性別',
    type: 'select',
    required: true,
    options: genderOptions,
    showValue: (data) =>
      genderOptions.find((option) => (option.value = data.gender))?.label ?? '',
  },
  {
    key: 'birthday',
    label: '誕生日',
    type: 'date',
    required: true,
  },
  {
    key: 'password',
    label: 'パスワード',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
    required: true,
    showInDetail: false,
    showInEdit: false,
    confirmValue: (data) => `${'*'.repeat(data.password?.length ?? 0)}`,
  },
  {
    key: 'passwordConfirmation',
    label: 'パスワード確認',
    type: 'password',
    minLength: USER_FORM_MIN_LENGTH.password,
    required: true,
    showInDetail: false,
    showInEdit: false,
    showInConfirm: false,
  },
] satisfies Row[];
