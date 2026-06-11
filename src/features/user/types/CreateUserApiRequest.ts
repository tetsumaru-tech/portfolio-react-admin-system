import { type UpdateUserApiRequest } from './UpdateUserApiRequest';
// import { type Gender } from './gender';

/**
 * ユーザー作成APIのリクエストデータ型
 *
 * @remarks
 * 各プロパティはAPIへ送信する際のユーザー情報を表します。
 */
export type CreateUserApiRequest = UpdateUserApiRequest & {
  password: string;
  password_confirmation: string;
};
