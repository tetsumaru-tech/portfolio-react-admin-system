import { type Gender } from '@/features/user/types';

/**
 * プロフィール更新APIのリクエストデータ型
 *
 * @description 更新処理で使用するリクエストボディの形状です。
 */
export type UpdateProfileApiRequest = {
  last_name: string;
  first_name: string;
  email: string;
  birthday: string | null;
  gender: Gender;
};
