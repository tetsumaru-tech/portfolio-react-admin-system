import { userMapper } from '@/features/user/api';
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserSearchCondition,
  UserResponse,
} from '@/features/user/types';
import { apiFetch } from '@/lib/api';

/**
 * ユーザーリスト取得のレスポンス型
 */
export type GetListResponse = {
  data: User[];
};
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * ユーザー関連のAPI関数を提供するオブジェクト
 */
export const userApi = {
  /**
   * ユーザーのリストを取得する
   * @param condition 検索条件（オプション）
   * @returns ユーザーのリストを含むレスポンス
   */
  getList: async (
    condition?: UserSearchCondition,
  ): Promise<GetListResponse> => {
    const params = new URLSearchParams();
    if (condition?.name) {
      params.set('name', condition.name);
    }
    if (condition?.email) {
      params.set('email', condition.email);
    }
    const res = await apiFetch<UserResponse[]>(`/users?${params.toString()}`);
    const users = res.map(userMapper.fromResponse);
    return { data: users };
  },

  /**
   * 指定されたIDのユーザーを取得する
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  fetchUser: async (id: number): Promise<User> => {
    const res = await apiFetch<UserResponse>(`/users/${id}`);
    return userMapper.fromResponse(res);
  },

  /**
   * 新しいユーザーを作成する
   * @param data 作成するユーザーのデータ
   * @returns 作成されたユーザー情報
   */
  createUser: async (data: CreateUserInput): Promise<User> => {
    const res = await apiFetch<User>(`/users`, {
      method: 'POST',
      body: JSON.stringify(userMapper.toCreateApiRequest(data)),
    });
    await sleep(1000); // テスト用の遅延
    return res;
  },

  /**
   * 指定されたIDのユーザーを更新する
   * @param id ユーザーID
   * @param data 更新するユーザーのデータ
   * @returns 更新されたユーザー情報
   */
  updateUser: async (id: number, data: UpdateUserInput): Promise<User> => {
    const res = await apiFetch<User>(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userMapper.toUpdateApiRequest(data)),
    });
    await sleep(1000); // テスト用の遅延
    return res;
  },

  /**
   * 指定されたIDのユーザーを削除する
   * @param id ユーザーID
   */
  deleteUser: async (id: number): Promise<void> => {
    await apiFetch<User>(`/users/${id}`, {
      method: 'DELETE',
    });
    await sleep(1000); // テスト用の遅延
  },
};
