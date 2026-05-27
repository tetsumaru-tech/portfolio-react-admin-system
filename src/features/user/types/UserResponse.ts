import { type Gender } from './gender';

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
  created_at: string;
  updated_at: string;
};
