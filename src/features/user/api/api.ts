import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserSearchCondition,
} from '@/features/user/types';
import { ApiError } from '@/utils';

export type GetListResponse = {
  data: User[];
};
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const userApi = {
  getList: async (
    condition?: UserSearchCondition,
  ): Promise<GetListResponse> => {
    const res = await fetch('http://127.0.0.1:8000/api/users');
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

  fetchUser: async (id: number): Promise<User> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
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

  createUser: async (data: CreateUserInput): Promise<User> => {
    const res = await fetch('http://127.0.0.1:8000/api/users', {
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

  updateUser: async (id: number, data: UpdateUserInput): Promise<User> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
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

  deleteUser: async (id: number): Promise<void> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
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
