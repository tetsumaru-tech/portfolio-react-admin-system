/**
 * プロファイルのパスワード更新APIのリクエストデータ型
 *
 * @description 更新処理で使用するリクエストボディの形状です。
 */
export type UpdateProfilePasswordApiRequest = {
  current_password: string;
  password: string;
  password_confirmation: string;
};
