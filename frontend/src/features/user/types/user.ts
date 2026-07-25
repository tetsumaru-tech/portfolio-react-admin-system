import { type Gender } from './gender';

import { type Role } from '@/features/user/types';
import { type YMD } from '@/types';

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
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSearchCondition = {
  name?: string;
  email?: string;
};
