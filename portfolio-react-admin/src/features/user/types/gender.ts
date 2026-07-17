import { type SelectOption } from '@/types';

export const GENDERS = ['male', 'female', 'other', ''] as const;
export type Gender = (typeof GENDERS)[number];

export const genderOptions: SelectOption<Gender>[] = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' },
];
