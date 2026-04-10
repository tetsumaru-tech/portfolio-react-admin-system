import type {
  User,
  CreateUserInput,
  UpdateUserInput,
} from '@/features/user/types';
import { users } from '@/features/user/types';
import type { YMD } from '@/types';

export const USER_STORAGE_KEY = 'users';

const getUserById = (id: number): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

const getUsers = () => {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  return data ? parseUsers(data) : users;
};

const parseUsers = (data: string): User[] => {
  const parsed = JSON.parse(data);
  return parsed.map((u: User) => ({
    ...u,
    createdAt: new Date(u.createdAt),
    updatedAt: new Date(u.updatedAt),
  }));
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const userApi = {
  getUser: async (id: number): Promise<User | undefined> => {
    return getUserById(id);
  },

  getList: async (): Promise<User[]> => {
    return getUsers();
  },

  create: async (data: CreateUserInput): Promise<User> => {
    await new Promise((r) => setTimeout(r, 300)); // 疑似通信
    const users = getUsers();
    const newUser: User = {
      ...data,
      id: users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1,
      birthday: data.birthday as YMD,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    return newUser;
  },

  update: async (id: number, data: UpdateUserInput): Promise<void> => {
    const users = getUsers();
    const updated = users.map((u: User) =>
      u.id === id
        ? {
            ...u,
            ...data,
            birthday: data.birthday as YMD,
            updatedAt: new Date(),
          }
        : u,
    );
    saveUsers(updated);
  },

  delete: async (id: number): Promise<void> => {
    const users = getUsers();
    const updated = users.filter((u: User) => u.id !== id);
    saveUsers(updated);
  },
};
