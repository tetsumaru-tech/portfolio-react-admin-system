import type { User, UserFormData } from '@/features/user/types';
import { users } from '@/features/user/types';

export const USER_STORAGE_KEY = 'users';

const getUserById = (id: Number) => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

const getUsers = () => {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  return data ? (JSON.parse(data) as User[]) : users;
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const userApi = {
  getUser: async (id: Number): Promise<User | undefined> => {
    return getUserById(id);
  },

  getList: async (): Promise<User[]> => {
    return getUsers();
  },

  create: async (data: UserFormData): Promise<User> => {
    await new Promise((r) => setTimeout(r, 300)); // 疑似通信
    const users = getUsers();
    const newUser: User = {
      ...data,
      id: users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1,
      createdAt: new Date(),
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    return newUser;
  },

  update: async (id: Number, data: UserFormData): Promise<void> => {
    const users = getUsers();
    const updated = users.map((u: User) =>
      u.id === id ? { ...u, ...data } : u,
    );
    saveUsers(updated);
  },

  delete: async (id: Number): Promise<void> => {
    const users = getUsers();
    const updated = users.filter((u: User) => u.id !== id);
    saveUsers(updated);
  },
};
