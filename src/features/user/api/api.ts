import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserSearchCondition,
} from '@/features/user/types';

export type GetListResponse = {
  data: User[];
};

export const userApi = {
  getList: async (
    condition?: UserSearchCondition,
  ): Promise<GetListResponse> => {
    const res = await fetch('http://127.0.0.1:8000/api/users');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'エラーが発生しました');
    }
    const users = await res.json();
    return { data: users };
  },

  fetchUser: async (id: number): Promise<User> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'エラーが発生しました');
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
      throw new Error(errorData.message || 'エラーが発生しました');
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

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'エラーが発生しました');
      (error as any).status = res.status;
      (error as any).errors = errorData.errors;
      throw error;
    }
    return res.json();
  },

  deleteUser: async (id: number): Promise<void> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'エラーが発生しました');
    }
  },
};
