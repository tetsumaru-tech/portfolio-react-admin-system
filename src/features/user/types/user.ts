import type { YMD } from '@/types';

export type User = {
  id: number | null;
  lastName: string;
  firstName: string;
  email: string;
  birthday: YMD;
  createdAt: Date;
  UpdatedAt: Date;
};

export type UserSearchCondition = {
  name?: string;
  email?: string;
};
