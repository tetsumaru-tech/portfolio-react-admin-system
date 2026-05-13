import { API_BASE_URL } from '@/config/api';
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserSearchCondition,
} from '@/features/user/types';
import { ApiError } from '@/utils';

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
    const res = await fetch(`${API_BASE_URL}/users?${params.toString()}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'エラーが発生しました',
        res.status,
        errorData.errors,
      );
    }
    const users = await res.json();
    return { data: users };
  },

  /**
   * 指定されたIDのユーザーを取得する
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  fetchUser: async (id: number): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'エラーが発生しました',
        res.status,
        errorData.errors,
      );
    }
    return res.json();
  },

  /**
   * 新しいユーザーを作成する
   * @param data 作成するユーザーのデータ
   * @returns 作成されたユーザー情報
   */
  createUser: async (data: CreateUserInput): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'エラーが発生しました',
        res.status,
        errorData.errors,
      );
    }
    return res.json();
  },

  /**
   * 指定されたIDのユーザーを更新する
   * @param id ユーザーID
   * @param data 更新するユーザーのデータ
   * @returns 更新されたユーザー情報
   */
  updateUser: async (id: number, data: UpdateUserInput): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    await sleep(1000);

    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'エラーが発生しました',
        res.status,
        errorData.errors,
      );
    }
    return res.json();
  },

  /**
   * 指定されたIDのユーザーを削除する
   * @param id ユーザーID
   */
  deleteUser: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(
        errorData.message || 'エラーが発生しました',
        res.status,
        errorData.errors,
      );
    }
  },
};
