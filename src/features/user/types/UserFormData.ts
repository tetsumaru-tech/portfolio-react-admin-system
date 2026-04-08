import type { User } from '@/features/user/types';

export type UserFormData = Omit<User, 'createdAt' | 'updatedAt'>;
export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserInput = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;
