import { genderOptions, type Row } from '@/features/user/types';

export const userFormRows: Row[] = [
  {
    key: 'lastName',
    label: '性',
    maxLength: 10,
    rules: {
      required: '姓は必須です',
      maxLength: { value: 10, message: '性は10文字以内です' },
    },
    confirmValue: (data) => `${data.lastName} ${data.firstName}`,
  },
  {
    key: 'firstName',
    label: '名',
    maxLength: 10,
    rules: {
      required: '名は必須です',
      maxLength: { value: 10, message: '名は10文字以内です' },
    },
    showInConfirm: false,
  },
  {
    key: 'email',
    label: 'メール',
    maxLength: 100,
    rules: {
      required: 'メールは必須です',
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'メール形式が不正です',
      },
    },
  },
  {
    key: 'gender',
    label: '性別',
    type: 'select',
    options: genderOptions,
    rules: {
      required: '性別は必須です',
    },
  },
  {
    key: 'birthday',
    label: '誕生日',
    type: 'date',
    rules: {
      required: '誕生日は必須です',
    },
  },
];
