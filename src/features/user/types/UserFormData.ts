import { z } from 'zod';

import { userSchema } from '@/features/user/schema';

export type UserFormData = z.infer<typeof userSchema>;
export type CreateUserInput = Omit<UserFormData, 'id'>;
export type UpdateUserInput = Partial<Omit<UserFormData, 'id'>>;
