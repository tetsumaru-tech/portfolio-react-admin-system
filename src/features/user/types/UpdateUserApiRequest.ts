import { type Gender } from './gender';

/**
 * ユーザー更新APIのリクエストデータ型
 *
 * @description 更新処理で使用するリクエストボディの形状です。
 */
export type UpdateUserApiRequest = {
  last_name: string;
  first_name: string;
  email: string;
  birthday: string | null;
  gender: Gender;
};
