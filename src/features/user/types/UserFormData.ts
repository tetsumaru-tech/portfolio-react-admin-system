import type { User } from '@/features/user/types';

export type UserFormData = Omit<User, 'id' | 'createdAt'>;
