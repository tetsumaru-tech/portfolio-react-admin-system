import { type Row } from '@/features/profile/types';
import { USER_FORM_LIMITS } from '@/features/user/constants';
import { genderOptions, roleOptions } from '@/features/user/types';

/**
 * ユーザーフォームの行定義
 */
export const profileRows: Row[] = [
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
    confirmValue: (data) =>
      genderOptions.find((option) => (option.value = data.gender))?.label ?? '',
  },
  {
    key: 'birthday',
    label: '誕生日',
    type: 'date',
  },
  {
    key: 'role',
    label: '権限',
    type: 'select',
    options: roleOptions,
    showValue: (data) => (data.role === 'admin' ? '管理者' : '一般ユーザー'),
    showInEdit: false,
    showInConfirm: false,
    confirmValue: (data) =>
      roleOptions.find((option) => (option.value = data.role))?.label ?? '',
    disabledInEdit: true,
  },
] satisfies Row[];
