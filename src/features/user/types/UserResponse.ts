/**
 * ユーザーレスポンスの型定義
 */
export type UserResponse = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  birthday: string | null;
  gender: 'male' | 'female' | 'other' | null;
  created_at: string;
  updated_at: string;
};
