import type { Dayjs } from 'dayjs';

import type { User } from '@/features/user/types';

export type UserFormData = Omit<
  User,
  'createdAt' | 'updatedAt' | 'birthday'
> & { birthday: Dayjs };
export type CreateUserInput = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'birthday'
> & { birthday: string };
export type UpdateUserInput = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'birthday'>
> & { birthday: string };
