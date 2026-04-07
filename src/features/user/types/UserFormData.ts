import type { User } from '@/features/user/types';

export type UserFormData = Omit<User, 'createdAt' | 'UpdatedAt'>;
export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'UpdatedAt'>;
export type UpdateUserInput = Partial<
  Omit<User, 'id' | 'createdAt' | 'UpdatedAt'>
>;
