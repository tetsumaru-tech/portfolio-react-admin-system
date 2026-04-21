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
      throw new Error('Failed to fetch users');
    }
    const users = await res.json();
    return { data: users };
  },

  fetchUser: async (id: number): Promise<User> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }
    return res.json();
  },

  createUser: async (data: CreateUserInput): Promise<User> => {
    const res = await fetch('http://127.0.0.1:8000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Failed to delete user');
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

    console.log(res);
    if (!res.ok) {
      throw new Error('Failed to update user');
    }
    return res.json();
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Faild to delete user');
    }
    return res.json();
  },
};
