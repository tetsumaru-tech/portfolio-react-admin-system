import { type Gender } from './gender';

import type { Role } from '@/features/user/types';

/**
 * ユーザーレスポンスの型定義
 */
export type UserResponse = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  birthday: string | null;
  gender: Gender;
  role: Role;
  created_at: string;
  updated_at: string;
};
