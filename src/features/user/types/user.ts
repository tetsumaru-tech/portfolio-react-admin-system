import { type YMD, type SelectOption } from '@/types';

export const GENDERS = ['male', 'female', ''] as const;
export type Gender = (typeof GENDERS)[number];

export const genderOptions: SelectOption<Gender>[] = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
];

/**
 * ユーザー情報のサーバー型定義
 */
export type User = {
  id: number | null;
  lastName: string;
  firstName: string;
  email: string;
  gender: Gender;
  birthday: YMD;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSearchCondition = {
  name?: string;
  email?: string;
};
