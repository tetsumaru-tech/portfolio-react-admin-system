import type { GridSortModel } from '@mui/x-data-grid';

import { userMapper } from '@/features/user/api';
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserSearchCondition,
  UserResponse,
  UserPasswordFormData,
} from '@/features/user/types';
import { apiFetch } from '@/lib/api';
import type { PaginatedResponse } from '@/types';

/**
 * ユーザーリスト取得のレスポンス型
 */
export type GetListResponse = {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * ユーザー関連のAPI関数を提供するオブジェクト
 */
export const userApi = {
  /**
   * ユーザーのリストを取得する
   * @param condition 検索条件（オプション）
   * @param page 取得するページ番号（0から始まる、オプション）
   * @param pageSize 1ページあたりのユーザー数（オプション）
   * @param sortModel データグリッドのソートモデル（オプション）
   * @returns ユーザーのリストを含むレスポンス
   */
  getList: async (
    condition?: UserSearchCondition,
    page?: number,
    pageSize?: number,
    sortModel?: GridSortModel,
  ): Promise<GetListResponse> => {
    const params = new URLSearchParams();
    if (condition?.name) {
      params.set('name', condition.name);
    }
    if (condition?.email) {
      params.set('email', condition.email);
    }
    if (page !== undefined) {
      params.set('page', String(page + 1));
    }
    if (pageSize !== undefined) {
      params.set('perPage', pageSize.toString());
    }

    const apiSortField = userMapper.toApiSortField(sortModel?.[0]?.field ?? '');
    if (apiSortField) {
      params.set('sortBy', apiSortField);
      params.set('sortOrder', sortModel?.[0]?.sort ?? 'asc');
    }

    const res = await apiFetch<PaginatedResponse<UserResponse>>(
      `/users?${params.toString()}`,
    );
    const users = res.data.map(userMapper.fromResponse);
    return {
      data: users,
      current_page: res.current_page,
      last_page: res.last_page,
      per_page: res.per_page,
      total: res.total,
    };
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

  /**
   * 指定したユーザーのパスワードを更新する
   * @param id ユーザーID
   * @param data パスワード更新用のフォームデータ
   * @returns 更新リクエストのレスポンス
   */
  updatePassword: (id: number, data: UserPasswordFormData) =>
    apiFetch(`/users/${id}/password`, {
      method: 'PATCH',
      body: JSON.stringify({
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      }),
    }),
};
