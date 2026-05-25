import { type Gender } from './gender';

/**
 * ユーザー作成APIのリクエストデータ型
 *
 * @remarks
 * 各プロパティはAPIへ送信する際のユーザー情報を表します。
 */
export type CreateUserApiRequest = {
  last_name: string;
  first_name: string;
  email: string;
  birthday: string | null;
  gender: Gender;
};
